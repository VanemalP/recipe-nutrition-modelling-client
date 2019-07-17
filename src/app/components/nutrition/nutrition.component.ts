import { Component, OnInit, Input } from '@angular/core';
import { Nutrition } from '../../common/models/nutrition';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.css']
})
export class NutritionComponent implements OnInit {
  @Input()
  measure = '';

  @Input()
  nutrition: Nutrition;

  constructor() { }

  ngOnInit() {
  }

}
