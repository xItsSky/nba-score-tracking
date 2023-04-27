import { ITeam } from '@nba-score-tracking/shared/model/team.model';

export interface IGame {
  id: number;
  date: Date;
  home_team_score: number;
  visitor_team_score: number;
  season: number;
  home_team: ITeam;
  visitor_team: ITeam;
}

export interface IGamesResults {
  results: Array<Boolean>;
  scoredAvg: number;
  concededAvg: number;
}
