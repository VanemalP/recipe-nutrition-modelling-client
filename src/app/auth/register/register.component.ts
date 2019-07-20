import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../core/services/auth.service';
import { NotificatorService } from '../../core/services/notificator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  isActive = true;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly notificator: NotificatorService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  register() {
    const newUserData = this.registerForm.value;
    const { username, password } = newUserData;
    if (this.registerForm.valid) {
      this.authService.register(newUserData).subscribe(
        (res) => {
          this.authService.login({ username, password }).subscribe(() => {
            this.notificator.success(`You have successfully registered and logged in, Chef ${res.user.lastName}!`);
            this.router.navigate(['/recipes']);
          });
        }
      );
    } else {
      this.notificator.error('Please, fill the required fields');
    }
  }
}
