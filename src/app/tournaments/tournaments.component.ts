import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UtilService} from '../util.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.less']
})
export class TournamentsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private http: HttpClient, public utilService: UtilService) { }

  private sub: any;
  gameId: number;
  openTournaments: [];
  startedTournaments: [];
  popupType: string;
  popupMessage: string;
  ajaxCall = false;
  apiImgUrl = environment.apiImgUrl;
  currentUser: string;
  currentUserUuid: string;
  teamsWithRoster: [];
  selectedTournament: number;
  show = false;

  ngOnInit() {
    this.upgradeDom();
    this.currentUser = this.utilService.getUsername();
    this.currentUserUuid = this.utilService.getUuid();

    this.sub = this.route.params.subscribe(params => {
      this.gameId = parseInt(params['id'], 10);
      this.getActiveTournaments();
    });

    this.getTeamsWithRoster();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showTeamSelect(id) {
    this.selectedTournament = id;
    this.show = false;
  }

  joinTournament(teamId) {
    if (!this.ajaxCall) {
      this.ajaxCall = true;
      const data = {
        'teamId': teamId,
        'tournamentId': this.selectedTournament,
        'gameId': this.gameId,
      };

      this.http.post(environment.apiUrl + 'tournament/register?XDEBUG_SESSION_START=PHPSTORM', data)
        .subscribe(
          response => {
            this.ajaxCall = false;
            this.popupType = 'success-popup';
            this.popupMessage = response['message'];
            this.openTournaments = response['openTournaments'];
            this.startedTournaments = response['startedTournaments'];
            this.selectedTournament = null;
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
  getActiveTournaments() {
    this.openTournaments = [];
    this.startedTournaments = [];

    this.ajaxCall = true;

    this.http.get(environment.apiUrl + 'tournament/getActiveForGame?gameId=' + this.gameId)
      .subscribe(
        response => {
          this.openTournaments = response['openTournaments'];
          this.startedTournaments = response['startedTournaments'];

          if (!response['openTournaments'].length && !response['startedTournaments'].length) {
            this.popupType = 'error-popup';
            this.popupMessage = 'There are no active or open tournaments for this game';
          }
          this.ajaxCall = false;
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

  getTeamsWithRoster() {
    this.ajaxCall = true;

    this.http.get(environment.apiUrl + 'team/getAll?uuid=' + this.currentUserUuid)
      .subscribe(
        response => {
          this.ajaxCall = false;
          this.teamsWithRoster = response['teamsWithRoster'];
        },
        error => {
          this.ajaxCall = false;
          this.popupType = 'error-popup';
          this.popupMessage = 'Error in fetching data';
        });
  }

  closePopup() {
    this.popupType = '';
  }
}
