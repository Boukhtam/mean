import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import * as moment from 'moment';
import { ApiService } from '../api.service';

import { Chart, Point, registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})

export class DataComponent implements OnInit {
  @ViewChild('chart')
  private chartRef!: ElementRef;
  private chart!: any;
  private data!: any;
  private backGroundColor: any[] = [];
  private borderColor: any[] = [];
  years: any = ["2019", "2020", "2021"];
  months: any = ["all", ...moment.monthsShort()];

  constructor(
    private _api: ApiService,
    public fb: FormBuilder,
  ) {
  }

  datesForm = this.fb.group({
    year: [moment().format("YYYY")],
    month: ['all'],
  })

  onChanges(): void {
    this.datesForm.valueChanges.subscribe((val:any) => {
      this._api.loadData(this.datesForm.value)
      .subscribe((res: any) => {
        this.data = res

        this.data.forEach(() => {
          const color = this.generateRandomColor(0.4)
          this.backGroundColor.push(color[1])
          this.borderColor.push(color[0])
        })
        this.rerenderChart();
      })
    })
  }

  renderChart(): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'asas',
          data: this.data, 
          borderColor: this.borderColor,
          backgroundColor: this.backGroundColor,
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        parsing: {
          xAxisKey: '_id',
          yAxisKey: 'energyPerday',
        }
      }
    })
  }

  rerenderChart(): void {
    this.chart.destroy();
    this.renderChart();
  }

  ngOnInit(): void/*ngAfterViewInit()*/ {
    this.onChanges();

    this._api.loadData(this.datesForm.value)
    .subscribe((res: any) => {
      this.data = res
      console.log({res})

      this.data.forEach(() => {
        const color = this.generateRandomColor(0.4)
        this.backGroundColor.push(color[1])
        this.borderColor.push(color[0])
      })

      this.renderChart();
    })
  }

  generateRandomColor(op: any): any[] {
    var r = () => Math.random() * 256 >> 0;
    var o = () => `0.${Math.random() * 10 >> 0}`;
    var color = `${r()}, ${r()}, ${r()}`;
    return [ `rgb(${color})`, `rgba(${color}, ${op ? `${op}` : `${o()}`})`];
  }
}
