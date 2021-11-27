import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-doable',
  templateUrl: './doable.component.html',
  styleUrls: ['./doable.component.scss']
})
export class DoableComponent implements OnInit {

  items: Item[] = [];
  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();

  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return alert("Form invalid")
    }

  }

  add () {

  }

  edit() {

  }

  delete(){

  }

  getItems() {
    this.items$ = this.itemService.getTodos().subscribe(result => this.items = result);
  }
}
