
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { NotificatorService } from './services/notificator.service';
import { StorageService } from './services/storage.service';
import { UsersService } from './services/users.service';

@NgModule({
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    HttpClientModule
  ],
  providers: [
    StorageService,
    NotificatorService,
    UsersService,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
