import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { DateType } from './consts';
import { NgForm, ControlContainer } from '@angular/forms';
import { DateFormatterService } from './date-formatter.service';

import * as moment from 'moment';
import * as moment_ from 'moment-hijri';
const momentHijri = moment_;


@Component({
  selector: 'hijri-gregorian-datepicker',
  templateUrl: './hijri-gregorian-datepicker.component.html',
  //viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class HijriGregorianDatepickerComponent implements OnInit {

  selectedDateType = DateType.Hijri;
  @Input() selectedDate: NgbDateStruct;
  @Output() selectedDateChange: EventEmitter<NgbDateStruct> = new EventEmitter();

  @Input() label: string;
  @Input() readonly = false;
  @Input() isRequired = false;
  @Input() disabled = false;

  @Input() minHijri: NgbDateStruct;
  @Input() maxHijri: NgbDateStruct;
  @Input() minGreg: NgbDateStruct;
  @Input() maxGreg: NgbDateStruct;

  get DateType() {
    return DateType;
  }

  constructor( private dateFormatterService: DateFormatterService) { }

  ngOnInit() {
  }

  getSelectedDate(): string {

    let formattedDate = this.dateFormatterService.ToString(this.selectedDate);

    if (this.selectedDateType == DateType.Hijri) {
      return momentHijri(formattedDate, 'iD/iM/iYYYY').locale('en').format();
    }

    if (this.selectedDateType == DateType.Gregorian) {
      return moment(formattedDate, 'D/M/YYYY').locale('en').format();
    }
  }

  dateSelected() {
    this.selectedDateChange.emit(this.selectedDate);
  }

  hijriClick() {
    if (this.selectedDateType == DateType.Hijri) {
      return;
    }
    this.selectedDateType = DateType.Hijri;
    //to hijri
    this.selectedDate = this.dateFormatterService.ToHijri(this.selectedDate);
    this.selectedDateChange.emit(this.selectedDate);
  }
  gregClick() {
    if (this.selectedDateType == DateType.Gregorian) {
      return;
    }
    this.selectedDateType = DateType.Gregorian;
    //to Gregorian
    this.selectedDate = this.dateFormatterService.ToGregorian(this.selectedDate);
    this.selectedDateChange.emit(this.selectedDate);
  }
}