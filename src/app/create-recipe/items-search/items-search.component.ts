import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsData } from '../../common/models/product/productsData';
import { RecipesData } from '../../common/models/recipe/recipesData';

@Component({
  selector: 'app-items-search',
  templateUrl: './items-search.component.html',
  styleUrls: ['./items-search.component.css']
})
export class ItemsSearchComponent implements OnInit {
  @Input()
  foundItems: ProductsData;

  selectedTabIndex: number;
  tabs: string[] = ['products', 'recipes'];

  @Input()
  productFoodGroups: string[];

  @Input()
  recipeCategories: string[];
  constructor() { }

  @Output()
  searchItems: EventEmitter<{inputValue: string, selectedValue: string}> = new EventEmitter();
  ngOnInit() {
    this.selectedTabIndex = 0;
  }

  triggerSearchItems(search: {inputValue: string, selectedValue: string}): void {
    const items = this.tabs[this.selectedTabIndex];
    const itemsSearch = {items, ...search};
    this.searchItems.emit(itemsSearch);
  }

  getSelectedTabIndex(index: number): void {
    this.selectedTabIndex = index;
  }

  getSelectedTabName() {
    return this.tabs[this.selectedTabIndex];
  }

  setInputPlacehlder(tabName: string) {
    if (tabName === 'products') {
      return 'Description';
    }

    if (tabName === 'recipes') {
      return 'Title';
    }
  }

  setSelectedLabel(tabName: string) {
    if (tabName === 'products') {
      return 'Food group';
    }

    if (tabName === 'recipes') {
      return 'Category';
    }
  }
}
