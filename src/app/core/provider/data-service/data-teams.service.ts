import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPageable } from '@nba-score-tracking/shared/model/common.model';
import { ITeam } from '@nba-score-tracking/shared/model/team.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataTeamsService {
  readonly #httpClient: HttpClient = inject(HttpClient);

  getTeams(): Observable<IPageable<ITeam>> {
    return this.#httpClient.get<IPageable<ITeam>>(`${environment.apiUrl}/teams`);
  }

  getTeam(id: number): Observable<ITeam> {
    return this.#httpClient.get<ITeam>(`${environment.apiUrl}/teams/${id}`);
  }
}
