3-tier-banking-app/
├─ README.md
├─ docker-compose.yml
├─ .env.example
├─ backend/
│ ├─ package.json
│ ├─ Dockerfile
│ ├─ src/
│ │ ├─ index.js
│ │ ├─ config.js
│ │ ├─ routes/
│ │ │ ├─ auth.js
│ │ │ ├─ accounts.js
│ │ │ └─ transactions.js
│ │ └─ db/
│ │ └─ init.sql
├─ frontend/
│ ├─ package.json
│ ├─ Dockerfile
│ └─ src/
│ ├─ index.js
│ ├─ App.js
│ ├─ api.js
│ └─ components/
│ ├─ Login.js
│ ├─ Dashboard.js
│ └─ TransferForm.js



3-Tier Banking Application

A fully containerized 3-tier banking application with React frontend, Node.js/Express backend, and PostgreSQL/MySQL RDS database, deployed on AWS EKS using Helm charts and CI/CD via GitHub Actions.

Table of Contents

Project Overview

Architecture

Folder Structure

Technology Stack

Setup & Deployment

Helm Chart Overview

CI/CD Pipeline

RDS Database Migrations

License

Project Overview

This project implements a banking system where users can:

Log in to the system

View their account dashboard

Transfer funds between accounts

It is designed as a 3-tier application:

Frontend: React SPA (Single Page Application)

Backend: Node.js + Express REST API

Database: RDS (PostgreSQL or MySQL)

The application is fully containerized using Docker and orchestrated on AWS EKS with Helm charts. Database migrations are executed inside Kubernetes, following production best practices.

Architecture
+-------------------+
|    React Frontend |
|   (Docker/EKS)    |
+-------------------+
          |
          v
+-------------------+
| Node.js Backend   |
| (Docker/EKS)      |
+-------------------+
          |
          v
+-------------------+
|  RDS Database     |
|  PostgreSQL/MySQL |
+-------------------+


Frontend and backend run in separate Kubernetes deployments.

Database is hosted on RDS inside a private subnet.

Backend communicates securely with RDS using Kubernetes secrets.

Helm charts manage deployment, services, ingress, and DB migration job.

Folder Structure
3tierapplication/
│
├─ backend/
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ src/
│  │  ├─ index.js
│  │  ├─ config.js
│  │  └─ routes/
│  │      ├─ auth.js
│  │      └─ accounts.js
│  └─ db/
│     ├─ init.sql (optional for local dev)
│
├─ frontend/
│  ├─ Dockerfile
│  ├─ package.json
│  ├─ public/
│  │   └─ index.html
│  └─ src/
│      ├─ index.js
│      ├─ App.js
│      ├─ api.js
│      └─ components/
│          ├─ Dashboard.js
│          ├─ Login.js
│          └─ TransferForm.js
│
├─ helm/
│  ├─ Chart.yaml
│  ├─ values.yaml
│  └─ templates/
│      ├─ backend-deployment.yaml
│      ├─ frontend-deployment.yaml
│      ├─ service-backend.yaml
│      ├─ service-frontend.yaml
│      ├─ ingress.yaml
│      ├─ db-migrate-job.yaml
│      └─ db-migration-configmap.yaml
│
├─ docker-compose.yml (optional local dev)
└─ readme.md

Technology Stack
Layer	Technology
Frontend	React, React-Router, Axios
Backend	Node.js, Express, JWT
Database	PostgreSQL/MySQL (AWS RDS)
Orchestration	Kubernetes (AWS EKS)
CI/CD	GitHub Actions, Docker, ECR
Deployment	Helm Charts
Setup & Deployment
Prerequisites

AWS account with EKS cluster and RDS instance

AWS CLI configured locally or GitHub secrets set (AWS_ACCESS_KEY, AWS_SECRET_KEY, EKS_CLUSTER_NAME)

Helm installed (helm version)

Docker installed (docker version)

1. Clone Project
git clone https://github.com/yourusername/3tierapplication.git
cd 3tierapplication

