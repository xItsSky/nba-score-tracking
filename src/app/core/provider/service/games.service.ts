import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IGame, IGamesResults } from '@nba-score-tracking/shared/model/game.component';
import { DataGamesService } from '@nba-score-tracking/core/provider/data-service/data-games.service';
import { DatesService } from '@nba-score-tracking/core/provider/service/dates.service';
import { IPageable } from '@nba-score-tracking/shared/model/common.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  readonly #dataGamesService: DataGamesService = inject(DataGamesService);
  readonly #datesService: DatesService = inject(DatesService);

  getLastGames(teamId: number, numberOfDaysSince: number): Observable<IPageable<IGame>> {
    return this.#dataGamesService.getGamesSince([teamId], this.#datesService.getLastsDatesFromToday(numberOfDaysSince));
  }

  getLastGamesResults(teamId: number, numberOfDaysSince: number): Observable<IGamesResults | null> {
    return this.getLastGames(teamId, numberOfDaysSince).pipe(
      map((gamesPageable: IPageable<IGame>) => gamesPageable.data),
      map((games: Array<IGame>): IGamesResults | null =>
        games.length > 0
          ? {
              results: this.getResults(teamId, games),
              scoredAvg: this.getScoredAvg(teamId, games),
              concededAvg: this.getConcededAvg(teamId, games),
            }
          : null
      )
    );
  }

  private getResults(teamId: number, games: Array<IGame>): Array<boolean> {
    return games.map((game: IGame): boolean =>
      game.home_team.id === teamId
        ? game.home_team_score > game.visitor_team_score
        : game.home_team_score < game.visitor_team_score
    );
  }

  private getScoredAvg(teamId: number, games: Array<IGame>): number {
    return (
      games
        .map((game: IGame): number => (game.home_team.id === teamId ? game.home_team_score : game.visitor_team_score))
        .reduce((previousValue: number, score: number) => previousValue + score) / games.length
    );
  }

  private getConcededAvg(teamId: number, games: Array<IGame>): number {
    return (
      games
        .map((game: IGame): number => (game.home_team.id !== teamId ? game.home_team_score : game.visitor_team_score))
        .reduce((previousValue: number, score: number) => previousValue + score) / games.length
    );
  }
}
