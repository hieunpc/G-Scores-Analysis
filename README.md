# G-Score Analysis System

A full-stack web application for analyzing Vietnamese National High School Graduation Exam (THPT 2024) results. The system efficiently processes and visualizes over 1 million student records, providing real-time statistical insights and interactive data exploration.

## 🌟 Core Features

- **Score Lookup**: Search individual student scores by registration number (SBD)
- **Statistical Reports**: Interactive charts showing score distribution across 9 subjects and 5 performance levels
- **Top Students**: View highest-scoring students by exam groups (A, B, C, D)
- **Responsive Design**: Mobile-friendly interface built with React and Tailwind CSS

## 🚀 Live Demo

- **Frontend**: https://697faac01e35da658238b920--g-scores-hnpc.netlify.app/
- **Backend API**: https://g-score-backend-ptfq.onrender.com
- **API Health Check**: https://g-score-backend-ptfq.onrender.com/

## 🏗️ Tech Stack

### Backend

- **Framework**: NestJS (Node.js)
- **Database**: PostgreSQL with TypeORM
- **Hosting**: Render (Free tier)

### Frontend

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Routing**: React Router
- **Build Tool**: Vite
- **Hosting**: Netlify

### Database

- **PostgreSQL**: 1,065,478 student records
- **Schema**: 9 subject scores + metadata per student

## 🚀 Quick Start

### Option 1: Full Docker + Local Seed (Recommended)

Run all services with Docker but seed database from local machine to avoid memory issues:

```bash
# Clone repository
git clone https://github.com/hieunpc/G-Scores-Analysis.git
cd G-Scores-Analysis

# Start all services
docker-compose up -d

# Check if services are running
docker-compose ps

# Run migrations inside container
docker-compose exec backend npm run migration:run:prod
```

**Create `.env` file in `backend` folder** for local seed connection:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=g_scores
```

**Seed database from local machine** (one-time only, takes ~2-5 minutes):

```bash
cd backend
npm install  # if not installed
npm run seed
```

Access the application:

- **Frontend**: `http://localhost` (port 80)
- **Backend API**: `http://localhost:3000`

Stop services:

```bash
docker-compose down
# To remove database volumes: docker-compose down -v
```

**Prerequisites**: Node.js 18+, npm, Docker

---

### Option 2: Docker for PostgreSQL Only + Local Backend/Frontend

This approach provides better development experience with hot-reload:

```bash
# Clone repository
git clone https://github.com/hieunpc/G-Scores-Analysis.git
cd G-Scores-Analysis

# Start only PostgreSQL with Docker
docker-compose up -d postgres

# Wait for PostgreSQL to be ready (about 10 seconds)
docker-compose ps
```

**Create `.env` file in `backend` folder** with the following content:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=g_scores
```

Continue setup:

```bash
# Setup Backend
cd backend
npm install

# Run migrations and seed database (takes ~2-5 minutes)
npm run migration:run
npm run seed

# Start backend
npm run start:dev
```

Backend will run at `http://localhost:3000`

In a new terminal:

```bash
# Setup Frontend
cd frontend
npm install

# Start frontend
npm run dev
```

Frontend will run at `http://localhost:5173`

**Prerequisites**: Node.js 18+, npm, Docker

---

## 🛠️ Development with Local PostgreSQL

If you prefer not to use Docker at all:

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### Setup Steps

1. **Install PostgreSQL locally and create database**

```bash
createdb g_scores
```

2. **Clone and setup backend**

```bash
git clone https://github.com/hieunpc/G-Scores-Analysis.git
cd G-Scores-Analysis/backend
npm install
```

3. **Configure environment variables**

Create `.env` file in backend folder:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=g_scores
```

4. **Run migrations and seed database** (takes ~2-5 minutes)

```bash
npm run migration:run
npm run seed
```

5. **Start development server**

```bash
npm run start:dev
```

Backend will run at `http://localhost:3000`

### Frontend Setup

1. **Navigate to frontend folder**

```bash
cd ../frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure API URL**
   Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000
```

4. **Start development server**

```bash
npm run dev
```

Frontend will run at `http://localhost:5173`

## API Endpoints

### Students

- `GET /students/:sbd` - Get student by registration number

### Reports

- `GET /report/score-levels` - Get score distribution for all subjects
- `GET /report/score-levels?subject=toan` - Get distribution for specific subject
- `GET /report/top-students?group=A&limit=10` - Get top students by exam group

### Example Response

```json
{
    "success": true,
    "data": {
        "sbd": "01000001",
        "toan": 8.75,
        "ngu_van": 7.5,
        "ngoai_ngu": 9.0
    }
}
```

## 📄 Data Source

Dataset: Vietnamese National High School Graduation Exam 2024 results

- **Records**: 1,065,478 students
- **Format**: CSV (80MB)
- **3. External Database Connectivity
  **Problem\*\*: Connection failures when seeding from local to Render PostgreSQL.

**Solution**: Configured conditional SSL (`rejectUnauthorized: false`) for production, used external hostname with individual connection parameters.

## 🚢 Production Deployment

### Backend (Render)

1. Connect GitHub repository to Render
2. Create new Web Service
3. Set build command: `npm install && npm run build`
4. Set start command: `npm run start:prod`
5. Add environment variables (production PostgreSQL credentials)
6. Database indexes auto-created via TypeORM synchronization

### Frontend (Netlify)

1. Connect GitHub repository to Netlify
2. Set base directory: `frontend`
3. Set build command: `npm run build`
4. Set publish directory: `frontend/dist`
5. Add environment variable: `VITE_API_URL=https://g-score-backend-ptfq.onrender.com`

## 🚧 Technical Challenges & Solutions

### 1. Memory-Constrained Data Seeding

**Problem**: Render free tier (512MB RAM) couldn't load 80MB CSV with 1M+ records (~300MB in memory). Crashed after 161k/1M records.

**Solution**: Seed from local machine with SSL connection to production database. Added skip logic to prevent re-seeding on deployments. Trade-off: streaming approach was too slow (30+ min vs 2-5 min).

### 2. Severe API Performance Issues

**Problem**: `/report/score-levels` took 330 seconds (5.5 minutes) - 45 COUNT queries without indexes scanning 1M+ rows repeatedly.

**Solution**:

- Added `@Index` decorators on all 9 score columns
- Implemented 1-hour in-memory cache
- **Result**: 98% improvement (330s → 15s - 30s first load, <1s cached)

### 4. SSL Connection for External Database Access

**Challenge**: Could not connect to Render PostgreSQL from local machine for seeding - connection refused and authentication errors.

**Solutions**:

- Configured conditional SSL based on NODE_ENV for production connections
- Used external hostname format instead of internal database endpoint
- Set individual connection parameters (host, port, username, password) rather than connection string
- Added SSL with `rejectUnauthorized: false` for managed database certificates

### 5. CORS Configuration for Cross-Origin Deployment

**Challenge**: Frontend (Netlify) and backend (Render) on different domains required proper CORS setup.

**Solution**:

- Configured whitelist-based CORS with localhost ports for development
- Used regex pattern `/\.netlify\.app$/` to match all Netlify subdomains
- Enabled credentials and specified allowed methods/headers for secure cross-origin requests

### 4. Cross-Origin Setup

**Problem**: Frontend (Netlify) and backend (Render) on different domains.

**Solution**: Whitelist CORS with localhost for dev + regex `/\.netlify\.app$/` for all production subdomains.

- Vietnamese Ministry of Education and Training for providing the examination dataset
- NestJS and React communities for comprehensive documentation and best practices
- Render and Netlify for accessible cloud hosting platforms
