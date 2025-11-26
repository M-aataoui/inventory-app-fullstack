import { Routes } from '@angular/router';
import { ProductFormComponent } from './features/product-list/product-form/product-form.component';
import { ProductListComponent } from './features/product-list/product-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'add', pathMatch: 'full' },

  { path: 'add', component: ProductFormComponent },

  { path: 'edit/:id', component: ProductFormComponent },

  { path: 'products', component: ProductListComponent },

  { path: '**', redirectTo: 'add' }
];
