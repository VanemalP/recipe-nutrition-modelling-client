import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../common/models/recipe/recipe';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.css']
})
export class SingleRecipeComponent implements OnInit {
  @Input()
  recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
