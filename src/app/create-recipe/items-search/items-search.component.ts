import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsData } from '../../common/models/product/productsData';
import { RecipesData } from '../../common/models/recipe/recipesData';
import { Recipe } from '../../common/models/recipe/recipe';

@Component({
  selector: 'app-items-search',
  templateUrl: './items-search.component.html',
  styleUrls: ['./items-search.component.css']
})
export class ItemsSearchComponent implements OnInit {
  @Input()
  foundProducts: ProductsData;

  @Input()
  foundRecipes: RecipesData;

  selectedTabIndex = 0;
  selectedTabName = 'products';
  tabs: string[] = ['products', 'recipes'];

  @Input()
  productFoodGroups: string[];

  @Input()
  recipeCategories: string[];

  @Input()
  recipeToEdit: Recipe;

  @Input()
  loading: boolean;

  @Output()
  searchItems: EventEmitter<{inputValue: string, selectedValue: string}> = new EventEmitter();
  
  @Output()
  clearSearch: EventEmitter<string> = new EventEmitter();

  @Output()
  add: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  getSelectedTabIndexAndName(index: number): void {
    this.selectedTabIndex = index;
    this.selectedTabName = this.tabs[index];
  }

  isProduct(value: string) {
    return value === 'products';
  }

  isRecipe(value: string) {
    return value === 'recipes';
  }

  setInputPlacehlder(tabName: string) {
    if (this.isProduct(tabName)) {
      return 'Description';
    }

    if (this.isRecipe(tabName)) {
      return 'Title';
    }
  }

  setSelectLabel(tabName: string) {
    if (this.isProduct(tabName)) {
      return 'Food group';
    }

    if (this.isRecipe(tabName)) {
      return 'Category';
    }
  }

  setSelectOptions(tabName: string) {
    if (this.isProduct(tabName)) {
      return this.productFoodGroups;
    }

    if (this.isRecipe(tabName)) {
      return this.recipeCategories;
    }
  }

  getFoundItems() {
    if (this.isProduct(this.selectedTabName)) {
      return this.foundProducts;
    }
    if (this.isRecipe(this.selectedTabName)) {
      return this.foundRecipes;
    }
  }

  triggerSearchItems(search: {inputValue: string, selectedValue: string}): void {
    const itemsSearch = {items: this.selectedTabName, ...search};
    this.searchItems.emit(itemsSearch);
  }

  triggerAddItem(item) {
    this.add.emit(item);
  }

  clearSearchResults() {
    this.clearSearch.emit(this.selectedTabName);
  }
}
