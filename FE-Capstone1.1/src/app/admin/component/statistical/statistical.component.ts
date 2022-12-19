import {Component, Directive, ElementRef, Input, OnInit} from '@angular/core';
import {EventService} from '../../../../service/event.service';
import { ChartType, ChartDataSets, ChartConfiguration} from 'chart.js';
import { Label as ng2Chart } from 'ng2-charts';
import * as moment from 'moment';
import {UserService} from '../../../../service/user.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {EventUser} from '../../../../model/event_user';
import {Event} from '../../../../model/event';
import {User} from '../../../../model/user';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  eventUser: EventUser[];
  eventList: Event[];
  amountUser: number;
  amountAllUser: number;
  amountEventFinished: number;
  amountEventUpcoming: number;
  amountEvent: number;
  thePageNumber = 1;
  thePageSize = 10000;
  theTotalElements: number;
  itemPerPage = 1;
  username: string;
  userList: User[];
  showAdminBoard = false;
  private roles: string[];
  url = 'assets/js/main.js';
  loadAPI: any;
  check = true;
  loading = true;
  color: string;
  textFilter: string;
  // tslint:disable-next-line:max-line-length
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
      borderColor: 'rgba(255, 26, 26, 0.86)',
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

  // tslint:disable-next-line:max-line-length
  constructor(private element: ElementRef, private route: Router, private tokenStorageService: TokenStorageService, private eventService: EventService , private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadAPI = new Promise(resolve => {
      this.loadScript();
    });
    this.eventService.getDataEvent().subscribe(data => {
      this.barChartDataEvent[0].data = data;
    }, (error) => {
      // if (error.status === 500) {
      //   this.router.navigateByUrl('/login');
      // }
    });
    this.eventService.getListEvent().subscribe(data => {
      this.eventList = data;
      this.amountEvent = data.length;
    });
    this.userService.getDataUser().subscribe(data => {
      this.barChartDataEvent[1].data = data;
    });

    this.userService.getAmountUser().subscribe(data => {
      this.amountUser = data;
    });

    this.filterMonth();

    this.eventService.getAmountEventFinished().subscribe(data => {
      this.amountEventFinished = data;
    });

    this.eventService.getAmountEventUpcoming().subscribe(data => {
      this.amountEventUpcoming = data;
    });
    this.getListUser();
  }

  randomColor() {
    // tslint:disable-next-line:max-line-length
    const myArray = ['text-danger', 'text-success', 'text-primary', 'text-dark', 'text-secondary', 'text-warning', 'text-info', 'text-muted'];
    this.color = myArray[Math.floor(Math.random() * myArray.length)];
    return this.color;
  }
  calulateDiff(event: EventUser) {
    const start = new Date().getTime();
    const end = new Date(event.checkin).getTime();
    const time = start - end;
    const diffDay = Math.floor(time / 86400000);
    const diffHour = Math.floor((time % 86400000) / 3600000);
    const diffMinute = Math.floor(((time % 86400000) % 3600000) / 60000);
    const diffWeek = Math.floor((time / 86400000) / 7);
    const diffMonth = Math.floor(((time / 86400000) / 7) / 4);
    if (diffDay >= 1 && diffDay < 7) {
      return diffDay;
    } else if (diffDay >= 7 && diffDay <= 28) {
      return diffWeek;
    } else if (diffDay > 28) {
      return diffMonth;
    } else if (diffHour >= 1) {
      return diffHour;
    } else {
      return diffMinute;
    }
  }

  hourTime(key) {
    const start = new Date().getTime();
    const end = new Date(key.checkin).getTime();
    const time = start - end;
    const diffDay = Math.floor(time / 86400000);
    const diffHour = Math.floor((time % 86400000) / 3600000);
    const diffMinute = Math.floor(((time % 86400000) % 3600000) / 60000);
    if (diffDay >= 1 && diffDay < 7) {
      return key = 'day';
    } else if (diffDay >= 7 && diffDay <= 28) {
      return key = 'week';
    } else if (diffDay > 28) {
      return key = 'month';
    } else if (diffHour >= 1) {
      return key = 'hours';
    } else {
      return key = 'min';
    }
  }

  public loadScript() {
    const node = document.createElement('script');
    node.src = this.url;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  filterMonth() {
    this.textFilter = 'Month';
    this.eventService.filterDay().subscribe(data => {
      this.eventUser = data;
    });
  }

  filterYear() {
    this.textFilter = 'Year';
    this.eventService.filterMonth().subscribe(data => {
      this.eventUser = data;
    });
  }

  filterAll() {
    this.textFilter = 'All';
    this.eventService.filterYear().subscribe(data => {
      this.eventUser = data;
    });
  }

  changeWith() {
    const amount = (this.amountEventUpcoming / this.amountEvent) * 100;
    return amount + '%';
  }

  changeWith1() {
    const amount = (this.amountEventFinished / this.amountEvent) * 100;
    return amount + '%';
  }

  changeWith2() {
    const amount = (this.amountUser / this.amountAllUser) * 100;
    return amount + '%';
  }

  getListUser() {
    this.userService.getAllUser(this.thePageNumber - 1, this.thePageSize).subscribe(this.processResult());
  }
  processResult() {
    return (data) => {
      this.userList = data.content; //
      this.amountAllUser = this.userList.length;
      this.thePageNumber = data.number + 1;
      this.thePageSize = data.size;
      this.theTotalElements = data.totalElements;
      this.processItemPerPage();
    };
  }
  processItemPerPage() {
    if (this.thePageNumber * this.thePageSize > this.theTotalElements) {
      this.itemPerPage = this.theTotalElements;
    } else {
      this.itemPerPage = this.thePageNumber * this.thePageSize;
    }
  }
}
