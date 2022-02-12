import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  constructor(
    private service: CountryService,
    private router: Router) { }

  countryList: any;
  sortBy: any;
  sorts = [
    {"value": "country","viewValue": "Country name"},
    {"value": "cases","viewValue": "Number of cases"},
    {"value": "deaths","viewValue": "Number of deaths"},
    {"value": "recovered","viewValue": "Number of recovered"}
  ]

  ngOnInit(): void {
    this.service.getCountryData().subscribe(
      res => {
        this.countryList = res;

        if(!!localStorage.getItem('countryDetails')) {
          var data = JSON.parse(localStorage.getItem('countryDetails') as string);
          var name = data.name;
          console.log(name)
          console.log(data);
          for(let i=0; i<this.countryList.length; i++) {
            if(this.countryList[i].country === name) {
              this.countryList[i].cases = data.cases;
              this.countryList[i].deaths = data.deaths;
              this.countryList[i].recovered = data.recovered;
              this.countryList[i].tests = data.tests;
            }
          }
        }
      }
    )

  }

  editdetails(name: String, cases: String, deaths: String, recovered: String, tests: String) {
    var data = {
      "name": name,
      "cases": cases,
      "deaths": deaths,
      "recovered": recovered,
      "tests": tests
    }
    localStorage.setItem('countryDetails', JSON.stringify(data));
    this.router.navigate(['/editdetails']);
  }

  onChange() {
    switch(this.sortBy) {
      case "country": {
        this.countryList.sort(function(a: any, b: any) {
          return a.country - b.country;
        });
        break;
      }
      case "cases": {
        this.countryList.sort(function(a: any, b: any) {
          return a.cases - b.cases;
        });
        break;
      }
      case "deaths": {
        this.countryList.sort(function(a: any, b: any) {
          return a.deaths - b.deaths;
        });
        break;
      }
      case "recovered": {
        this.countryList.sort(function(a: any, b: any) {
          return a.recovered - b.recovered;
        });
        break;
      }
    }
  }

}
