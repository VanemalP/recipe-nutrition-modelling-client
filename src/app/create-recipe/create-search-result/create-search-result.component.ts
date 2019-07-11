import { Component, OnInit, Input } from '@angular/core';
import { ProductsData } from '../../common/models/product/productsData';
import { RecipesData } from '../../common/models/recipe/recipesData';

@Component({
  selector: 'app-create-search-result',
  templateUrl: './create-search-result.component.html',
  styleUrls: ['./create-search-result.component.css']
})
export class CreateSearchResultComponent implements OnInit {
  @Input()
  foundItems;

  @Input()
  searchedItem: string;

  constructor() { }

  ngOnInit() {

  }

}
