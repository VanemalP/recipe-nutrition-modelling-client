import { LoggedUser } from './../../common/models/logged-user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../core/services/auth.service';
import { NotificatorService } from './../../core/services/notificator.service';
import { UserLogin } from 'src/app/common/models/user-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public loggedUser: LoggedUser;
  public loggedUserSubscripton: Subscription;
  public hide = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly notificator: NotificatorService,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.loggedUserSubscripton = this.authService.user$.subscribe(
      (user) => {
        this.loggedUser = user;
      }
    );
   }

   login(user: UserLogin) {
    this.authService.login(user).subscribe(
      response => {
        this.notificator.success(`Welcome, Chef ${this.loggedUser.lastName}!`);
        this.router.navigate(['/recipes']);
      }
    );
  }

  ngOnDestroy() {
    this.loggedUserSubscripton.unsubscribe();
  }
}
