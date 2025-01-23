package or.sid.billingservice.web;

import or.sid.billingservice.entities.Bill;
import or.sid.billingservice.entities.ProductItem;
import or.sid.billingservice.model.Customer;
import or.sid.billingservice.model.Product;
import or.sid.billingservice.repository.BillRepository;
import or.sid.billingservice.repository.ProductItemRepository;
import or.sid.billingservice.services.CustomerRestClient;
import or.sid.billingservice.services.InventoryRestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
@RestController
public class BillingRestController {

    @Autowired private BillRepository billRepository;
    @Autowired private ProductItemRepository productItemRepository;
    @Autowired private CustomerRestClient customerRestClient;
    @Autowired private InventoryRestClient inventoryRestClient;


    @GetMapping("/products/{id}/isPurchased")
    public boolean isProductPurchased(@PathVariable Long id) {
        List<ProductItem> productItems = productItemRepository.findByProductId(id);
        return !productItems.isEmpty();
    }

    @GetMapping("/fullBill/{id}")
    public Bill getBill(@PathVariable Long id){
        Bill bill = billRepository.findById(id).get();
        Customer customer = customerRestClient.customerById(bill.getCustomerId());
        bill.setCustomer(customer);
        for(ProductItem pi : bill.getProductItems()){
            Product product = inventoryRestClient.productById(pi.getProductId());
            pi.setProduct(product);
        }
        return bill;
    }

    @PostMapping("/productItems")
    public ProductItem addProductItem(@RequestBody ProductItem productItem) {
        return productItemRepository.save(productItem);
    }

    @PutMapping("/productItems/{id}")
    public ProductItem updateProductItem(@PathVariable Long id, @RequestBody ProductItem productItem) {
        productItem.setId(id);
        return productItemRepository.save(productItem);
    }

    @DeleteMapping("/productItems/{id}")
    public void deleteProductItem(@PathVariable Long id) {
        productItemRepository.deleteById(id);
    }

    @PostMapping("/products/{id}/purchase")
    public ResponseEntity<?> purchaseProduct(@PathVariable Long id, @RequestParam int quantity) {
        try {
            // Fetch the product
            Product product = inventoryRestClient.productById(id);
            if (product.getQuantity() < quantity) {
                return ResponseEntity.badRequest().body("Not enough stock available");
            }

            // Update the product quantity
            product.setQuantity(product.getQuantity() - quantity);
            inventoryRestClient.updateProduct(id, product);

            // Create a bill for the user with ID 1
            Bill bill = Bill.builder()
                    .createdAt(new Date())
                    .customerId(1L) // Assuming user ID 1 is the buyer
                    .build();
            Bill savedBill = billRepository.save(bill);

            // Create a product item for the bill
            ProductItem productItem = ProductItem.builder()
                    .productId(product.getId())
                    .price(product.getPrice())
                    .quantity(quantity)
                    .bill(savedBill)
                    .build();
            productItemRepository.save(productItem);

            return ResponseEntity.ok("Purchase successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Purchase failed: " + e.getMessage());
        }
    }

}