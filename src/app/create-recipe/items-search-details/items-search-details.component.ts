import { ProductsData } from './../../common/models/product/productsData';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RecipesData } from '../../common/models/recipe/recipesData';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-items-search-details',
  templateUrl: './items-search-details.component.html',
  styleUrls: ['./items-search-details.component.css']
})
export class ItemsSearchDetailsComponent implements OnInit {
  inputValue: string;
  selectedValue: string;

  @Input()
  foundItems: ProductsData | RecipesData;

  @Input()
  inputPlaceholder: string;

  @Input()
  selectLabel: string;

  @Input()
  options: string[];

  constructor() { }

  ngOnInit() {
  }

}
