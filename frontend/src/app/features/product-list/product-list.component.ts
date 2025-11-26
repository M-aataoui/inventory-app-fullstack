// src/app/features/product-list/product-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductFilterPipe } from './product-filter.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductFilterPipe],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

  products$: Observable<Product[]>;
  searchTerm: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll();
  }

  reloadProducts(): void {
    this.products$ = this.productService.getAll();
  }

  onSearch(term: string): void {
    this.searchTerm = term;
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = null;
    setTimeout(() => {
      if (this.successMessage === message) {
        this.successMessage = null;
      }
    }, 3000);
  }

  private showError(message: string, err?: any): void {
    console.error(message, err);
    this.errorMessage = message;
    this.successMessage = null;
  }

  onDelete(product: Product): void {
    if (!product.id) return;

    const ok = confirm(`Supprimer le produit "${product.name}" ?`);
    if (!ok) return;

    this.productService.delete(product.id).subscribe({
      next: () => {
        this.showSuccess('Produit supprimé avec succès.');
        this.reloadProducts();
      },
      error: (err) => {
        this.showError('Erreur lors de la suppression du produit.', err);
      }
    });
  }

  getStatusLabel(status?: string): string {
    switch (status) {
      case 'EN_STOCK':
        return 'En stock';
      case 'RUPTURE':
        return 'Rupture de stock';
      case 'ARCHIVE':
        return 'Archivé';
      default:
        return '—';
    }
  }
}
