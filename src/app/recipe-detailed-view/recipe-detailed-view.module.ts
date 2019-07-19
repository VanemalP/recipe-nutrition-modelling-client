import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { RecipeDetailedViewRoutingModule } from './recipe-detailed-view-routing.module';
import { RecipeDetailedViewComponent } from './recipe-detailed-view.component';
import { RecipeDetailedViewService } from './services/recipe-detailed-view.service';
import { RecipeDetailedViewResolverService } from './services/recipe-detailed-view.resolver.service';
import { NutritionChartComponent } from '../components/nutrition-chart/nutrition-chart.component';

@NgModule({
  declarations: [RecipeDetailedViewComponent, NutritionChartComponent],
  imports: [
    SharedModule,
    RecipeDetailedViewRoutingModule
  ],
  providers: [RecipeDetailedViewService, RecipeDetailedViewResolverService]
})
export class RecipeDetailedViewModule { }
