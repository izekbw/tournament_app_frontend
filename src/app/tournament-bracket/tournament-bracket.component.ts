import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UtilService} from '../util.service';

@Component({
  selector: 'app-tournament-bracket',
  templateUrl: './tournament-bracket.component.html',
  styleUrls: ['./tournament-bracket.component.less']
})
export class TournamentBracketComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, public utilService: UtilService) { }

  private sub: any;
  tournamentId: number;
  bracket: [];
  popupType: string;
  popupMessage: string;
  ajaxCall = false;

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.tournamentId = parseInt(params['id'], 10);
      this.getBracket();
    });
  }

  getBracket() {
    this.bracket = [];

    this.ajaxCall = true;

    this.http.get(environment.apiUrl + 'tournament/getBracket?tournamentId=' + this.tournamentId + '&XDEBUG_SESSION_START=PHPSTORM')
      .subscribe(
        response => {
          this.bracket = response['bracket'];
          console.log(response['bracket']);
          this.ajaxCall = false;
        },
        error => {
          this.ajaxCall = false;
          this.popupType = 'error-popup';
          this.popupMessage = 'Could not retrieve data.';
        });
  }

  closePopup() {
    this.popupType = '';
  }

}
