import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITeam } from '@nba-score-tracking/shared/model/team.model';

@Component({
  selector: 'nba-score-tracker-team-card-title',
  templateUrl: './team-card-title.component.html',
  styleUrls: ['./team-card-title.component.less'],
})
export class TeamCardTitleComponent {
  @Input() team!: ITeam;
  @Input() closeBtnLabel: string | null = null;
  @Output() closeBtnEvent: EventEmitter<void> = new EventEmitter<void>();

  close(): void {
    this.closeBtnEvent.emit();
  }
}
