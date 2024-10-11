import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent }
];
