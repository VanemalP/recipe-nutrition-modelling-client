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

  @Input()
  loggedIn = true;

  @Input()
  isSearchVisible: boolean;

  @Output()
  toggle: EventEmitter<undefined> = new EventEmitter();

  @Output()
  logout: EventEmitter<undefined> = new EventEmitter();

  @Output()
  showRecipes: EventEmitter<undefined> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSearchField() {
    this.toggle.emit();
  }

  triggerLogout() {
    this.logout.emit();
  }

  triggerAllRecipes() {
    this.showRecipes.emit();
  }
}
