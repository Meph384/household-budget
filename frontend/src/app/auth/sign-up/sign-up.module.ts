import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { AuthModule } from "../auth.module";
import { MatInputModule } from "@angular/material/input";



@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    MatInputModule
  ]
})
export class SignUpModule { }
