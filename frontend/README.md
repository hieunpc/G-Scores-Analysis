# G-Score Frontend

Web application for checking 2024 national high school exam scores.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 3
- React Router
- Recharts

## Pages

- **Dashboard** - Overview and statistics
- **CheckScore** - Check scores by student ID
- **TopStudents** - Top rankings by subject groups
- **Report** - Score distribution charts

## Components

**Layout:**

- `Layout` - Main wrapper with responsive sidebar
- `Sidebar` - Navigation menu

**UI:**

- `ScoreBadge` - Score badge with color-coded levels
- `RankBadge` - Ranking medal
- `FormInputs` - Select and Number input
- `UIStates` - Loading, Error, Empty states

## Custom Hooks

- `useStudentScore` - Fetch student scores
- `useTopStudents` - Fetch top students
- `useScoreLevels` - Fetch score distribution

## Design System

**Score Colors:**

- Excellent (≥8): Green
- Good (≥6.5): Blue
- Average (≥5): Yellow
- Poor (<5): Red

**Responsive:**

- Mobile: Hamburger menu sidebar
- Desktop: Fixed sidebar

## Development

```bash
npm install
npm run dev
```
