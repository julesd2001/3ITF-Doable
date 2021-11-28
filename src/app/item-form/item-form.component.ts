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
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let createdDate = day + "/" + month + "/" + year;
    this.item.date = createdDate;

    this.items$ = this.itemService.getItemsByListId(this.item.list_Id).subscribe(result => {
      this.items = result;
      this.item.order = this.items.length + 1;
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
