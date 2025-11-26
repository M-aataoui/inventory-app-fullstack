// src/app/features/product-list/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  editingProduct: Product | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // si on est en /edit/:id → charger le produit
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.productService.getById(id).subscribe({
        next: (product: Product) => {
          this.editingProduct = product;
          this.productForm.patchValue({
            name: product.name,
            description: product.description ?? '',
            price: product.price,
            stock: product.stock
          });
        },
        error: (err: any) => {
          console.error('Erreur chargement produit', err);
          this.errorMessage = 'Impossible de charger le produit.';
        }
      });
    }
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

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formValue = this.productForm.value;

    if (this.editingProduct) {
      // mode modification
      const updated: Product = {
        ...this.editingProduct,
        ...formValue
      };

      this.productService.update(updated).subscribe({
        next: () => {
          this.showSuccess('Produit mis à jour avec succès.');
          this.router.navigate(['/products']);
        },
        error: (err: any) => {
          this.showError('Erreur lors de la modification du produit.', err);
        }
      });

    } else {
      // mode création
      const product: Product = formValue;

      this.productService.create(product).subscribe({
        next: () => {
          this.showSuccess('Produit créé avec succès.');
          this.productForm.reset({
            name: '',
            description: '',
            price: 0,
            stock: 0
          });
        },
        error: (err: any) => {
          this.showError('Erreur lors de la création du produit.', err);
        }
      });
    }
  }
}
