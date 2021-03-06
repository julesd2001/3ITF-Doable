import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoableComponent } from './doable/doable.component';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { HttpClientModule } from '@angular/common/http';
import { ListFormComponent } from './list-form/list-form.component';
import { ItemFormComponent } from './item-form/item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DoableComponent,
    ItemComponent,
    TodoListsComponent,
    ListFormComponent,
    ItemFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
