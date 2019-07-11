import { ProductQuery } from './../../common/models/product/product-query';
import { ProductsData } from './../../common/models/product/productsData';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RecipesData } from '../../common/models/recipe/recipesData';
import { RecipeQuery } from '../../common/models/recipe/recipe-query';

@Component({
  selector: 'app-items-search-details',
  templateUrl: './items-search-details.component.html',
  styleUrls: ['./items-search-details.component.css']
})
export class ItemsSearchDetailsComponent implements OnInit {
  inputValue: string;
  selectedValue: string;

  @Input()
  inputPlaceholder: string;

  @Input()
  selectLabel: string;

  @Input()
  options: string[];

  @Output()
  searchItems: EventEmitter<{inputValue: string, selectedValue: string}> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  triggerSearchItems(): void {
    this.searchItems.emit({inputValue: this.inputValue, selectedValue: this.selectedValue});
  }
}
