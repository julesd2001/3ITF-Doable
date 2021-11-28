import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoableComponent } from './doable/doable.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ListFormComponent } from './list-form/list-form.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';

const routes: Routes = [
  {path: '', component: TodoListsComponent},
  { path: 'list/form', component: ListFormComponent},
  { path: 'list/:id', component: DoableComponent },
  { path: 'list/:id/item/form', component: ItemFormComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
