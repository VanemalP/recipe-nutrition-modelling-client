import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RecipeHelperService } from '../../core/services/recipe-helper.service';
import { Recipe } from '../../common/models/recipe/recipe';

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

  @Input()
  recipeToEdit: Recipe;

  @Output()
  add: EventEmitter<any> = new EventEmitter();

  @Input()
  loading: boolean;

  constructor(
    private readonly recipeHelperService: RecipeHelperService,
  ) { }

  ngOnInit() { }

  triggerAddItem(item: any) {
    this.add.emit({itemType: this.searchedItem, item});
  }

  isSelf(recipe: Recipe) {
    if (this.recipeToEdit) {
      return recipe.id === this.recipeToEdit.id;
    }

    return false;
  }

  isProductInRecipe(item): boolean {
    const productInRecipe = this.recipeHelperService.recipeIngredients.find(
      (product) => product.code === item.code || product.product === item.description
    );

    return !!productInRecipe;
  }

  isRecipeInRecipe(item): boolean {
    const recipeInRecipe = this.recipeHelperService.recipeSubrecipes.find(
      (recipe) => recipe.id === item.id || recipe.recipe === item.title
    );

    return !!recipeInRecipe;
  }
}
