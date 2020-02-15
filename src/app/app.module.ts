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
  ],
  imports: [
    FormsModule,
    TooltipModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(), // ToastrModule added
    CollapseModule,
    HttpClientModule
  ],
  providers: [ReplacePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
