import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { ScheduleComponent } from '../components/schedule/schedule.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private header: HeaderComponent, private schedule: ScheduleComponent) {}
}
