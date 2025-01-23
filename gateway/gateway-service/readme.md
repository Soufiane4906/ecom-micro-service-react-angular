# Microservice: Gateway-Service

The **Gateway-Service** is a Spring Boot application that acts as an API Gateway in a microservices architecture. It provides a single entry point for client requests, routing them to the appropriate microservices. It also integrates with Eureka for service discovery and supports CORS for cross-origin requests.

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Dependencies](#dependencies)
6. [Conclusion](#conclusion)

---

## Overview

The **Gateway-Service** is a critical component in a microservices ecosystem. It acts as a reverse proxy, routing incoming requests to the appropriate microservices based on the request path. It integrates with Eureka for dynamic service discovery and supports CORS to handle cross-origin requests from frontend applications.

---

## Features
- **API Gateway**: Provides a single entry point for client requests.
- **Dynamic Routing**: Routes requests to microservices using Eureka service discovery.
- **CORS Support**: Allows cross-origin requests from specified origins.
- **Centralized Configuration**: Fetches configuration from a centralized config server.

---

## Configuration

### **application.properties**
**Key Properties**:
```properties
spring.application.name=gateway-service
spring.config.import=optional:configserver:http://localhost:8888/
management.endpoints.web.exposure.include=*
eureka.client.prefer-same-zone-eureka=true
