import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-items-search-details',
  templateUrl: './items-search-details.component.html',
  styleUrls: ['./items-search-details.component.css']
})
export class ItemsSearchDetailsComponent implements OnInit {
  inputValue = '';
  selectedValue: string;

  @Input()
  inputPlaceholder: string;

  @Input()
  selectLabel: string;

  @Input()
  options: string[];

  @Output()
  searchItems: EventEmitter<{inputValue: string, selectedValue: string}> = new EventEmitter();

  @Output()
  clearSearch: EventEmitter<undefined> = new EventEmitter();

  searchForm: FormGroup;
  searchSubsciption: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      inputValue: [this.inputValue],
      selectedValue: [''],
    });

    this.searchForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe((search) => {
      if (search.inputValue || search.selectedValue) {
        this.searchItems.emit(search);
      }
      if (!search.inputValue && !search.selectedValue) {
        this.clearSearch.emit();
      }
    });
  }
}
