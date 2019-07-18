import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isActive = true;

  @Input()
  username: string;

  // @Input()
  // loggedIn: boolean;
  @Input()
  loggedIn = true;

  @Output()
  toggle: EventEmitter<undefined> = new EventEmitter();

  @Output()
  logout: EventEmitter<undefined> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSidenav() {
    return this.toggle.emit();
  }

  triggerLogout() {
    return this.logout.emit();
  }
}
