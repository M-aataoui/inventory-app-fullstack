# Inventory Management Application

A full-stack inventory management system built as a personal project to practice and demonstrate skills in  
**Angular**, **Spring Boot**, **PostgreSQL**, **Docker**, **DevOps**, and **Cloud deployment**.

---

##  Overview

This project implements a simple inventory management solution with full CRUD operations on products.  
It includes a modern Angular frontend, a REST API backend, a relational database, and a complete DevOps workflow with containerization and CI integration.

---

##  Technologies Used

### Frontend
- Angular 17  
- TypeScript  
- Nginx (production build)

### Backend
- Spring Boot 3  
- Java 17  
- REST API (Controller → Service → Repository)
- Maven build system  

### Database
- PostgreSQL (Dockerized)

### DevOps & Cloud
- Docker & Docker Compose  
- Nginx (reverse proxy + frontend hosting)  
- Jenkins (CI pipeline for backend & frontend builds)  
- AWS EC2 (Ubuntu deployment)

---

##  Project Features

- CRUD operations on products  
- Angular UI interacting with a REST API  
- Spring Boot backend with layered architecture  
- PostgreSQL database with persistent storage  
- Dockerized multi-container environment (frontend, backend, database)  
- Nginx serving Angular and proxying API routes  
- Jenkins pipeline for automated builds

---

## Project Structure

- backend/ → Spring Boot API
- frontend/ → Angular application
- frontend/nginx/ → Nginx configuration
- docker-compose.yml → Docker orchestration
- jenkins/Jenkinsfile → CI pipeline


---

##  CI/CD (Jenkins)

A Jenkins pipeline automates:

- GitHub repository checkout  
- Backend build using Maven  
- Frontend build using npm + Angular CLI  

It ensures that both parts of the application compile successfully on each update.

---

##  Deployment

The application has been deployed to an AWS EC2 Ubuntu instance using:

- Docker & Docker Compose  
- Nginx as a reverse proxy  
- Appropriate AWS Security Group rules  

---

##  Author

**Abdelhamid Maataoui**  
Master’s Student – Computer Science, Digital Governance  

