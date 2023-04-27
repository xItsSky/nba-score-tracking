import { Routes } from '@angular/router';
import { TeamsComponent } from '@nba-score-tracking/feature/teams/teams.component';
import { ResultsComponent } from '@nba-score-tracking/feature/teams/results/results.component';

export const TEAMS_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', component: TeamsComponent },
      { path: 'results/:teamCode', component: ResultsComponent },
    ],
  },
];
