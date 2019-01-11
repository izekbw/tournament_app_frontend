import { UtilService } from './util.service';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})

export class AppComponent implements OnInit {
  constructor(private http: HttpClient, public utilService: UtilService) {}

  currentUser: string;
  currentUserUuid: string;
  games: any;

  ngOnInit() {
    this.currentUser = this.utilService.getUsername();
    this.currentUserUuid = this.utilService.getUuid();
    this.getGames();
  }

  logout() {
    this.utilService.logout();
  }

  getGames() {
    this.http.get(environment.apiUrl + 'game/get')
      .subscribe(
        response => {
            this.games = response['games'];
        }
      )
  }

  toggleMaterialDrawer() {
    // @ts-ignore
    document.getElementById('app').MaterialLayout.toggleDrawer()
  }
}
