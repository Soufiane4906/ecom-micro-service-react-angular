package org.sid.customerservice.repository;

import org.sid.customerservice.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

@RepositoryRestResource
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Recherche par nom ou email
    @Query("SELECT c FROM Customer c WHERE c.name LIKE %:keyword% OR c.email LIKE %:keyword%")
    List<Customer> findByNameOrEmail(@Param("keyword") String keyword);
}