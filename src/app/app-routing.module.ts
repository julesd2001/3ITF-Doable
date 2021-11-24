import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoableComponent } from './doable/doable.component';

const routes: Routes = [
  {path: '', component: DoableComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
