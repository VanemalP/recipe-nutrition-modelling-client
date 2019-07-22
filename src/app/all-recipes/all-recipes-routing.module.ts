import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRecipesComponent } from './all-recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { AllRecipesResolverService } from './services/all-recipes.resolver.service';

const routes: Routes = [
  {
    path: '', component: AllRecipesComponent,
    canActivate: [AuthGuard],
    resolve: {recipes: AllRecipesResolverService},
    pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllRecipesRoutingModule { }
