import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  check: boolean;
  register: string;
  myForm: object;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  sendReq(name, email, pass1, pass2) {

    if (name == "" || email == "" || pass1 == "" || pass2 == "") {
      alert("Please don't leave any fields blank !");
      return;
    }
    let valid_flag = this.validateEmail(email);
    if (valid_flag != true) {
      alert("Please enter a valid email");
      return;
    }
    if (pass1 != pass2) {
      alert("Passwords don't match");
      return;
    }
    this.register = `/regUser?name=${name}&email=${email}&password1=${pass1}`;
    console.log(this.register);
    localStorage.setItem("Email", `${email}`);
    localStorage.setItem("Name", `${name}`);
    localStorage.setItem("Password", `${pass2}`);
    localStorage.setItem("signin",`true`);
    //window.location.href = "/";
    this.http.get<UserResponse>(this.register).subscribe(data => {
      console.log(data);
      console.log(this.register);

      if (data.ok == 1) {
        alert("Successfully registered, please login :-)");
        this.send_to_login_page();
      }
      else {
        alert("User already exists, please login or reset your password!");
      }

    });
  }

  send_to_login_page() {
    window.location.href = "/login";
  }

}

interface UserResponse {
  ok: number;
}



