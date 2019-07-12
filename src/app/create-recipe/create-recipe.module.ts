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

@NgModule({
  declarations: [
    CreateRecipeComponent,
    ItemsSearchComponent,
    ItemsSearchDetailsComponent,
    CreateSearchResultComponent,
    CreateRecipeDetailsComponent
  ],
  imports: [
    SharedModule,
    CreateRecipeRoutingModule
  ],
  providers: [ProductsService, RecipeHelperService],
})
export class CreateRecipeModule { }
