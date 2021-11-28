import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  list_Id: number = 0;
  errorMessage: string = '';

  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();
  item: Item = { id: 0, taskName: "", date: "27/11/2021", list_Id: 1, isDone: false, order: 1 }

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute) {

    this.list_Id = +this.router.getCurrentNavigation()?.extras.state?.id;

    if (this.list_Id != null && this.list_Id > 1) {
      this.items$ = this.itemService.getItemsByListId(this.list_Id).subscribe(result => this.items = result);
    }
  }

  ngOnInit(): void {
    const list_Id = this.route.snapshot.paramMap.get("id");
    if (list_Id != null) {
      this.itemService.getItemsByListId(+list_Id).subscribe(result => this.items = result);
    }
  }
//this function brings you to the page where you are able to add a task
  add() {
    this.router.navigate(['list/' + this.route.snapshot.paramMap.get("id") + '/item/form'], { state: { mode: 'add' } })
  }
//the function used to edit tasks
  edit(id: number) {
    this.router.navigate(['list/' + this.route.snapshot.paramMap.get("id") + '/item/form'], { state: { id: id, mode: 'edit' } });

  }
//mark a task as complete
  markDone(id: number) {
    const list_Id = this.route.snapshot.paramMap.get("id");
    this.putItem$ = this.itemService.getItemById(id).subscribe(result => {
      this.item = result;
      this.putItem$ = this.itemService.toggleComplete(id, this.item).subscribe(result => {
        if (list_Id != null) {
          this.getItems(+list_Id);
        }
      })
    });

  }
  firstItemId: number = 0;
//manual sorting, code used for putting an item 1 times up
  goUp(id: number, order: number) {
    const list_Id = this.route.snapshot.paramMap.get("id");
    if (order != 0){
      this.items.forEach(current => {
      if (current.order == order - 1) {
        this.firstItemId = current.id;
      }
    });
    this.putItem$ = this.itemService.getItemById(this.firstItemId).subscribe(result => {
      this.item = result;
      this.item.order++;
      this.putItem$ = this.itemService.updateTodo(this.firstItemId, this.item).subscribe(result => {
        this.putItem$ = this.itemService.getItemById(id).subscribe(result => {
          this.item = result;
          if (this.item.order != 0) {
            this.item.order--;
          }
          this.putItem$ = this.itemService.updateTodo(id, this.item).subscribe(result => {
            if (list_Id != null) {
              this.getItems(+list_Id);
            }
          })
        })
      })
    });
    }
  }
//manual sorting, used for making an item go one item down
  goDown(id: number, order: number) {
    const list_Id = this.route.snapshot.paramMap.get("id");
    if (order != this.items.length - 1){
      this.items.forEach(current => {
      if (current.order == order + 1) {
        this.firstItemId = current.id;
      }
    });
    this.putItem$ = this.itemService.getItemById(this.firstItemId).subscribe(result => {
      this.item = result;
      this.item.order--;
      this.putItem$ = this.itemService.updateTodo(this.firstItemId, this.item).subscribe(result => {
        this.putItem$ = this.itemService.getItemById(id).subscribe(result => {
          this.item = result;
          if (this.item.order != this.items.length - 1) {
            this.item.order++;
          }
          this.putItem$ = this.itemService.updateTodo(id, this.item).subscribe(result => {
            if (list_Id != null) {
              this.getItems(+list_Id);
            }
          })
        })
      })
    });
    }
  }


//deleting an item from the todo list
  delete(id: number) {
    const list_Id = this.route.snapshot.paramMap.get("id");
    this.deleteItem$ = this.itemService.deleteTodo(id).subscribe(result => {
      if (list_Id != null) {
        this.getItems(+list_Id);
      }
    },
      error => {
        this.errorMessage = error.message;
      });

  }

  getItems(id: number) {
    this.items$ = this.itemService.getItemsByListId(id).subscribe(result => this.items = result);
  }

}
