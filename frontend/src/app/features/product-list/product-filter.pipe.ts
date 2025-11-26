// src/app/features/product-list/product-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../models/product.model';

@Pipe({
  name: 'productFilter',
  standalone: true
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[] | null | undefined, searchTerm: string | null | undefined): Product[] {
    if (!products) return [];
    if (!searchTerm || !searchTerm.trim()) return products;

    const term = searchTerm.trim().toLowerCase();

    return products.filter(p => {
      const name = p.name?.toLowerCase() ?? '';
      const description = p.description?.toLowerCase() ?? '';
      const category = (p as any).category?.toLowerCase?.() ?? '';
      const status = (p as any).status?.toString().toLowerCase?.() ?? '';

      return (
        name.includes(term) ||
        description.includes(term) ||
        category.includes(term) ||
        status.includes(term)
      );
    });
  }
}
