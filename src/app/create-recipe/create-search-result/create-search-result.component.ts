import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-search-result',
  templateUrl: './create-search-result.component.html',
  styleUrls: ['./create-search-result.component.css']
})
export class CreateSearchResultComponent implements OnInit {
  @Input()
  foundItems;

  @Input()
  searchedItem: string;

  @Output()
  add: EventEmitter<any> = new EventEmitter();

  constructor( ) { }

  ngOnInit() { }

  triggerAddItem(item: any) {
    this.add.emit({itemType: this.searchedItem, item});
  }
}
