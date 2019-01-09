import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UtilService} from '../util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, public utilService: UtilService) { }

  currentUser: string;
  currentUserUuid: string;

  username: string;
  password: string;
  activeUsernameInput = false;
  activePasswordInput = false;
  ajaxCall = false;
  popupType: string;
  popupMessage: string;

  ngOnInit() {
    this.currentUser = this.utilService.getUsername();
    this.currentUserUuid = this.utilService.getUuid();
    setTimeout(function() {
      // @ts-ignore
      componentHandler.upgradeDom();
    }, 100);
  }

  loginAccount() {
    this.ajaxCall = true;
    const user = {
      'username': this.username,
      'password': this.password
    };

    this.http.post(environment.apiUrl + 'login', user)
      .subscribe(
        response => {
          this.popupType = 'success-popup';
          this.popupMessage = response['message'];
          this.utilService.login(response['username'], response['uuid']);
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

  closePopup() {
    this.popupType = '';
  }

}
