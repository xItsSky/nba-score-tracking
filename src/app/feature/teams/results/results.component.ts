import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { GamesService } from '@nba-score-tracking/core/provider/service/games.service';
import { environment } from '../../../../environments/environment';
import { uriParams } from '@nba-score-tracking/shared/composable/route.composable';
import { map, Observable, switchMap } from 'rxjs';
import { TeamsService } from '@nba-score-tracking/core/provider/service/teams.service';
import { ITeam } from '@nba-score-tracking/shared/model/team.model';
import { IPageable } from '@nba-score-tracking/shared/model/common.model';
import { IGame } from '@nba-score-tracking/shared/model/game.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TeamCardTitleModule } from '@nba-score-tracking/shared/component/team-card-title/team-card-title.module';

@Component({
  selector: 'nba-score-tracker-results',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, NzCardModule, TeamCardTitleModule, NzButtonModule, RouterLink, NzIconModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.less'],
})
export class ResultsComponent {
  readonly #teamsService: TeamsService = inject(TeamsService);
  readonly #gamesService: GamesService = inject(GamesService);

  readonly daysOfHistory: number = environment.daysOfHistory;
  readonly teamId$: Observable<number> = uriParams('teamCode').pipe(map((teamId: string) => +teamId));
  readonly team$: Observable<ITeam> = this.teamId$.pipe(switchMap((teamId: number) => this.#teamsService.getTeam(teamId)));
  readonly games$: Observable<IPageable<IGame>> = this.teamId$.pipe(
    switchMap((teamId: number) => this.#gamesService.getLastGames(teamId, this.daysOfHistory))
  );
}
