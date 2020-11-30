import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  background_image: any;
  constructor(public alert: AlertService,private http: HttpClient) { }



  ngOnInit() {
  }

  feedback() {
    this.alert.success("Submitted. Thank you.");
  }

  deleteData() {
    localStorage.removeItem("LATEST_LIKE");
    localStorage.removeItem("CLICKED_DATA");
    localStorage.removeItem("BOOKMARKED_DATA");
    localStorage.removeItem("REACTION_DATA");
  }



  deleteAccount() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic YW5ndWxhcjphbmd1bGFy'
    });
  
    const options = {
      headers
    };
    const email=localStorage.getItem("Email");
    localStorage.removeItem("Password");
    localStorage.removeItem("Name");
    localStorage.removeItem("Email");
    localStorage.removeItem("CLICKED_DATA");
    localStorage.removeItem("BOOKMARKED_DATA");
    localStorage.removeItem("REACTION_DATA");
    localStorage.setItem("signin",`false`);
    this.http.post<any>('/api/delete',{email:`${email}`}, options).subscribe(data => {
       if (data.ok == 1) {
         alert("Account Deleted");
         window.location.href="/"
       }
       else {
        alert("Error in deleting account");
       }

    });
  }
  
  
}
interface UserResponse {
  ok: number;
}
