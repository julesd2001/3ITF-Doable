import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {



  items: Item[] = [];
  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();

  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();
  item: Item = {id: 0, taskName: "", date: "tje", list_id: 2, isDone: false, order: 1 }

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();

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
