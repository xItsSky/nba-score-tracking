import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IPageable } from '@nba-score-tracking/shared/model/common.model';
import { ITeam } from '@nba-score-tracking/shared/model/team.model';
import { DataTeamsService } from '../data-service/data-teams.service';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  readonly #dataTeamsService: DataTeamsService = inject(DataTeamsService);
  readonly #teamsToDisplay$: BehaviorSubject<Array<ITeam>> = new BehaviorSubject<Array<ITeam>>([]);

  getTeams(): Observable<IPageable<ITeam>> {
    return this.#dataTeamsService.getTeams();
  }

  getTeam(id: number): Observable<ITeam> {
    return this.#dataTeamsService.getTeam(id);
  }

  getTeamsToDisplay(): BehaviorSubject<Array<ITeam>> {
    return this.#teamsToDisplay$;
  }

  addTeamToDisplay(id: number): void {
    this.getTeam(id)
      .pipe(
        map((team: ITeam) =>
          this.#teamsToDisplay$.value.find((currentDisplayedTeams: ITeam): boolean => team.id === currentDisplayedTeams.id)
            ? this.#teamsToDisplay$.value
            : [...this.#teamsToDisplay$.value, team]
        )
      )
      .subscribe((teamsToDisplay: Array<ITeam>) => this.#teamsToDisplay$.next(teamsToDisplay));
  }

  removeTeamToDisplay(id: number): void {
    this.#teamsToDisplay$.next(this.#teamsToDisplay$.getValue().filter(team => team.id !== id));
  }
}
