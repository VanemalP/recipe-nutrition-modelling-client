import { Component, OnInit, } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { NotificatorService } from './core/services/notificator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) { }

  ngOnInit(): void { }

  logout() {
    this.authService.logout().subscribe(
      (res) => {
        this.router.navigate(['/login']);
        this.notificator.success('You logged out successfully');
    },
      (err) => {
      this.notificator.error(err.message);
    }
    );
  }
}
