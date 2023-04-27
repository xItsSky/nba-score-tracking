import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TeamsService } from '@nba-score-tracking/core/provider/service/teams.service';
import { Observable } from 'rxjs';
import { IPageable } from '@nba-score-tracking/shared/model/common.model';
import { ITeam } from '@nba-score-tracking/shared/model/team.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamDetailsComponent } from '@nba-score-tracking/feature/teams/preview/team-details.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, ReactiveFormsModule, TeamDetailsComponent, NzSelectModule, NzButtonModule, FormsModule],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.less'],
})
export class TeamsComponent {
  readonly #router: Router = inject(Router);
  readonly #route: ActivatedRoute = inject(ActivatedRoute);
  readonly #teamsService: TeamsService = inject(TeamsService);

  teamsToDisplay$: Observable<Array<ITeam>> = this.#teamsService.getTeamsToDisplay().asObservable();
  readonly teams$: Observable<IPageable<ITeam>> = this.#teamsService.getTeams();

  addTeamCard(id: number): void {
    this.#teamsService.addTeamToDisplay(id);
  }

  removeTeamCard(id: number): void {
    this.#teamsService.removeTeamToDisplay(id);
  }

  async goToResults(id: number): Promise<void> {
    await this.#router.navigate(['results', id], { relativeTo: this.#route });
  }
}
