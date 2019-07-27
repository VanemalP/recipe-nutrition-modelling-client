import { ImgDialogComponent } from './create-recipe-details/img-dialog/img-dialog.component';
import { FoodGroupsResolverService } from './services/foodGroups.resolver.service';
import { FoodGroupsService } from './services/foodGroups.service';
import { NgModule } from '@angular/core';

import { CreateRecipeComponent } from './create-recipe.component';
import { SharedModule } from '../shared/shared.module';
import { CreateRecipeRoutingModule } from './create-recipe.routing.module';
import { ItemsSearchComponent } from './items-search/items-search.component';
import { ItemsSearchDetailsComponent } from './items-search/items-search-details/items-search-details.component';
import { CreateRecipeDetailsComponent } from './create-recipe-details/create-recipe-details.component';
import { ProductsService } from './services/products.service';
import { NutrDialogComponent } from './create-recipe-details/nutr-dialog/nutr-dialog.component';
import { CreateSearchResultComponent } from './items-search/create-search-result/create-search-result.component';

@NgModule({
  declarations: [
    CreateRecipeComponent,
    ItemsSearchComponent,
    ItemsSearchDetailsComponent,
    CreateSearchResultComponent,
    CreateRecipeDetailsComponent,
    ImgDialogComponent,
    NutrDialogComponent,
  ],
  entryComponents: [ImgDialogComponent, NutrDialogComponent],
  imports: [
    SharedModule,
    CreateRecipeRoutingModule
  ],
  providers: [ProductsService, FoodGroupsService, FoodGroupsResolverService],
})
export class CreateRecipeModule { }
