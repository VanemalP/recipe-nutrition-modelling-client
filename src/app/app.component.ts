import { Component, OnInit, OnDestroy, } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { NotificatorService } from './core/services/notificator.service';
import { Subscription } from 'rxjs';
import { RecipeQuery } from './common/models/recipe/recipe-query';
import { SearchbarService } from './searchbar/services/searchbar.service';
import { RecipeHelperService } from './core/services/recipe-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isLogged: boolean;
  isVisible = false;
  private loggedUserSubscripton: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService,
    private readonly searchService: SearchbarService,
    private readonly recipeHelperService: RecipeHelperService,
  ) { }

  ngOnInit(): void {
    this.loggedUserSubscripton = this.authService.user$.subscribe(
      (res) => this.isLogged = !!res,
    );
  }

  ngOnDestroy() {
    this.loggedUserSubscripton.unsubscribe();
  }

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

  toggleSearchField() {
    this.isVisible = !this.isVisible;
  }

  searchRecipe(searchQuery) {
    const queryParams: RecipeQuery = {};
    if (searchQuery.title) {
      queryParams.title = searchQuery.title;
    }
    if (searchQuery.category) {
      queryParams.category = searchQuery.category;
    }
    if (searchQuery.nutrient) {
      queryParams.nutrient = searchQuery.nutrient;
    }
    if (searchQuery.min) {
      queryParams.min = searchQuery.min;
    }
    if (searchQuery.max) {
      queryParams.max = searchQuery.max;
    }

    this.searchService.search(queryParams);
    this.router.navigate(['/recipes']);
    this.isVisible = false;
  }

  showRecipes() {
    this.recipeHelperService.allRecipesClicked();
  }
}
