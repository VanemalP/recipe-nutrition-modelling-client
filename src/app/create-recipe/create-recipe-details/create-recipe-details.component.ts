import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-recipe-details',
  templateUrl: './create-recipe-details.component.html',
  styleUrls: ['./create-recipe-details.component.css']
})
export class CreateRecipeDetailsComponent implements OnInit {
  titleInputValue: string;
  notesInputValue: string;

  constructor() { }

  ngOnInit() {
  }

}
