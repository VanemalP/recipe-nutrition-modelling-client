import { RecipeDetailedViewResolverService } from './services/recipe-detailed-view.resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeDetailedViewComponent } from './recipe-detailed-view.component';
import { AuthGuard } from '../auth/auth.guard';



const routes: Routes = [
  {
    path: '', component: RecipeDetailedViewComponent,
    canActivate: [AuthGuard],
    resolve: {recipe: RecipeDetailedViewResolverService},
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeDetailedViewRoutingModule { }
