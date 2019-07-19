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
  data = {
    calories: 78,
    carbs: 0.6,
    fat: 5.3,
    protein: 6.3
  };


  public doughnutChartLabels: Label[] = [`Carbs ${this.data.carbs} g`, `Fat ${this.data.fat} g`, `Protein ${this.data.protein} g`];
  public doughnutChartData: SingleDataSet = [this.data.carbs * 4, +(this.data.fat * 9).toFixed(2), this.data.protein * 4];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [
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

          // Find out how much the font can grow in width.
          const widthRatio = elementWidth / stringWidth;
          const newFontSize = Math.floor(16 * widthRatio);
          const elementHeight = (chart.innerRadius * 2);
          const fontSizeToUse = Math.min(newFontSize, elementHeight);
          const fontSizeToUse1 = fontSizeToUse / 2;

          // Draw text in center
          ctx.fillStyle = color;
          ctx.font = fontSizeToUse1 + 'px ' + fontStyle;
          ctx.fillText(txt1, centerX, centerY + fontSizeToUse1);
          ctx.font = fontSizeToUse + 'px ' + fontStyle;
          ctx.fillText(txt, centerX, centerY - fontSizeToUse1 / 3);
        }
      }
    },
  ];
  public doughnutChartColors = [{backgroundColor: ['rgba(247,148,30,1)', 'rgba(187,22,84,1)', 'rgba(133,196,70,1)']}];
  public options =  {
    cutoutPercentage: 70,
    tooltips: {
      callbacks: {
          label: function(tooltipItems, data) {
              return data.labels[tooltipItems.index] + ': ' + data.datasets[0].data[tooltipItems.index] + ' cal';
          }
      }

    },
    legend: {
      position: 'right',
    },
    center: {
      text: `${this.data.calories}`,
      color: '#00B0DB',
    },
    responsive: true,
    // maintainAspectRatio: false
  };

  constructor() { }

  ngOnInit() {
  }

}
