package com.abdelhamid.productservice.service;

import com.abdelhamid.productservice.model.Product;
import com.abdelhamid.productservice.model.ProductStatus;
import com.abdelhamid.productservice.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public Product getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable avec id " + id));
    }

    public Product create(Product p) {
        // Stock par défaut à 0 si null
        if (p.getStock() == null) {
            p.setStock(0);
        }

        // Statut calculé automatiquement à partir du stock
        if (p.getStock() == 0) {
            p.setStatus(ProductStatus.RUPTURE);   // indisponible
        } else {
            p.setStatus(ProductStatus.EN_STOCK);  // disponible
        }

        return repo.save(p);
    }

    public Product update(Long id, Product p) {
        Product existing = getById(id);

        existing.setName(p.getName());
        existing.setDescription(p.getDescription());
        existing.setCategory(p.getCategory());
        existing.setPrice(p.getPrice());
        existing.setStock(p.getStock());

        // ⚠️ On ignore le status envoyé par le front
        // et on le recalcule à chaque update
        Integer stock = existing.getStock();
        if (stock == null || stock == 0) {
            existing.setStatus(ProductStatus.RUPTURE);   // indisponible
        } else {
            existing.setStatus(ProductStatus.EN_STOCK);  // disponible
        }

        return repo.save(existing);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Produit introuvable avec id " + id);
        }
        repo.deleteById(id);
    }
}
