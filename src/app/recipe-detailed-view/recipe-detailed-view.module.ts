import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { RecipeDetailedViewRoutingModule } from './recipe-detailed-view-routing.module';
import { RecipeDetailedViewComponent } from './recipe-detailed-view.component';
import { RecipeDetailedViewService } from './services/recipe-detailed-view.service';
import { RecipeDetailedViewResolverService } from './services/recipe-detailed-view.resolver.service';

@NgModule({
  declarations: [RecipeDetailedViewComponent],
  imports: [
    SharedModule,
    RecipeDetailedViewRoutingModule
  ],
  providers: [RecipeDetailedViewService, RecipeDetailedViewResolverService]
})
export class RecipeDetailedViewModule { }
