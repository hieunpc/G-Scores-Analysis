# G-Score Backend API

Backend API for analyzing Vietnamese high school exam scores (THPT 2024) with 1M+ student records.

## Prerequisites

- Node.js 18+
- Docker Desktop
- PostgreSQL (via Docker)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
# Copy .env.example to .env
cp .env.example .env
```

3. Start PostgreSQL database:
```bash
# From project root
cd ..
docker-compose up -d
```

4. Run database migrations:
```bash
npm run migration:run
```

5. Import data from CSV (takes 5-10 minutes):
```bash
npm run seed
```

## Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod
```

Server runs at `http://localhost:3000`

## API Endpoints

### 1. Get Student Score by SBD

**Endpoint:** `GET /students/:sbd`

**Description:** Retrieve exam scores for a specific student by their exam ID (SBD).

**Parameters:**
- `sbd` (path, required): 8-digit student exam ID

**Example:**
```bash
curl http://localhost:3000/students/01000001
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sbd": "01000001",
    "toan": "8.20",
    "ngu_van": "7.50",
    "ngoai_ngu": "9.00",
    "vat_li": "6.75",
    "hoa_hoc": "7.25",
    "sinh_hoc": "8.00",
    "lich_su": null,
    "dia_li": null,
    "gdcd": null,
    "ma_ngoai_ngu": "N1"
  }
}
```

**Validation:**
- SBD must be exactly 8 digits
- Returns 404 if student not found

---

### 2. Score Level Statistics

**Endpoint:** `GET /report/score-levels`

**Description:** Get statistics of students by score levels (4 levels: >=8, 6-8, 4-6, <4) for each subject.

**Query Parameters:**
- `subject` (optional): Filter by specific subject
  - Valid values: `toan`, `ngu_van`, `ngoai_ngu`, `vat_li`, `hoa_hoc`, `sinh_hoc`, `lich_su`, `dia_li`, `gdcd`

**Examples:**
```bash
# All subjects
curl http://localhost:3000/report/score-levels

# Specific subject
curl http://localhost:3000/report/score-levels?subject=toan
```

**Response:**
```json
{
  "toan": {
    ">=8": 125430,
    "6-8": 342156,
    "4-6": 398765,
    "<4": 133254
  },
  "ngu_van": {
    ">=8": 98234,
    "6-8": 289765,
    "4-6": 412345,
    "<4": 161261
  }
}
```

---

### 3. Top Students by Subject Group

**Endpoint:** `GET /report/top-students`

**Description:** Get top-performing students for subject groups (A, B, C, D).

**Subject Groups:**
- **A (Khối A)**: Toán, Vật lý, Hóa học
- **B (Khối B)**: Toán, Hóa học, Sinh học
- **C (Khối C)**: Ngữ văn, Lịch sử, Địa lý
- **D (Khối D)**: Toán, Ngữ văn, Ngoại ngữ

**Query Parameters:**
- `group` (required): Subject group code (`A`, `B`, `C`, or `D`)
- `limit` (optional): Number of students to return (default: 10)

**Examples:**
```bash
# Top 10 students in group A
curl http://localhost:3000/report/top-students?group=A

# Top 20 students in group D
curl http://localhost:3000/report/top-students?group=D&limit=20
```

**Response:**
```json
[
  {
    "sbd": "01234567",
    "scores": {
      "toan": 9.5,
      "vat_li": 9.0,
      "hoa_hoc": 9.25
    },
    "total": 27.75
  },
  {
    "sbd": "01234568",
    "scores": {
      "toan": 9.0,
      "vat_li": 9.5,
      "hoa_hoc": 9.0
    },
    "total": 27.5
  }
]
```

## Available Scripts

```bash
# Development
npm run start:dev          # Run with hot reload

# Database
npm run migration:generate # Generate new migration
npm run migration:run      # Run pending migrations
npm run migration:revert   # Rollback last migration
npm run seed              # Import CSV data

# Testing
npm test                  # Run unit tests
npm run test:e2e          # Run e2e tests
```

## Tech Stack

- **Framework:** NestJS 11
- **Database:** PostgreSQL 15
- **ORM:** TypeORM 0.3
- **Validation:** class-validator, class-transformer
- **Language:** TypeScript 5

## Database Schema

### Table: `students`

| Column       | Type          | Description              |
|--------------|---------------|--------------------------|
| sbd          | VARCHAR (PK)  | Student exam ID          |
| toan         | DECIMAL(4,2)  | Math score               |
| ngu_van      | DECIMAL(4,2)  | Literature score         |
| ngoai_ngu    | DECIMAL(4,2)  | Foreign language score   |
| vat_li       | DECIMAL(4,2)  | Physics score            |
| hoa_hoc      | DECIMAL(4,2)  | Chemistry score          |
| sinh_hoc     | DECIMAL(4,2)  | Biology score            |
| lich_su      | DECIMAL(4,2)  | History score            |
| dia_li       | DECIMAL(4,2)  | Geography score          |
| gdcd         | DECIMAL(4,2)  | Civic education score    |
| ma_ngoai_ngu | VARCHAR(2)    | Foreign language code    |

## Troubleshooting

### Port 5433 already in use
Change the port in `docker-compose.yml` and `.env`:
```yaml
# docker-compose.yml
ports:
  - "5434:5432"
```

### Database connection failed
Ensure Docker is running:
```bash
docker ps
docker-compose restart
```

### Migration errors
Reset database:
```bash
docker-compose down -v
docker-compose up -d
npm run migration:run
npm run seed
```

## License

MIT
