import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthGuard } from './../auth/auth.guard';
import { UserResolverService } from './services/user-resolver.service';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', redirectTo: ':username', pathMatch: 'full' },
  { path: ':username',
    component: UsersComponent,
    // canActivate: [AuthGuard],
    resolve: {user: UserResolverService},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
