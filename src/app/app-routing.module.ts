import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiscuitListComponent } from './components/biscuit-list/biscuit-list.component';
import { BiscuitDetailComponent } from './components/biscuit-detail/biscuit-detail.component';
import { BiscuitFormComponent } from './components/biscuit-form/biscuit-form.component';
import { BiscuitFormEditComponent } from './components/biscuit-form-edit/biscuit-form-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'biscuits', pathMatch: 'full' },
  { path: 'biscuits', component: BiscuitListComponent },
  { path: 'biscuits/search/:querry', component: BiscuitListComponent },
  { path: 'biscuit-form', component: BiscuitFormComponent },
  { path: 'biscuit-form/:type', component: BiscuitFormComponent },
  { path: 'biscuit-form-edit/:id', component: BiscuitFormEditComponent },
  { path: 'biscuit/:id', component: BiscuitDetailComponent },
  { path: 'biscuits/type/:type', component: BiscuitListComponent },
  { path: '**', redirectTo: 'biscuits', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
