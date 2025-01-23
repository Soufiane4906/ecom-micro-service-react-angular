# Microservices Architecture Project

This project demonstrates a **Microservices Architecture** built with Spring Boot, Spring Cloud, and various other tools. It includes the following core services:

1. **Discovery-Service**: Service discovery using Eureka.
2. **Gateway-Service**: API Gateway for centralized routing and CORS handling.
3. **Customer-Service**: Manages customer data.
4. **Inventory-Service**: Manages product inventory.

## Table of Contents

1. [Overview](#overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Core Services](#core-services)
    - [Discovery-Service](#discovery-service)
    - [Gateway-Service](#gateway-service)
    - [Customer-Service](#customer-service)
    - [Inventory-Service](#inventory-service)
4. [Technology Stack](#technology-stack)
5. [How to Run the Project](#how-to-run-the-project)
6. [Configuration](#configuration)
7. [API Endpoints](#api-endpoints)
8. [Future Improvements](#future-improvements)
9. [Conclusion](#conclusion)

---

## Overview

This project showcases how microservices communicate dynamically via a **service registry** and **API gateway**. It demonstrates:

- Decoupled architecture for scalability and maintainability.
- Centralized service discovery via Eureka.
- Dynamic routing using Spring Cloud Gateway.
- RESTful APIs for domain-specific services.

## Architecture Diagram

_(Include a diagram showing all microservices and their interactions, highlighting the roles of Discovery-Service, Gateway-Service, and domain-specific services.)_

## Core Services

### Discovery-Service
- **Description**: Acts as a **Eureka Server**, enabling service discovery and registration.
- **Port**: `8761`
- **Key Features**:
    - Centralized registry for microservices.
    - High availability with clustering.
- **Access the Eureka Dashboard**:  
  [http://localhost:8761](http://localhost:8761)

---

### Gateway-Service
- **Description**: Provides a centralized **API Gateway** for routing requests to the appropriate microservices.
- **Port**: `8080`
- **Key Features**:
    - Dynamic routing via service discovery.
    - CORS support for frontend applications.
    - Centralized entry point for client requests.

---

### Customer-Service
- **Description**: Manages customer data, including names and email addresses.
- **Port**: `8081`
- **Key Features**:
    - CRUD operations for customers.
    - Search functionality (by name or email).
    - Data projections for customized API responses.

---

### Inventory-Service
- **Description**: Manages product inventory, including product names, prices, and quantities.
- **Port**: `8083`
- **Key Features**:
    - CRUD operations for products.
    - Search functionality (by name or category).
    - Data projections for customized API responses.

---

## Technology Stack

- **Java 17**
- **Spring Boot** (Eureka, Gateway, Data JPA, REST)
- **Spring Cloud** (Netflix Eureka, Config Server, Gateway)
- **Lombok** for reducing boilerplate code
- **Maven** for dependency management
- **H2 Database** for local development

## How to Run the Project

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Start the services in order**:
    - **Discovery-Service**:
      ```bash
      cd discovery-service
      mvn clean install
      mvn spring-boot:run
      ```
    - **Gateway-Service**:
      ```bash
      cd gateway-service
      mvn clean install
      mvn spring-boot:run
      ```
    - **Customer-Service**:
      ```bash
      cd customer-service
      mvn clean install
      mvn spring-boot:run
      ```
    - **Inventory-Service**:
      ```bash
      cd inventory-service
      mvn clean install
      mvn spring-boot:run
      ```

3. **Verify**:
    - Eureka Dashboard: [http://localhost:8761](http://localhost:8761)
    - API Gateway: [http://localhost:8080](http://localhost:8080)

---

## Configuration

### Centralized Configuration
- All services fetch their configuration from a centralized **Config Server**.
- **Sample configuration file**: `application.properties` or `application.yml`

### Key Configurations
- **Discovery-Service**:
  ```properties
  eureka.client.register-with-eureka=false
  eureka.client.fetch-registry=false
  ```
- **Gateway-Service**:
  ```properties
  spring.cloud.gateway.globalcors.corsConfigurations
  eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/
  ```
- **Customer-Service and Inventory-Service**:
  ```properties
  spring.config.import=optional:configserver:http://localhost:8888/
  eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/
  ```

---

## API Endpoints

### Gateway Endpoints
| Method | Path                         | Description                 |
|--------|------------------------------|-----------------------------|
| GET    | `/customers`                 | Get all customers           |
| GET    | `/customers/search/findByNameOrEmail` | Search customers by name/email |
| GET    | `/products`                  | Get all products            |
| GET    | `/products/search/byCategory`| Filter products by category |

### Eureka Endpoints
| Method | Path                 | Description                      |
|--------|----------------------|----------------------------------|
| GET    | `/eureka/apps`       | View all registered services     |
| GET    | `/eureka/apps/{id}`  | Get details of a specific service|

---

## Future Improvements

- Add **OAuth 2.0** for secure API authentication.
- Integrate with **Kubernetes** for container orchestration.
- Use **ELK Stack** for centralized logging and monitoring.
- Implement **circuit breakers** using Spring Cloud Resilience4j.

---

## Conclusion

This project demonstrates the key aspects of building a microservices architecture, including service discovery, API gateway routing, and domain-specific services. Each microservice is designed to be scalable, resilient, and independent, following best practices in modern software architecture.

For any queries or contributions, feel free to raise an issue or submit a pull request.

