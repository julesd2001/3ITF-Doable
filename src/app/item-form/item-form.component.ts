import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemService } from '../item.service';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit, OnDestroy {
  isAdd: boolean = false;
  isEdit: boolean = false;
  itemId: number = 0;
  items: Item[];


  item: Item = { id: 0, taskName: "", date: Date.now().toString(), list_Id: 1, isDone: false, order: 1 }

  isSubmitted: boolean = false;
  errorMessage: string = "";

  item$: Subscription = new Subscription();
  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();

  items$: Subscription = new Subscription();

  constructor(private router: Router, private itemService: ItemService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === "add";
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === "edit";
    this.itemId = this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.itemId != null) {
      this.item$ = this.itemService.getItemById(this.itemId).subscribe(result => {
        this.item = result;
      });
    }
   }



  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.item$.unsubscribe();
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    //since we want to set the date as soon as the todo is made, we make a new Date object and get the month, date and full year
    //we then make a variable createdDate in order to bring all these functions together
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let createdDate = day + "/" + month + "/" + year;
    this.item.date = createdDate;
//we need to get the length of the amount of items in a list, therefore we need to get all the items
    this.items$ = this.itemService.getItemsByListId(this.item.list_Id).subscribe(result => {
      this.items = result;
      this.item.order = this.items.length + 1;
      //determines whether to use the post or put functionality
      if (this.isAdd){
      this.postItem$ = this.itemService.addTodo(this.item).subscribe(result => {
        this.router.navigateByUrl("/list/" + this.item.list_Id);
      },
      error => {
        this.errorMessage = error.message;
      });
    }
    })
    if (this.isEdit) {
      this.putItem$ = this.itemService.updateTodo(this.itemId, this.item).subscribe(result => {
        this.router.navigateByUrl("/list/" + this.item.list_Id);
      },
      error => {
        this.errorMessage = error.message;
      });
    }
  }



}
