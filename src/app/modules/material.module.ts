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
  MatExpansionModule
];

@NgModule({
  imports:[MaterialComponent],
  exports: MaterialComponent,
})
export class MaterialModule {}
