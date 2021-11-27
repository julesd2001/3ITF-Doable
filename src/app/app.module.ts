import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoableComponent } from './doable/doable.component';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DoableComponent,
    ItemComponent,
    TodoListsComponent,
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
