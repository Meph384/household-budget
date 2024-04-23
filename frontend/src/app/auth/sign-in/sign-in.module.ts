import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { AuthModule } from "../auth.module";
import { MatInputModule } from "@angular/material/input";



@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    MatInputModule
  ]
})
export class SignInModule { }
