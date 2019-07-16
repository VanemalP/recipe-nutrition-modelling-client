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
  nutrition: Nutrition = {
    PROCNT: {
      description: 'Protein',
      unit: 'g',
      value: 0,
    },
    FAT: {
      description: 'Total lipid (fat)',
      unit: 'g',
      value: 0,
    },
    CHOCDF: {
      description: 'Carbohydrate, by difference',
      unit: 'g',
      value: 0,
    },
    ENERC_KCAL: {
      description: 'Energy',
      unit: 'kcal',
      value: 0,
    },
    SUGAR: {
      description: 'Sugars, total',
      unit: 'g',
      value: 0,
    },
    FIBTG: {
      description: 'Fiber, total dietary',
      unit: 'g',
      value: 0,
    },
    CA: {
      description: 'Calcium, Ca',
      unit: 'mg',
      value: 0,
    },
    FE: {
      description: 'Iron, Fe',
      unit: 'mg',
      value: 0,
    },
    P: {
      description: 'Phosphorus, P',
      unit: 'mg',
      value: 0,
    },
    K: {
      description: 'Potassium, K',
      unit: 'mg',
      value: 0,
    },
    NA: {
      description: 'Sodium, Na',
      unit: 'mg',
      value: 0,
    },
    VITA_IU: {
      description: 'Vitamin A, IU',
      unit: 'IU',
      value: 0,
    },
    TOCPHA: {
      description: 'Vitamin E (alpha-tocopherol)',
      unit: 'mg',
      value: 0,
    },
    VITD: {
      description: 'Vitamin D',
      unit: 'IU',
      value: 0,
    },
    VITC: {
      description: 'Vitamin C, total ascorbic acid',
      unit: 'mg',
      value: 0,
    },
    VITB12: {
      description: 'Vitamin B-12',
      unit: 'µg',
      value: 0,
    },
    FOLAC: {
      description: 'Folic acid',
      unit: 'µg',
      value: 0,
    },
    CHOLE: {
      description: 'Cholesterol',
      unit: 'mg',
      value: 0,
    },
    FATRN: {
      description: 'Fatty acids, total trans',
      unit: 'g',
      value: 0,
    },
    FASAT: {
      description: 'Fatty acids, total saturated',
      unit: 'g',
      value: 0,
    },
    FAMS: {
      description: 'Fatty acids, total monounsaturated',
      unit: 'g',
      value: 0,
    },
    FAPU: {
      description: 'Fatty acids, total polyunsaturated',
      unit: 'g',
      value: 0,
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
