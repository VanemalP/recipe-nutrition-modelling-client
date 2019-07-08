import { NgModule } from '@angular/core';

import { UsersComponent } from './users.component';
import { UserResolverService } from './services/user-resolver.service';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
  providers: [UserResolverService]
})
export class UsersModule { }
