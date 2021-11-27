import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoableComponent } from './doable/doable.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';

const routes: Routes = [
  {path: '', component: DoableComponent},
  { path: 'list', component: TodoListsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
