# Microservice: Inventory-Service

The **Inventory-Service** is a Spring Boot application that manages product inventory. It provides RESTful APIs to interact with product data, supports projections for customized data views, and integrates with a centralized configuration server.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Entities](#entities)
4. [Repositories](#repositories)
5. [Projections](#projections)
6. [Endpoints](#endpoints)
7. [Configuration](#configuration)
8. [Running the Application](#running-the-application)
9. [Dependencies](#dependencies)
10. [Conclusion](#conclusion)

---

## Overview

The **Inventory-Service** is responsible for managing product data, including product names, prices, and quantities. It provides RESTful APIs to create, retrieve, and search for products. The service also supports Spring Data REST projections to customize the data returned in API responses.

---

## Features

- **Product Management**: Create, retrieve, and search for products.
- **Projections**: Customize the data returned in API responses.
- **RESTful API**: Exposes endpoints for product operations.
- **Centralized Configuration**: Fetches configuration from a centralized config server.

---

## Entities

### **Product**
**Description**: Represents a product in the inventory.

**Attributes**:
- `id`: Unique identifier for the product.
- `name`: Name of the product.
- `price`: Price of the product.
- `quantity`: Quantity of the product in stock.

---

## Repositories

### **ProductRepository**
**Description**: Repository for managing Product entities.

**Methods**:
- `findByNameContains(String keyword, Pageable pageable)`: Searches for products by name.
- `findByNameStartsWith(String category, Pageable pageable)`: Filters products by category (e.g., "Computer", "Printer", "Smart Phone").

---

## Projections

### **ProductProjection**
**Description**: A Spring Data REST projection for the Product entity.

**Attributes**:
- `id`: Product ID.
- `name`: Product name.
- `price`: Product price.
- `quantity`: Product quantity.

---

## Endpoints

### **Product Endpoints**
- **Get All Products**:
  ```bash
  GET /products
  ```

- **Get Product by ID**:
  ```bash
  GET /products/{id}
  ```

- **Search Products by Name**:
  ```bash
  GET /products/search/byName?keyword={keyword}
  ```

- **Filter Products by Category**:
  ```bash
  GET /products/search/byCategory?category={category}
  ```

### **Projection Endpoint**
- **Get Product with Projection**:
  ```bash
  GET /products/{id}?projection=p1
  ```

### **Configuration Endpoint**
- **Get Configuration Parameters**:
  ```bash
  GET /params
  ```

---

## Configuration

### **application.properties**

**Key Properties**:
```properties
spring.application.name=inventory-service
server.port=8083
spring.config.import=optional:configserver:http://localhost:8888
inventory.param1=valeur1
inventory.param2=valeur2
```

**Explanations**:
- `spring.application.name`: The name of the inventory service.
- `server.port`: The port on which the service runs (default: 8083).
- `spring.config.import`: Fetches configuration from a centralized config server.
- `inventory.param1` and `inventory.param2`: Custom configuration parameters.

---

## Running the Application

### **Steps to Run**

1. **Build the Application**:
   ```bash
   mvn clean install
   ```

2. **Run the Application**:
   ```bash
   mvn spring-boot:run
   ```

3. **Verify**: The service will start on port 8083. You can access the endpoints and verify functionality.

---

## Dependencies

- **Spring Boot**: Core framework for building the application.
- **Spring Data JPA**: Manages data access and repositories.
- **Spring Data REST**: Exposes repositories as RESTful endpoints.
- **Lombok**: Simplifies code with annotations like `@Data`, `@Builder`, etc.

---

## Conclusion

The **Inventory-Service** provides a simple and efficient way to manage product data. With support for projections, RESTful APIs, and centralized configuration, it offers flexibility and ease of use for client applications.

For further information, refer to the [Spring Data REST documentation](https://spring.io/projects/spring-data-rest).

