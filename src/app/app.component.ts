import { UtilService } from './util.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})

export class AppComponent implements OnInit {
  constructor(public utilService: UtilService) {}

  currentUser: string;
  currentUserUuid: string;

  ngOnInit() {
    this.currentUser = this.utilService.getUsername();
    this.currentUserUuid = this.utilService.getUuid();
  }

  logout() {
    this.utilService.logout();
  }
}
