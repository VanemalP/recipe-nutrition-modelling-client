import { Component, OnInit, Input } from '@angular/core';
import { Label, PluginServiceGlobalRegistrationAndOptions, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-nutrition-chart',
  templateUrl: './nutrition-chart.component.html',
  styleUrls: ['./nutrition-chart.component.css']
})
export class NutritionChartComponent implements OnInit {
  @Input()
  data;

  public doughnutChartData: SingleDataSet;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[];
  public doughnutChartColors = [{backgroundColor: ['rgba(247,148,30,1)', 'rgba(187,22,84,1)', 'rgba(133,196,70,1)']}];
  public options;

  constructor() { }

  ngOnInit() {
    this.options =  {
      cutoutPercentage: 70,
      tooltips: {enabled: false},
      center: {
        text: `${this.data.calories}`,
        color: '#00B0DB',
      },
      responsive: true,
      hover: {mode: null},
    };
    this.doughnutChartData = [this.data.carbs * 4, +(this.data.fat * 9).toFixed(2), this.data.protein * 4];
    this.doughnutChartPlugins = [
      {
        beforeDraw(chart: any) {
          if (chart.options.center) {
            // Get ctx from string
            const ctx = chart.ctx;

            // Get options from the center object in options
            const centerConfig = chart.options.center;
            const fontStyle = centerConfig.fontStyle || 'Arial';
            const txt = centerConfig.text;
            const txt1 = 'Cal';
            const color = centerConfig.color || '#767779';
            const sidePadding = centerConfig.sidePadding || 70;
            const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);

            // Start with a base font
            ctx.font = '16px' + fontStyle;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            const stringWidth = ctx.measureText(txt).width;
            const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            const fontSizeToUse = 26;
            const fontSizeToUse1 = 18;

            // Draw text in center
            ctx.fillStyle = color;
            ctx.font = fontSizeToUse1 + 'px ' + fontStyle;
            ctx.fillText(txt1, centerX, centerY + fontSizeToUse1 - 4);
            ctx.font = fontSizeToUse + 'px ' + fontStyle;
            ctx.fillText(txt, centerX, centerY - 4 - fontSizeToUse1 / 3);
          }
        }
      },
    ];
  }

}
