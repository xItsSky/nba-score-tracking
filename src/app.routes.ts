import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'teams', pathMatch: 'full' },
  {
    path: 'teams',
    loadChildren: async () => (await import('@nba-score-tracking/feature/teams/teams.routes')).TEAMS_ROUTES,
  },
];
