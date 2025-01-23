# Microservice Billing-Service

Le microservice `billing-service` est une application Spring Boot qui gère la facturation des produits achetés par les clients. Il interagit avec deux autres microservices (`customer-service` et `inventory-service`) pour obtenir des informations sur les clients et les produits. Voici une documentation détaillée de ce microservice :

## 1. Structure du Projet

Le projet est structuré en plusieurs packages et classes principales :

- `or.sid.billingservice` : Package racine contenant la classe principale `BillingServiceApplication`.
- `or.sid.billingservice.entities` : Contient les entités JPA (`Bill`, `ProductItem`, `BillProjection`).
- `or.sid.billingservice.model` : Contient les modèles de données (`Customer`, `Product`).
- `or.sid.billingservice.repository` : Contient les interfaces de repository pour les entités (`BillRepository`, `ProductItemRepository`).
- `or.sid.billingservice.services` : Contient les clients Feign pour interagir avec les autres microservices (`CustomerRestClient`, `InventoryRestClient`).
- `or.sid.billingservice.web` : Contient le contrôleur REST (`BillingRestController`).

## 2. Entités

### 2.1. Bill

**Description** : Représente une facture.

**Attributs** :
- `id` : Identifiant unique de la facture.
- `createdAt` : Date de création de la facture.
- `customerId` : Identifiant du client associé à la facture.
- `customer` : Objet `Customer` (transient) représentant le client.
- `productItems` : Liste des `ProductItem` associés à la facture.

**Méthodes** :
- `getTotal()` : Calcule le montant total de la facture en fonction des produits achetés.

### 2.2. ProductItem

**Description** : Représente un produit acheté dans une facture.

**Attributs** :
- `id` : Identifiant unique de l'item.
- `productId` : Identifiant du produit acheté.
- `product` : Objet `Product` (transient) représentant le produit.
- `bill` : Facture associée à l'item.
- `quantity` : Quantité du produit acheté.
- `price` : Prix unitaire du produit.

**Méthodes** :
- `getAmount()` : Calcule le montant total pour cet item (quantité * prix).

### 2.3. BillProjection

**Description** : Projection Spring Data REST pour l'entité `Bill`.

**Attributs** :
- `id`, `createdAt`, `customerId` : Attributs de base de la facture.

## 3. Repositories

### 3.1. BillRepository

**Description** : Repository pour l'entité `Bill`.

**Méthodes** :
- `findByCustomerId(Long customerId)` : Retourne la liste des factures pour un client donné.

### 3.2. ProductItemRepository

**Description** : Repository pour l'entité `ProductItem`.

**Méthodes** :
- `findByProductId(Long productId)` : Retourne la liste des items pour un produit donné.

## 4. Clients Feign

### 4.1. CustomerRestClient

**Description** : Client Feign pour interagir avec le microservice `customer-service`.

**Méthodes** :
- `customerById(Long id)` : Récupère un client par son identifiant.
- `allCustomers()` : Récupère tous les clients.

### 4.2. InventoryRestClient

**Description** : Client Feign pour interagir avec le microservice `inventory-service`.

**Méthodes** :
- `allProducts()` : Récupère tous les produits.
- `productById(Long id)` : Récupère un produit par son identifiant.
- `updateProduct(Long id, Product product)` : Met à jour un produit.

## 5. Contrôleur REST

### 5.1. BillingRestController

**Description** : Contrôleur REST pour gérer les opérations de facturation.

**Endpoints** :
- `GET /products/{id}/isPurchased` : Vérifie si un produit a été acheté.
- `GET /fullBill/{id}` : Récupère une facture complète avec les informations du client et des produits.
- `POST /productItems` : Ajoute un nouvel item de produit.
- `PUT /productItems/{id}` : Met à jour un item de produit existant.
- `DELETE /productItems/{id}` : Supprime un item de produit.
- `POST /products/{id}/purchase` : Achète un produit en créant une facture et en mettant à jour le stock.

## 6. Configuration

### 6.1. application.properties

**Description** : Fichier de configuration pour le microservice.

**Propriétés** :
- `spring.application.name` : Nom du microservice.
- `server.port` : Port sur lequel le microservice écoute.
- `logging.level` : Niveau de log pour les clients Feign.
- `feign.client.config.default.loggerLevel` : Niveau de log pour Feign.
- `spring.config.import` : Importation de la configuration depuis un serveur de configuration.

## 7. Classe Principale

### 7.1. BillingServiceApplication

**Description** : Classe principale du microservice.

**Méthodes** :
- `main(String[] args)` : Point d'entrée de l'application.
- `CommandLineRunner start(...)` : Initialise des données de test au démarrage de l'application.
- `feignLoggerLevel()` : Configure le niveau de log pour Feign.

## 8. Flux de Travail

- **Initialisation** : Au démarrage, le microservice initialise des données de test en créant des factures et des items de produit aléatoires.
- **Achat de Produit** : Un client peut acheter un produit via l'endpoint `POST /products/{id}/purchase`. Le microservice vérifie la disponibilité du produit, met à jour le stock, crée une facture et un item de produit.
- **Récupération de Facture** : Une facture complète peut être récupérée via l'endpoint `GET /fullBill/{id}`, incluant les informations du client et des produits.
- **Gestion des Items** : Les items de produit peuvent être ajoutés, mis à jour ou supprimés via les endpoints correspondants.

## 9. Dépendances

- **Spring Boot** : Framework principal pour le développement de l'application.
- **Spring Data JPA** : Gestion des entités et des repositories.
- **Spring Cloud OpenFeign** : Client HTTP pour interagir avec d'autres microservices.
- **Lombok** : Simplification du code avec des annotations comme `@Data`, `@Builder`, etc.
- **Spring Data REST** : Exposition des repositories via REST.

## 10. Exécution

Pour exécuter le microservice, il suffit de lancer la classe `BillingServiceApplication`. Le microservice écoutera sur le port 8082 et sera prêt à recevoir des requêtes.

## 11. Tests

Le microservice peut être testé en utilisant des outils comme Postman ou curl pour interagir avec les endpoints exposés. Par exemple :

- **Acheter un produit** :
  ```bash
  curl -X POST "http://localhost:8082/products/1/purchase?quantity=2"