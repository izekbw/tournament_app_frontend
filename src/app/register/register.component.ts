import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient) { }

  username: string;
  password: string;
  activeUsernameInput = false;
  activePasswordInput = false;
  ajaxCall = false;
  popupType: string;
  popupMessage: string;

  ngOnInit() {
    // @ts-ignore
    componentHandler.upgradeDom();
  }

  registerAccount() {
    if (!this.ajaxCall) {
      this.ajaxCall = true;
      const user = {
        'username': this.username,
        'password': this.password
      };

      this.http.post(environment.apiUrl + 'register', user)
        .subscribe(
          response => {
            this.ajaxCall = false;
            this.popupType = 'success-popup';
            this.popupMessage = response['message'];
          },
          error => {
            this.ajaxCall = false;
            this.popupType = 'error-popup';
            this.popupMessage = error['error']['message'];
            if (!this.popupMessage) {
              this.popupMessage = 'Unexpected error';
            }
          });
    }
  }

  closePopup() {
    this.popupType = '';
  }
}
