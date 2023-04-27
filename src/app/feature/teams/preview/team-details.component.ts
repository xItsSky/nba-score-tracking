import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ITeam } from '@nba-score-tracking/shared/model/team.model';
import { GamesService } from '@nba-score-tracking/core/provider/service/games.service';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { IGamesResults } from '@nba-score-tracking/shared/model/game.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { environment } from '../../../../environments/environment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TeamCardTitleModule } from '@nba-score-tracking/shared/component/team-card-title/team-card-title.module';

@Component({
  selector: 'nba-score-tracker-team-details',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    DecimalPipe,
    NgClass,
    TeamCardTitleModule,
    NzButtonModule,
    NzCardModule,
    NzDividerModule,
    NzEmptyModule,
    NzSpinModule,
    NzIconModule,
  ],
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.less'],
})
export class TeamDetailsComponent implements OnInit {
  @Input() team!: ITeam;
  @Output() closeCardEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() goToResultsEvent: EventEmitter<number> = new EventEmitter<number>();

  readonly #gamesService: GamesService = inject(GamesService);

  gamesResults$: Observable<IGamesResults | null> = EMPTY;

  readonly daysOfHistory: number = environment.daysOfHistory;
  readonly noDataLabel: string = `No data found for the past ${this.daysOfHistory} days`;
  readonly removeLabel: BehaviorSubject<string> = new BehaviorSubject<string>('');
  readonly resultLabel: BehaviorSubject<string> = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.removeLabel.next(`remove${this.team.abbreviation}`);
    this.resultLabel.next(`results${this.team.abbreviation}`);
    this.gamesResults$ = this.#gamesService.getLastGamesResults(this.team.id, this.daysOfHistory);
  }

  closeCard(): void {
    this.closeCardEvent.emit(this.team.id);
  }

  goToResults(): void {
    this.goToResultsEvent.emit(this.team.id);
  }
}
