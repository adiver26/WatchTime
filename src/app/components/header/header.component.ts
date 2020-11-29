import { Component, OnInit } from '@angular/core';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userEmail: string;
  Name: string;
  signIn: string;

  constructor() {
  }

  ngOnInit() {
    if (localStorage.getItem("Email") != null) {
      this.signIn=localStorage.getItem("signin");
      if(this.signIn==`true`)
      this.Name = localStorage.getItem("Name");
    }
    else {
      console.log("Not Logged in for personlization")
      this.signIn = `false`;
    }
  }

  toggNav() {

    if (document.getElementById("mySidenav").style.width == "245px") {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("overlay").style.display = "none";
    }
    else {
      document.getElementById("mySidenav").style.width = "245px";
      document.getElementById("overlay").style.display = "block";
    }

  }

  closeNav() {
    if (document.getElementById("mySidenav").style.width == "245px") {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("overlay").style.display = "none";
    }
  }

  logOut() {
    /*localStorage.removeItem("Email");
    localStorage.removeItem("Name");
    localStorage.clear();*/
    this.signIn = `false`;
    localStorage.setItem("signin",`false`);
    alert("Successfully logged out!")
    window.location.href = "/";
  }
}

