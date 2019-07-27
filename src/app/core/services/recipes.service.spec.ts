import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { Nutrition } from './../../common/models/nutrition';
import { TestBed } from '@angular/core/testing';
import { RecipesService } from './recipes.service';
import { Recipe } from 'src/app/common/models/recipe/recipe';


describe('RecipesService', () => {
  const http = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: HttpClient,
        useValue: http,
      }
    ]
  }));

  it('should be created', () => {
    const service: RecipesService = TestBed.get(RecipesService);
    expect(service).toBeTruthy();
  });

  describe('getRecipe', () => {
    it('should return a recipe by a given id', () => {
      const service: RecipesService = TestBed.get(RecipesService);
      const id = '172ddf8b-5f38-4094-b14d-6269bba01d60';
      const recipe: Recipe = {
        id: '172ddf8b-5f38-4094-b14d-6269bba01d60',
        title: 'Sweets',
        imageUrl: '',
        notes: '',
        measure: '',
        gramsPerMeasure: 1,
        created: new Date(),
        category: '',
        nutrition: {} as Nutrition,
      };
      http.get.and.returnValue(of(recipe));
      service.getRecipe(id).subscribe(res => {
        expect(res).toEqual(recipe);
      });
      http.get.calls.reset();
    });
  });


  describe('createRecipe', () => {
    it('should create a recipe by a given params', () => {
    const service = TestBed.get(RecipesService);
    const recipe = {};

    http.post.and.returnValue(of({ title: 'recipe' }));

    service.createRecipe(recipe).subscribe((res) => {
      expect(res.title).toEqual('recipe');
    });
    http.post.calls.reset();
  });
});

  describe('updateRecipe', () => {
  it('should update a choosen recipe', () => {
    const service = TestBed.get(RecipesService);
    const id = '172ddf8b-5f38-4094-b14d-6269bba01d60';
    let recipe: Recipe = {
      id: '172ddf8b-5f38-4094-b14d-6269bba01d60',
      title: 'Sweets',
      imageUrl: '',
      notes: '',
      measure: '',
      gramsPerMeasure: 1,
      created: new Date(),
      category: '',
      nutrition: {} as Nutrition,
    };

    http.put.and.returnValue(of( recipe = {
      id: '172ddf8b-5f38-4094-b14d-6269bba01d60',
      title: 'Candy',
      imageUrl: '',
      notes: '',
      measure: '',
      gramsPerMeasure: 1,
      created: new Date(),
      category: '',
      nutrition: {} as Nutrition,
    }));

    service.updateRecipe(id).subscribe(res => {
      expect(res.title).toBe('Candy');
    });
    http.put.calls.reset();
  });
});

  describe('deleteRecipe', () => {
  it('should delete a recipe by a given id', () => {
      const service = TestBed.get(RecipesService);
      const id = '172ddf8b-5f38-4094-b14d-6269bba01d60';

      http.delete.and.returnValue(
        of({ message: 'Recipe successfully deleted' })
      );
      service.deleteRecipe(id).subscribe((res) => {
        expect(res.message).toBe('Recipe successfully deleted');
      });
      http.delete.calls.reset();
    });
});
});

