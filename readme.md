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