import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGame } from '@nba-score-tracking/shared/model/game.component';
import { environment } from '../../../../environments/environment';
import { IPageable } from '@nba-score-tracking/shared/model/common.model';
import { formatParam } from '@nba-score-tracking/shared/composable/helper.composable';

@Injectable({
  providedIn: 'root',
})
export class DataGamesService {
  readonly #httpClient: HttpClient = inject(HttpClient);

  getGamesSince(teamIds: Array<number>, dates: Array<Date>): Observable<IPageable<IGame>> {
    const params: HttpParams = formatParam(
      'team_ids[]',
      teamIds,
      dates.reduce((previousValue: HttpParams, date: Date) => formatParam('dates[]', date, previousValue), new HttpParams())
    );
    return this.#httpClient.get<IPageable<IGame>>(`${environment.apiUrl}/games`, {
      params: params,
    });
  }
}
