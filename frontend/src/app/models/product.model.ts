// src/app/models/product.model.ts

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  createdAt?: string;

  // nouveaux champs optionnels, alignés avec le backend
  status?: 'EN_STOCK' | 'RUPTURE' | 'ARCHIVE';
  category?: string;
}
