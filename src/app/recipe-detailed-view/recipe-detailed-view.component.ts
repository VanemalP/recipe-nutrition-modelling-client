import { MatDialog } from '@angular/material';

import { ConfirmDialogComponent } from './../shared/components/confirm-dialog/confirm-dialog.component';
import { Subrecipe } from './../common/models/subrecipe';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Recipe } from '../common/models/recipe/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeHelperService } from '../core/services/recipe-helper.service';
import { Nutrition } from '../common/models/nutrition';
import { Ingredient } from '../common/models/ingredient';
import { RecipesService } from '../core/services/recipes.service';
import { NotificatorService } from '../core/services/notificator.service';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-recipe-detailed-view',
  templateUrl: './recipe-detailed-view.component.html',
  styleUrls: ['./recipe-detailed-view.component.css']
})
export class RecipeDetailedViewComponent implements OnInit {
  isActive = true;
  recipe: Recipe;
  totalRecipeNutrition: Nutrition;

  @ViewChild('content', { static: false }) content: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private readonly recipeHelperService: RecipeHelperService,
    private readonly recipeService: RecipesService,
    private readonly notificator: NotificatorService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }


  ngOnInit() {
    this.route.data.subscribe((res: any) => {
      this.recipe = res.recipe;
      this.totalRecipeNutrition = this.calcRecNutrition(this.recipe);
    });
  }

  updateRecipe() {
    this.recipeHelperService.editRecipe(this.recipe);
  }

  calcRecNutrition(item) {
    return this.recipeHelperService.calculateTotalRecipeNutrition(item);
  }

  calcSubrecNutrition(item) {
    return this.recipeHelperService.calculateSubreciepTotalNutrition(item);
  }

  calcIngrNutrition(item) {
    return this.recipeHelperService.calculateIngredientTotalNutrition(item);
  }

  calcIngrMeasure(item: Ingredient) {
    const gramsPerMeasure = item.measures.find((m) => m.measure === item.unit).gramsPerMeasure;
    return gramsPerMeasure * item.quantity + ' g';
  }

  calcSubrecMeasure(item: Subrecipe) {
    return item.gramsPerMeasure * item.quantity + ' g';
  }

  deleteRecipe() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.recipeService.deleteRecipe(id).subscribe(() => {
      this.notificator.success('Recipe successfully deleted'),
        this.router.navigate(['/recipes']);
    });
  }

  openDialog() {
    const title = 'Delete recipe';
    const message = 'Are you sure you want to delete this recipe?';

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: '400px',
      data: { title, message },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecipe();
      }
    });
  }

  saveRecipeAsPDF() {
    html2canvas(this.content.nativeElement).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.text(30, 25, `${this.recipe.title} (${this.recipe.measure})`);
      const imgWidth = 60;
      const imgHeight = 100;
      pdf.addImage(contentDataURL, 'PNG', 30, 35, imgWidth, imgHeight);
      pdf.save('recipe.pdf');
    });
  }
}

