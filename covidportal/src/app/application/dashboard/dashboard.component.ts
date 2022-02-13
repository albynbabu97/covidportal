import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private ngxLoader: NgxUiLoaderService) { }

  todayReport = {
    "cases": 0, "deaths": 0, "recovered": 0
  };

  totalReport = {
    "cases": 0, "deaths": 0, "recovered": 0
  };

  ngOnInit(): void {
    this.ngxLoader.start();
    this.dashboardService.getDashboardData().subscribe(
      res => {
        console.log(res)
        this.todayReport.cases = res.todayCases;
        this.todayReport.deaths = res.todayDeaths;
        this.todayReport.recovered = res.todayRecovered;

        this.totalReport.cases = res.cases;
        this.totalReport.deaths = res.deaths;
        this.totalReport.recovered = res.recovered;

        this.ngxLoader.stop();
      }
    )
  }

}
