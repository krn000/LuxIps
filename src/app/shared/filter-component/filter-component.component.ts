import { Component, DoCheck, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../../services/user.service'
@Component({
  selector: 'app-filter',
  templateUrl: './filter-component.component.html'
})
export class FilterComponent implements OnInit, DoCheck {
  @Input() filterFor: string;
  @Output() filterValue = new EventEmitter<Object>();
  isCollapsed: boolean = true;
  filterType: string = '';
  filterForm: FormGroup;
  doctorData: Array<any>;
  year: any;
  month: any;
  week: any;
  DWY: any;
  isGraph: boolean = false
  roleList: any;
  roleId: any = ''
  constructor(private fb: FormBuilder) {
    this.buildForm();

  }

  ngOnInit() {
    // this.getRoleList()
  }
  ngDoCheck() {

    if (this.filterFor !== this.filterType) {
      this.filterType = this.filterFor;
    }
    // console.log(this.filterFor)
  }

  // getRoleList() {
  //   this.userService.userRoleList().subscribe(res => {
  //     this.roleList = res.data.findListData
  //     // console.log(this.roleList)
  //   })
  // }
  buildForm(): void {
    this.filterForm = this.fb.group({
      role: ['',],
      validFrom: ['',],
      validTo: ['',],

    });
  }
  selectRole(event) {
    this.roleId = event
  }
  submitForm(): void {
    if (this.isGraph) {
      this.isCollapsed = false
      this.filterValue.emit({ roleId: this.roleId, [this.DWY]: this[this.DWY] });
    }
    else {
      let startDate = new Date(this.filterForm.controls['validFrom'].value).getTime()
      let endDate = new Date(this.filterForm.controls['validTo'].value).getTime()
      console.log(startDate < endDate, startDate, endDate)
      console.log(new Date(this.filterForm.controls['validFrom'].value).getTime(), new Date(this.filterForm.controls['validTo'].value).getTime())
      if (startDate > endDate) {
        alert("End Date can't before start date")
      } else {

        let filterData = {
          role: this.roleId
        };

        Object.keys(this.filterForm.controls).map(key => {
          if (this.filterForm.controls[key].valid) {
            if (key === 'validFrom' || key === 'validTo') {
              // filterData[key] = this.getTimeStamp(this.filterForm.controls[key].value);
              filterData[key] = this.filterForm.controls[key].value;
            } else {
              filterData[key] = this.filterForm.controls[key].value;
            }
          }
        });
        this.filterValue.emit(filterData);
        this.isCollapsed = false
      }
    }

  }

  getTimeStamp(date): Number {
    let newDate = new Date(date).getTime();
    return newDate;
  }

  getYearlyMonthly(value, key, dArray) {
    console.log(value)
    console.log(key)
    console.log(dArray)
    this[key] = value
    this[dArray[0]] = '', this[dArray[1]] = ''
    if (this[key]) {
      this.isGraph = true
    }
    this.DWY = key
  }
  getYearsList() {
    var startYear = new Date().getFullYear(), years = [];
    let lastyear = 1980;
    while (lastyear <= startYear) {
      years.push(startYear--);
    }
    return years;
  }

  resetFilter(): void {
    this.isCollapsed = true
    this.isGraph = false
    this.DWY = ''
    this.year = ''
    this.month = ''
    this.week = ''
    this.roleId = ''
    this.filterForm.reset();
    this.filterValue.emit(false);
  }


  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

}
