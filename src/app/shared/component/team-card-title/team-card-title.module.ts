import { NgModule } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TeamCardTitleComponent } from '@nba-score-tracking/shared/component/team-card-title/team-card-title.component';
import { ConferencePipe } from './pipe/conference.pipe';

@NgModule({
  declarations: [TeamCardTitleComponent, ConferencePipe],
  exports: [TeamCardTitleComponent],
  imports: [NgIf, AsyncPipe, NzButtonModule],
})
export class TeamCardTitleModule {}
