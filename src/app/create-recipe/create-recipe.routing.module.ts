import { CategoriesResolverService } from './../core/services/categories.resolver.service';
import { FoodGroupsResolverService } from './services/foodGroups.resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../auth/auth.guard';
import { CreateRecipeComponent } from './create-recipe.component';

const routes: Routes = [
  { path: '', component: CreateRecipeComponent,
  canActivate: [AuthGuard],
  resolve: {foodGroups: FoodGroupsResolverService, categories: CategoriesResolverService},
  pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRecipeRoutingModule { }
