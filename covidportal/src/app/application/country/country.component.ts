import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  constructor(
    private service: CountryService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService) { }

  search: string = "";
  countryList: any;
  constCountryList: any;
  pageOfItems: any;
  from = 1;
  to = 0;
  sortBy = "country";
  sorts = [
    {"value": "country","viewValue": "Country Name"},
    {"value": "cases","viewValue": "Number of Cases"},
    {"value": "deaths","viewValue": "Number of Deaths"},
    {"value": "recovered","viewValue": "Number of Recovered"}
  ]

  ngOnInit(): void {
    this.ngxLoader.start();
    this.service.getCountryData().subscribe(
      res => {
        this.countryList = res;
        this.constCountryList = res;

        this.to = this.countryList.length < 30 ? this.countryList.length : 30;

        if(!!localStorage.getItem('countryDetails')) {
          var data = JSON.parse(localStorage.getItem('countryDetails') as string);
          var name = data.name;
          for(let i=0; i<this.countryList.length; i++) {
            if(this.countryList[i].country === name) {
              this.countryList[i].cases = data.cases;
              this.countryList[i].deaths = data.deaths;
              this.countryList[i].recovered = data.recovered;
              this.countryList[i].tests = data.tests;
            }
          }
          localStorage.removeItem('countryDetails');
        }
        this.ngxLoader.stop();
      }
    )

  }

  onChangePage(pageOfItems: Array<any>) {
    this.ngxLoader.start();
    this.pageOfItems = pageOfItems;
    this.from = this.countryList.indexOf(this.pageOfItems[0]) +1;
    this.to = this.countryList.indexOf(this.pageOfItems[this.pageOfItems.length-1]) +1;
    var myDiv = document.getElementById('countryListScroll') as HTMLElement;
    myDiv.scrollTop = 0;
    this.ngxLoader.stop();
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
    this.ngxLoader.start();
    switch(this.sortBy) {
      case "country": {
        this.countryList.sort(function(a: any, b: any) {
          return a.country > b.country && 1 || -1;
        });
        this.onChangePage(this.countryList.slice(0, 30));
        break;
      }
      case "cases": {
        this.countryList.sort(function(a: any, b: any) {
          return a.cases - b.cases;
        });
        this.onChangePage(this.countryList.slice(0, 30));
        break;
      }
      case "deaths": {
        this.countryList.sort(function(a: any, b: any) {
          return a.deaths - b.deaths;
        });
        this.onChangePage(this.countryList.slice(0, 30));
        break;
      }
      case "recovered": {
        this.countryList.sort(function(a: any, b: any) {
          return a.recovered - b.recovered;
        });
        this.onChangePage(this.countryList.slice(0, 30));
        break;
      }
    }
    this.ngxLoader.stop();
  }

  searchCountry() {
    if(!!this.search) {
      this.ngxLoader.start();
      var tempList = this.constCountryList;
      this.countryList = [];
      let result = tempList.find((element: any) => {
        this.ngxLoader.stop();
        console.log((element.country).toLowerCase() == (this.search).toLowerCase())
        return (element.country).toLowerCase() == (this.search).toLowerCase()
      });
      if(!!result)
        this.countryList.push(result);
      console.log(this.countryList)
      this.to = this.countryList.length < 30 ? this.countryList.length : 30;
    }
  }

  clearSearch() {
    this.ngxLoader.start();
    this.search = "";
    this.service.getCountryData().subscribe(
      res => {
        this.countryList = res;
        this.to = this.countryList.length < 30 ? this.countryList.length : 30;
        this.ngxLoader.stop();
      })
  }

}
