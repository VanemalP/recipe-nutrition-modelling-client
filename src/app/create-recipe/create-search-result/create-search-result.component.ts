import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RecipeHelperService } from '../services/recipe-helper.service';

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

  @Output()
  add: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly recipeHelperService: RecipeHelperService,
  ) { }

  ngOnInit() { }

  triggerAddItem(item: any) {
    this.recipeHelperService.addItemToRecipe(item);
    this.add.emit({itemType: this.searchedItem, item});
  }
}
