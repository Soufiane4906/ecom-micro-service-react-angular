# Microservice: Customer-Service

The **Customer-Service** is a Spring Boot application that manages customer information. It provides REST endpoints to interact with customer data and supports projections for customized data views.

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

The **Customer-Service** is responsible for managing customer data, including their names and email addresses. It provides RESTful APIs to create, retrieve, and search for customers. The service also supports **Spring Data REST projections** to customize the data returned in API responses.

---

## Features
- **Customer Management**: Create, retrieve, and search for customers.
- **Projections**: Customize the data returned in API responses.
- **RESTful API**: Exposes endpoints for customer operations.
- **Integration with Config Server**: Fetches configuration from a centralized config server.

---

## Entities
### **Customer**
**Description**: Represents a customer.

**Attributes**:
- `id`: Unique identifier for the customer.
- `name`: Name of the customer.
- `email`: Email address of the customer.

---

## Repositories
### **CustomerRepository**
**Description**: Repository for managing `Customer` entities.

**Methods**:
- `findByNameOrEmail(String keyword)`: Searches for customers by name or email.

---

## Projections
### **CustomerProjection**
**Description**: A Spring Data REST projection for the `Customer` entity.

**Attributes**:
- `id`: Customer ID.
- `name`: Customer name.
- `email`: Customer email.

---

## Endpoints

### **Customer Endpoints**
1. **Get All Customers**:
   ```bash
   GET /customers