2. Build Docker Images (Optional local)
docker build -t backend ./backend
docker build -t frontend ./frontend

3. Deploy Helm Chart
cd helm
helm install banking-app . --namespace default


Backend and frontend deployments will start.

db-migrate Job will run once to initialize RDS schema.

4. Access the Application

Frontend service exposed via Ingress or LoadBalancer.

Backend API accessible only inside cluster or via Ingress.

Helm Chart Overview

backend-deployment.yaml → Node.js backend deployment

frontend-deployment.yaml → React frontend deployment

db-migrate-job.yaml → Kubernetes Job for DB migrations

db-migration-configmap.yaml → SQL scripts for migration

service-backend.yaml / service-frontend.yaml → ClusterIP services

ingress.yaml → optional ingress for exposing frontend

Values.yaml holds configurable options like:

backend:
  image:
    repository: <ECR_REPO>
    tag: latest

frontend:
  image:
    repository: <ECR_REPO>
    tag: latest

rds:
  secretName: rds-secret

CI/CD Pipeline

GitHub Actions workflow:

Build & Test → Install dependencies, build frontend, lint backend

Docker Build & Push → Build images for frontend & backend, push to ECR

Deploy via Helm → Upgrade/install Helm chart to EKS

DB Migration → Runs inside Kubernetes using Job, not GitHub Actions

Secrets required in GitHub repository:

Secret Name	Description
AWS_ACCESS_KEY	AWS access key
AWS_SECRET_KEY	AWS secret key
EKS_CLUSTER_NAME	Name of EKS cluster
RDS_HOST	RDS endpoint
RDS_PORT	RDS port (3306 or 5432)
RDS_USERNAME	RDS database username
RDS_PASSWORD	RDS database password
RDS_DBNAME	RDS database name
ECR_REGISTRY	AWS ECR registry URL
RDS Database Migrations

SQL scripts located in Helm ConfigMap db-migration-configmap.yaml

Migration Job db-migrate-job.yaml runs inside cluster, ensuring secure connectivity

No need for public RDS access from GitHub Actions
==================================================================
soumya@DESKTOP-AE8RNVJ:~/easyrsa/pki$ aws acm import-certificate \
  --certificate fileb:///home/soumya/easyrsa/pki/issued/client1.crt \
  --private-key fileb:///home/soumya/easyrsa/pki/private/client1.key \
  --certificate-chain fileb:///home/soumya/easyrsa/pki/ca.crt \
  --region ap-south-1
{
    "CertificateArn": "arn:aws:acm:ap-south-1:096803082838:certificate/9c1f01c6-43af-45fc-b74d-54535e423923"
}


soumya@DESKTOP-AE8RNVJ:~/easyrsa/pki$ aws acm import-certificate \
  --certificate fileb:///home/soumya/easyrsa/pki/issued/server_leaf.crt \
  --private-key fileb:///home/soumya/easyrsa/pki/private/server.key \
  --certificate-chain fileb:///home/soumya/easyrsa/pki/ca.crt \
  --region ap-south-1
{
    "CertificateArn": "arn:aws:acm:ap-south-1:096803082838:certificate/174d692b-afba-41b9-8dd2-6f8efde09f5f"
}
sou


 git config --global user.email "ranjan.soumya@8055.com"
 git config --global user.name "Soumya Ranjan"

ls -R | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/ /'

 aws eks update-kubeconfig --name ncl-cluster --region ap-south-1

 terraform apply   -var="cluster_name=ncl-cluster"   -var="nodegroup_name=ncl-node-group"   -var="db_username=dbuser"   -var="db_password=soumya987"   -auto-approve
 terraform destroy   -var="cluster_name=ncl-cluster"   -var="nodegroup_name=ncl-node-group"   -var="db_username=dbuser"   -var="db_password=soumya987"   -auto-approve
   74  history

kubectl logs pod/banking-app-banking-app-db-migrate-5wnpx




