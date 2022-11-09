import { Component, OnInit } from '@angular/core';
import {EventService} from '../../../../service/event.service';
import { ChartType, ChartDataSets, ChartConfiguration} from 'chart.js';
import { Label as ng2Chart } from 'ng2-charts';
import * as moment from 'moment';
import {UserService} from '../../../../service/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/security/token-storage.service';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  amountUser: number;
  amountEventFinished: number;
  amountEventUpcoming: number;
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  private roles: string[];
  // tslint:disable-next-line:max-line-length
  constructor(private route: Router, private tokenStorageService: TokenStorageService, private eventService: EventService , private userService: UserService, private router: Router) { }

  title = 'test';
  public barChartOptionEvent: ChartConfiguration['options'] = {
    responsive: true,
    title: {
      text: 'Events and Students ' + moment().year(),
      display: true,
      fontSize: 15,
    },
    scales: {
      xAxes: [{}],
      yAxes: [{}],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 1000,
        },
        formatter(value, context) {
          //   return context.chart.data.labels[context.dataIndex];
          // return context.dataIndex + ': ' + Math.round(value * 100) + '%';
          return value.toLocaleString('en-US');
        },
      },
    },
  };

  public barChartOptionUser: ChartConfiguration['options'] = {
    responsive: true,
    title: {
      text: 'Thống kê sự kiện diễn ra hàng tháng',
      display: true,
      fontSize: 20,
    },
    scales: {
      xAxes: [{}],
      yAxes: [{
      }],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 1000,
        },
        formatter(value, context) {
          //   return context.chart.data.labels[context.dataIndex];
          // return context.dataIndex + ': ' + Math.round(value * 100) + '%';
          return value.toLocaleString('en-US');
        },
      },
    },
  };
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartTypeEvent: ChartType = 'bar';
  public barChartTypeUser: ChartType = 'line';
  public barChartLabels: ng2Chart[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public barChartDataEvent: ChartDataSets[] = [
    { data : [], label: 'Event '},
    { data : [], label: 'User '},
  ];

  public barChartDataUser: ChartDataSets[] = [
    { data : [], label: 'Sinh viên tham gia sư kiện ' + moment().year() },
  ];
  public chartColorsEvent: Array<any> = [
    // {
      // first color
      // backgroundColor: 'rgba(61, 255, 36, 0.84)',
      // borderColor: 'rgba(14, 117, 0, 1)',
      // pointBackgroundColor: 'rgba(225,10,24,0.2)',
      // pointBorderColor: '#fff',
      // pointHoverBackgroundColor: '#fff',
      // pointHoverBorderColor: 'rgba(225,10,24,0.2)',
    // },
    // {
    //   // second color
    //   backgroundColor: 'rgba(26, 219, 0, 0.84)',
    //   borderColor: 'rgba(14, 117, 0, 1)',
    // },
    // {
    //   backgroundColor: 'rgba(255, 162, 87, 0.8)',
    //   borderColor: 'rgba(163, 73, 0, 1)',
    // },
    {
      backgroundColor: '#010101',
      borderRadius: Number.MAX_VALUE,
    },
    {
      backgroundColor: '#C5CAFF',
      borderColor: 'rgba(255, 26, 26, 0.86)',
    },
    {
      backgroundColor: 'rgba(235, 0, 0, 1)',
      borderColor: 'rgba(255, 26, 26, 0.86)',
    },
  ];
  public chartColorsUser: Array<any> = [
    // {
    //   // first color
    //   backgroundColor: 'rgba(61, 255, 36, 0.84)',
    //   borderColor: 'rgba(14, 117, 0, 1)',
    //   pointBackgroundColor: 'rgba(225,10,24,0.2)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(225,10,24,0.2)',
    // },
    // {
    //   // second color
    //   backgroundColor: 'rgba(26, 219, 0, 0.84)',
    //   borderColor: 'rgba(14, 117, 0, 1)',
    // },
    // {
    //   backgroundColor: 'rgba(255, 162, 87, 0.8)',
    //   borderColor: 'rgba(163, 73, 0, 1)',
    // },
    // {
    //   backgroundColor: '#82CDFF',
    //   borderColor: '#FFFFFF',
    // },
    {
      backgroundColor: 'rgba(255, 46, 46, 0.78)',
      borderColor: '#FFFFFF',
    },
    {
      backgroundColor: 'rgba(235, 0, 0, 1)',
      borderColor: 'rgba(255, 26, 26, 0.86)',
    },
  ];
  // events
  public chartClicked({
                        event,
                        active,
                      }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
                        event,
                        active,
                      }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
  ngOnInit(): void {
    this.eventService.getDataEvent().subscribe(data => {
      this.barChartDataEvent[0].data = data;
    }, (error) => {
      // if (error.status === 500) {
      //   this.router.navigateByUrl('/login');
      // }
    });

    this.userService.getDataUser().subscribe(data => {
      this.barChartDataEvent[1].data = data;
    });
    this.userService.getAmountUser().subscribe(data => {
      this.amountUser = data;
    });

    this.eventService.getAmountEventFinished().subscribe(data => {
      this.amountEventFinished = data;
    });

    this.eventService.getAmountEventUpcoming().subscribe(data => {
      this.amountEventUpcoming = data;
    });
  }
}
