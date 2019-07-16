import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { RegisterComponent } from './auth/register/register.component';
import { NoAuthGuard } from './auth/no-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: 'recipes/create', loadChildren: './create-recipe/create-recipe.module#CreateRecipeModule' },
  { path: 'recipes/:id', loadChildren: './recipe-detailed-view/recipe-detailed-view.module#RecipeDetailedViewModule' },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
