# Config Service Documentation

Le service de configuration est une application Spring Boot qui sert de serveur de configuration centralisé pour les microservices dans un système distribué. Il utilise Spring Cloud Config Server pour gérer et fournir des propriétés de configuration aux autres microservices. Ce service est enregistré avec Eureka pour la découverte de services.

## Table des Matières

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Installation et Configuration](#installation-et-configuration)
- [Exécution de l'Application](#exécution-de-lapplication)
- [Dépendances](#dépendances)
- [Endpoints](#endpoints)
- [Dépôt de Configuration](#dépôt-de-configuration)
- [Intégration avec Eureka](#intégration-avec-eureka)
- [Dépannage](#dépannage)
- [Conclusion](#conclusion)

## Aperçu

Le service de configuration est un composant critique dans une architecture de microservices. Il centralise la gestion des configurations pour tous les microservices, leur permettant de récupérer dynamiquement leurs propriétés de configuration à l'exécution. Cela élimine le besoin de coder en dur les valeurs de configuration dans chaque microservice et simplifie la gestion des configurations spécifiques à l'environnement (par exemple, dev, test, prod).

## Fonctionnalités

- **Configuration Centralisée** : Fournit une source unique de vérité pour les propriétés de configuration.
- **Backend Git** : Stocke les fichiers de configuration dans un dépôt Git, permettant le contrôle de version et des mises à jour faciles.
- **Intégration Eureka** : S'enregistre avec Eureka pour la découverte de services, permettant aux autres services de localiser le service de configuration.
- **Support Actuator** : Expose des endpoints de santé et de métriques pour la surveillance.

## Installation et Configuration

### Prérequis

- Java 17
- Maven
- Git (pour le dépôt de configuration)

### Fichiers de Configuration

#### `application.properties`

Le fichier de configuration principal pour le service de configuration est situé dans `src/main/resources/application.properties`. Les propriétés clés incluent :

```ini
server.port=8888
spring.application.name=config-server
spring.cloud.config.server.git.uri=file:///D:/5IIR/micro-services/ecom-app/config-repo
eureka.client.prefer-same-zone-eureka=true

config-repo/
├── application.yml
├── service1.yml
├── service2.yml
└── ...


config-repo/
├── application.yml
├── service1.yml
├── service2.yml
└── ...
```

Chaque fichier correspond à un microservice ou un environnement spécifique.


## Exécution de l'Application
Étapes pour Exécuter
Cloner le Dépôt : Assurez-vous que le dépôt Git contenant les fichiers de configuration est accessible.  
Construire l'Application :  
mvn clean install
Exécuter l'Application :  
mvn spring-boot:run
Vérifier : Le service de configuration démarrera sur le port 8888 et s'enregistrera avec Eureka.  
Dépendances
Le service de configuration utilise les dépendances clés suivantes :  
Spring Boot : Framework principal pour la construction de l'application.
Spring Cloud Config Server : Fournit la gestion centralisée des configurations.
Spring Cloud Netflix Eureka Client : Permet l'enregistrement et la découverte des services.
Spring Boot Actuator : Ajoute des vérifications de santé et des capacités de surveillance.
Ces dépendances sont définies dans le fichier pom.xml :



## Endpoints
Le service de configuration expose les endpoints suivants :  
Endpoint de Configuration  
URL : http://localhost:8888/{application}/{profile}[/{label}] 
Description : Récupère les propriétés de configuration pour une application et un profil spécifiques.  
Exemple :  
GET http://localhost:8888/service1/default
Cela récupère la configuration pour service1 avec le profil default.  
Endpoints Actuator  
Vérification de Santé : http://localhost:8888/actuator/health
Info : http://localhost:8888/actuator/info
Métriques : http://localhost:8888/actuator/metrics
Dépôt de Configuration
Le service de configuration récupère les fichiers de configuration d'un dépôt Git. Le dépôt doit être structuré comme suit :

config-repo/
├── application.yml          # Configuration partagée pour tous les services
├── service1.yml             # Configuration pour service1
├── service2-dev.yml         # Configuration pour service2 dans l'environnement dev
└── service2-prod.yml        # Configuration pour service2 dans l'environnement prod


## Intégration avec Eureka
Le service de configuration s'enregistre avec Eureka pour la découverte de services. Cela permet aux autres microservices de localiser dynamiquement le service de configuration.
Propriétés Clés pour l'Intégration Eureka
# Propriétés Clés pour l'Intégration Eureka
eureka.client.service-url.defaultZone=http://localhost:8761/eureka
eureka.client.prefer-same-zone-eureka=true


eureka.client.service-url.defaultZone : L'URL du serveur Eureka.
eureka.client.prefer-same-zone-eureka : Assure que le service préfère les instances Eureka dans la même zone.
## Dépannage
Problèmes Courants
Dépôt Git Non Trouvé :  
Assurez-vous que la propriété spring.cloud.config.server.git.uri pointe vers un dépôt Git valide.
Vérifiez que le dépôt est accessible et contient les fichiers de configuration requis.
Échec de l'Enregistrement Eureka :  
Vérifiez si le serveur Eureka est en cours d'exécution et accessible.
Vérifiez la propriété eureka.client.service-url.defaultZone.
Configuration Non Chargée :  
Assurez-vous que les fichiers de configuration dans le dépôt Git suivent la convention de nommage correcte ({application}-{profile}.yml).
## Conclusion
Le service de configuration est un composant vital dans une architecture de microservices, fournissant une gestion centralisée des configurations. En tirant parti de Spring Cloud Config Server et Eureka, il simplifie la gestion des configurations et améliore la scalabilité et la maintenabilité des microservices.  Pour plus d'informations, consultez la documentation de Spring Cloud Config.