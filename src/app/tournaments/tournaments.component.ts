import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.less']
})
export class TournamentsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) { }
  private sub: any;
  gameId: number;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.gameId = parseInt(params['id']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
