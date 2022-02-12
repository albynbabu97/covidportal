import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editdetails',
  templateUrl: './editdetails.component.html',
  styleUrls: ['./editdetails.component.scss']
})
export class EditdetailsComponent implements OnInit {

  countryDetails: any;
  submitError: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
      this.countryDetails = 
      !!localStorage.getItem('countryDetails')? JSON.parse(localStorage.getItem('countryDetails') as string) : null;
  }
  
  submitChanges() {
    if(!!this.countryDetails.cases
      && !!this.countryDetails.deaths
      && !!this.countryDetails.tests
      && !!this.countryDetails.recovered) {
        this.submitError = false;
        localStorage.setItem('countryDetails', JSON.stringify(this.countryDetails));
        this.router.navigate(['countrystat']);
      } else {
        this.submitError = true;
      }

  }

}
