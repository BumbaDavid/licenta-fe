import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatStepperModule} from "@angular/material/stepper";
import {MatListModule} from "@angular/material/list";


const MaterialComponent =[
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatMenuModule,
  MatSelectModule,
  ScrollingModule,
  FormsModule,
  MatChipsModule,
  MatIconModule,
  MatExpansionModule,
  MatDialogModule,
  MatSidenavModule,
  MatCheckboxModule,
  BrowserAnimationsModule,
  MatGridListModule,
  MatDividerModule,
  MatStepperModule,
  MatListModule,
];

@NgModule({
  imports:[MaterialComponent],
  exports: MaterialComponent,
})
export class MaterialModule {}
