import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UtilService} from '../util.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.less']
})
export class TeamsComponent implements OnInit {

  constructor(private http: HttpClient, public utilService: UtilService) { }

  currentUser: string;
  currentUserUuid: string;
  teamname: string;
  activeTeamnameInput = false;
  ajaxCall = false;
  popupType: string;
  popupMessage: string;
  teamsWithRoster: [];
  invites: [];
  invitedMember: string;
  selectedTeamId: number;

  ngOnInit() {
    // @ts-ignore
    componentHandler.upgradeDom();
    this.currentUser = this.utilService.getUsername();
    this.currentUserUuid = this.utilService.getUuid();
    this.getTeamsWithRoster();
    this.getTeamInvites();
  }

  acceptInvite(id) {
    if (!this.ajaxCall) {
      this.ajaxCall = true;
      const data = {
        'id': id,
        'uuid': this.currentUserUuid,
      };

      this.http.post(environment.apiUrl + 'team/invite/accept', data)
        .subscribe(
          response => {
            this.ajaxCall = false;
            this.popupType = 'success-popup';
            this.popupMessage = response['message'];
            this.invites = response['invites'];
            this.teamsWithRoster = response['teamsWithRoster'];
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

  denyInvite(id) {
    if (!this.ajaxCall) {
      this.ajaxCall = true;
      const data = {
        'id': id,
        'uuid': this.currentUserUuid,
      };

      this.http.post(environment.apiUrl + 'team/invite/deny', data)
        .subscribe(
          response => {
            this.ajaxCall = false;
            this.popupType = 'success-popup';
            this.popupMessage = response['message'];
            this.invites = response['invites'];
            this.teamsWithRoster = response['teamsWithRoster'];
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

  inviteMember() {
    if (!this.ajaxCall) {
      this.ajaxCall = true;
      const data = {
        'teamId': this.selectedTeamId,
        'username': this.invitedMember,
        'uuid': this.currentUserUuid,
      };

      this.http.post(environment.apiUrl + 'team/invite', data)
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

  leaveTeam(id) {
    if (!this.ajaxCall) {
      this.ajaxCall = true;
      this.http.delete(environment.apiUrl + 'team/member/leave?uuid=' + this.currentUserUuid + '&teamId=' + id)
        .subscribe(
          response => {
            this.ajaxCall = false;
            this.popupType = 'success-popup';
            this.popupMessage = response['message'];
            this.teamsWithRoster = response['teamsWithRoster'];
          },
          error => {
            this.ajaxCall = false;
            this.popupType = 'error-popup';
            this.popupMessage = error['error']['message'];
          });
    }
  }

  createTeam() {
    if (!this.ajaxCall) {
      this.ajaxCall = true;
      const data = {
        'name': this.teamname,
        'uuid': this.currentUserUuid
      };

      this.http.post(environment.apiUrl + 'team/create', data)
        .subscribe(
          response => {
            this.ajaxCall = false;
            this.popupType = 'success-popup';
            this.popupMessage = response['message'];
            this.teamsWithRoster = response['teamsWithRoster'];
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

  getTeamInvites() {
    this.ajaxCall = true;

    this.http.get(environment.apiUrl + 'team/getInvites?uuid=' + this.currentUserUuid)
      .subscribe(
        response => {
          this.ajaxCall = false;
          this.invites = response['invites'];
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
