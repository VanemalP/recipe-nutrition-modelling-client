import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @Output()
  search: EventEmitter<any> = new EventEmitter();

  searchForm: FormGroup;
  inputValue = '';
  selectedValue: string;
  recipeCategories: string[] = [];
  nutrientDisplayValues = [
    'Calories',
    'Total Fat',
    'Saturated Fat',
    'Trans Fat',
    'Cholesterol',
    'Sodium',
    'Total Carbohydrate',
    'Dietary Fiber',
    'Sugars',
    'Protein',
    'Vitamin A',
    'Vitamin C',
    'Vitamin E',
    'Vitamin D',
    'Calcium',
    'Iron'
  ];
  nutrientValues = [
    'ENERC_KCAL',
    'FAT',
    'FASAT',
    'FATRN',
    'CHOLE',
    'NA',
    'CHOCDF',
    'FIBTG',
    'SUGAR',
    'PROCNT',
    'VITA_IU',
    'VITC',
    'TOCPHA',
    'VITD',
    'CA',
    'FE'
  ];

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(
      (res) => {
        this.recipeCategories = res;
      });

    this.searchForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      nutrient: ['', [Validators.required]],
      min: [{ value: '', disabled: true }, [Validators.required, Validators.min(0)]],
      max: [{ value: '', disabled: true }, [Validators.required]],
    });
    this.setSearchValidator();
  }

  searchRecipe(searchQuery, formDirective: FormGroupDirective) {
    formDirective.resetForm();
    this.search.emit(searchQuery);
  }

  private setSearchValidator() {
    const titleControl = this.searchForm.get('title');
    const categoryControl = this.searchForm.get('category');
    const nutrientControl = this.searchForm.get('nutrient');
    const minControl = this.searchForm.get('min');
    const maxControl = this.searchForm.get('max');

    titleControl.valueChanges.subscribe(title => {
      if (title) {
        categoryControl.setValidators(null);
        nutrientControl.setValidators(null);
        categoryControl.updateValueAndValidity({ emitEvent: false });
        nutrientControl.updateValueAndValidity({ emitEvent: false });
      }
      if (!title) {
        categoryControl.setValidators([Validators.required]);
        if (!categoryControl.value) {
          categoryControl.markAsUntouched();
        }
        nutrientControl.setValidators([Validators.required]);
        if (!nutrientControl.value) {
          nutrientControl.markAsUntouched();
        }
        categoryControl.updateValueAndValidity({ emitEvent: false });
        nutrientControl.updateValueAndValidity({ emitEvent: false });
      }
    });

    categoryControl.valueChanges.subscribe(category => {
      if (category) {
        titleControl.setValidators(null);
        nutrientControl.setValidators(null);
        titleControl.updateValueAndValidity({ emitEvent: false });
        nutrientControl.updateValueAndValidity({ emitEvent: false });
      }
      if (!category) {
        titleControl.setValidators([Validators.required]);
        if (!titleControl.value) {
          titleControl.markAsUntouched();
        }
        nutrientControl.setValidators([Validators.required]);
        if (!nutrientControl.value) {
          nutrientControl.markAsUntouched();
        }
        titleControl.updateValueAndValidity({ emitEvent: false });
        nutrientControl.updateValueAndValidity({ emitEvent: false });
      }
    });

    nutrientControl.valueChanges.subscribe(nutrient => {
      if (nutrient) {
        minControl.enable();
        maxControl.enable();
        categoryControl.setValidators(null);
        titleControl.setValidators(null);
        categoryControl.updateValueAndValidity({ emitEvent: false });
        titleControl.updateValueAndValidity({ emitEvent: false });
      }
      if (!nutrient) {
        minControl.reset();
        minControl.disable();
        maxControl.reset();
        maxControl.disable();
        categoryControl.setValidators([Validators.required]);
        if (!categoryControl.value) {
          categoryControl.markAsUntouched();
        }
        titleControl.setValidators([Validators.required]);
        if (!titleControl.value) {
          titleControl.markAsUntouched();
        }
        categoryControl.updateValueAndValidity({ emitEvent: false });
        titleControl.updateValueAndValidity({ emitEvent: false });
      }
    });

    minControl.valueChanges.subscribe((min) => {
      if (min) {
        maxControl.setValidators([Validators.min(min)]);
        maxControl.updateValueAndValidity({ emitEvent: false });
      }
      if (!min) {
        maxControl.setValidators([Validators.required]);
        maxControl.updateValueAndValidity({ emitEvent: false });
        if (!maxControl.value) {
          maxControl.markAsUntouched();
        }
      }
    });

    maxControl.valueChanges.subscribe((max) => {
      if (max) {
        minControl.setValidators([Validators.min(0)]);
        minControl.updateValueAndValidity({ emitEvent: false });
      }
      if (!max) {
        minControl.setValidators([Validators.required, Validators.min(0)]);
        minControl.updateValueAndValidity({ emitEvent: false });
        if (!minControl.value) {
          minControl.markAsUntouched();
        }
      }
    });
  }

  close(e) {
    console.log(e);
  }
}
