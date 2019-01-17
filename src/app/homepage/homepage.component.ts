import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UtilService} from '../util.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit {

  constructor(private http: HttpClient, public utilService: UtilService) { }

  games: any;
  popupType: string;
  popupMessage: string;
  ajaxCall = false;
  apiImgUrl = environment.apiImgUrl;

  ngOnInit() {
    this.upgradeDom();
    this.getAllGames();
  }

  getAllGames() {
    this.ajaxCall = true;
    this.http.get(environment.apiUrl + 'game/get')
      .subscribe(
        response => {
          this.ajaxCall = false;
          this.games = response['games'];
        },

        error => {
          this.ajaxCall = false;
          this.popupType = 'error-popup';
          this.popupMessage = 'Could not retrieve data.';
        });
  }

  upgradeDom() {
    // @ts-ignore
    componentHandler.upgradeDom();
  }

  closePopup() {
    this.popupType = '';
  }

}
