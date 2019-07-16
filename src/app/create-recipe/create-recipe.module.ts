import { FoodGroupsResolverService } from './services/foodGroups.resolver.service';
import { FoodGroupsService } from './services/foodGroups.service';
import { RecipeHelperService } from './services/recipe-helper.service';
import { NgModule } from '@angular/core';

import { CreateRecipeComponent } from './create-recipe.component';
import { SharedModule } from '../shared/shared.module';
import { CreateRecipeRoutingModule } from './create-recipe.routing.module';
import { ItemsSearchComponent } from './items-search/items-search.component';
import { ItemsSearchDetailsComponent } from './items-search-details/items-search-details.component';
import { CreateSearchResultComponent } from './create-search-result/create-search-result.component';
import { CreateRecipeDetailsComponent } from './create-recipe-details/create-recipe-details.component';
import { ProductsService } from './services/products.service';
import { NutritionComponent } from '../components/nutrition/nutrition.component';

@NgModule({
  declarations: [
    CreateRecipeComponent,
    ItemsSearchComponent,
    ItemsSearchDetailsComponent,
    CreateSearchResultComponent,
    CreateRecipeDetailsComponent,
    NutritionComponent
  ],
  imports: [
    SharedModule,
    CreateRecipeRoutingModule
  ],
  providers: [ProductsService, RecipeHelperService, FoodGroupsService, FoodGroupsResolverService],
})
export class CreateRecipeModule { }
