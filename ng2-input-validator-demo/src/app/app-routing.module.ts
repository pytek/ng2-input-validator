import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Form1Component } from './form1/form1.component';

const routes: Routes = [
  { path: '', redirectTo: '/form1', pathMatch: 'full' },
  { path: 'form1', component: Form1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
