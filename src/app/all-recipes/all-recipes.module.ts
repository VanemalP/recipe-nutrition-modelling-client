import { SharedModule } from './../shared/shared.module';
import { AllRecipesResolverService } from './services/all-recipes.resolver.service';
import { NgModule } from '@angular/core';

import { AllRecipesRoutingModule } from './all-recipes-routing.module';
import { AllRecipesComponent } from './all-recipes.component';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { NutritionChartComponent } from '../components/nutrition-chart/nutrition-chart.component';

@NgModule({
  declarations: [AllRecipesComponent, SingleRecipeComponent, NutritionChartComponent],
  imports: [
    SharedModule,
    AllRecipesRoutingModule
  ],
  providers: [AllRecipesResolverService]
})
export class AllRecipesModule { }
