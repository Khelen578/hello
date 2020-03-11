import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BiscuitComponent } from './components/biscuit/biscuit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BiscuitListComponent } from './components/biscuit-list/biscuit-list.component';
import { BiscuitDetailComponent } from './components/biscuit-detail/biscuit-detail.component';
import { MenuComponent } from './components/menu/menu.component';
import { BiscuitFormComponent } from './components/biscuit-form/biscuit-form.component';
import { BiscuitFormEditComponent } from './components/biscuit-form-edit/biscuit-form-edit.component';
import { ReplacePipe } from './pipes/replace.pipe';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { CollapseModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AutofocusDirective } from './directives/autofocus.directive';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    BiscuitComponent,
    BiscuitListComponent,
    BiscuitDetailComponent,
    MenuComponent,
    BiscuitFormComponent,
    BiscuitFormEditComponent,
    ReplacePipe,
    AutofocusDirective,
    NotFoundComponent,
    LoginComponent,
  ],
  imports: [
    FormsModule,
    TooltipModule.forRoot(),
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(), // ToastrModule added
    CollapseModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [ReplacePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
