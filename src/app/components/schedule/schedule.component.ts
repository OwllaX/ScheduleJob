import { Component, OnInit } from '@angular/core';
import * as weekNum from 'current-week-number';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {

  private currentWeek = weekNum;

  private scheduleJSON = {
    "IMPAR" : {
        "PERSON1" : [
            ["Lunes",1,1],
            ["Martes",1,0],
            ["Miércoles",0,0],
            ["Jueves",0,0],
            ["Viernes",1,1],
            ["Sábado",0,0],
            ["Domingo",1,1]
        ],
        "PERSON2" : [
            ["Lunes",1,0],
            ["Martes",1,1],
            ["Miércoles",0,0],
            ["Jueves",0,0],
            ["Viernes",1,1],
            ["Sábado",0,0],
            ["Domingo",1,1]
        ],
        "PERSON3" : [
            ["Lunes",0,0],
            ["Martes",0,0],
            ["Miércoles",1,1],
            ["Jueves",1,0],
            ["Viernes",0,0],
            ["Sábado",1,1],
            ["Domingo",0,0]
        ],
        "PERSON4" : [
            ["Lunes",0,0],
            ["Martes",0,0],
            ["Miércoles",1,0],
            ["Jueves",1,1],
            ["Viernes",0,0],
            ["Sábado",1,1],
            ["Domingo",0,0]
        ]
    },
    "PAR" : {
        "PERSON3" : [
            ["Lunes",1,1],
            ["Martes",1,0],
            ["Miércoles",0,0],
            ["Jueves",0,0],
            ["Viernes",1,1],
            ["Sábado",0,0],
            ["Domingo",1,1]
        ],
        "PERSON4" : [
            ["Lunes",1,0],
            ["Martes",1,1],
            ["Miércoles",0,0],
            ["Jueves",0,0],
            ["Viernes",1,1],
            ["Sábado",0,0],
            ["Domingo",1,1]
        ],
        "PERSON1" : [
            ["Lunes",0,0],
            ["Martes",0,0],
            ["Miércoles",1,1],
            ["Jueves",1,0],
            ["Viernes",0,0],
            ["Sábado",1,1],
            ["Domingo",0,0]
        ],
        "PERSON2" : [
            ["Lunes",0,0],
            ["Martes",0,0],
            ["Miércoles",1,0],
            ["Jueves",1,1],
            ["Viernes",0,0],
            ["Sábado",1,1],
            ["Domingo",0,0]
        ]
    }
};

  private PERSONS: any;
  private dev: any;
  private WEEK: any;
  private personSelected = 'PERSON1';
  private data: any;
  private AssignPersons: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.PERSONS = this.returnPersons();
    this.WEEK = this.getCurrentWeekSchedule();  
    this.setData();
  }

  getCurrentWeekSchedule(): any {
    if(this.currentWeek(new Date()) % 2 == 0){
      return "PAR";
    } else {
      return "IMPAR";
    }
  }

  getListScheduleJob(person): any{
    return this.scheduleJSON[this.getCurrentWeekSchedule()][person];
  }

  returnPersons(): any {
    return ["PERSON1","PERSON2","PERSON3","PERSON4"];
  }

  getAssignPersonsSoport(): Observable<any>{
    return this.http.get<any>('http://186.176.206.154:8088/business/GetAssignPersonsSupport');
  }

  setData(){
    this.getAssignPersonsSoport().subscribe({
      next: data => {
        let res = data;
        this.AssignPersons = res;
      },
      error: error => {
        console.log('Ocurrs a error', error);
      }
    });
    console.log('entro');
  }
}
