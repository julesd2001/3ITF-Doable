import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { List } from '../list';
import { ListService } from '../list.service';


@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit, OnDestroy {
  lists: List[] = [];
  lists$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();

  error: string = '';


  constructor(private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.getLists();

  }

  ngOnDestroy(): void {
    this.lists$.unsubscribe();
    this.deleteList$.unsubscribe();
  }

  add() {

  }

  edit(id: number) {

  }

  delete(id: number) {

  }

  getLists() {
    this.lists$ = this.listService.getLists().subscribe(result => this.lists = result)
  }





}
