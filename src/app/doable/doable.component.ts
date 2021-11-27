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
  isSubmitted: boolean = false;

  items: Item[] = [];
  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();

  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();
  item: Item = {id: 0, taskName: "", date: "27/11/2021", list_id: 2, isDone: false, order: 1 }

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {


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
