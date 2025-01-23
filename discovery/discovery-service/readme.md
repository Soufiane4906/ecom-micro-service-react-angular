# Microservice: Discovery-Service

The **Discovery-Service** is a Spring Boot application that acts as a Eureka Server for service discovery in a microservices architecture. It allows other microservices to register themselves and discover each other dynamically.

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

The **Discovery-Service** is a critical component in a microservices ecosystem. It uses **Netflix Eureka** to provide service discovery capabilities, enabling microservices to locate and communicate with each other without hardcoding service locations.

---

## Features
- **Service Discovery**: Allows microservices to register and discover each other.
- **Centralized Registry**: Maintains a centralized registry of all available services.
- **Health Monitoring**: Tracks the health of registered services.
- **High Availability**: Supports clustering for high availability.

---

## Configuration

### **application.properties**
**Key Properties**:
```properties
server.port=8761
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
