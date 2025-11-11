# Flex Living Reviews Dashboard (Frontend)

## Overview

This is the frontend interface for the Flex Living Reviews Dashboard project.

It provides an admin dashboard for managing guest reviews across different booking platforms and a public display page for approved reviews.  
Built with **React**, **TypeScript**, and **TailwindCSS**, it integrates seamlessly with the backend API to display, filter, and approve reviews.

---

## Tech Stack

- React (Create React App with TypeScript)
- TailwindCSS
- Axios
- React Router DOM
- LocalStorage (for approval persistence)

---

## Folder Structure

````md
client/
├── src/
│ ├── components/
│ │ └── ReviewCard.tsx
│ ├── hooks/
│ │ └── useApprovals.ts
│ ├── pages/
│ │ ├── Dashboard.tsx
│ │ └── ListingDisplay.tsx
│ ├── services/
│ │ └── api.ts
│ ├── types/
│ │ └── index.ts
│ ├── App.tsx
│ ├── index.css
│ └── main.tsx or index.tsx
├── tailwind.config.cjs
├── package.json
└── tsconfig.json

---

## Getting Started

1. Clone the frontend project:

```bash
git clone https://github.com/Tgodmuna/flex-living-reviews-client.git
cd client
```
````

2.Install dependencies:

```bash
npm install
```

3.Create a `.env` file:

```markdown

REACT_APP_API_BASE=http://localhost:5000
REACT_APP_ENVIRONMENT=development

```

4. Run the app:

```bash
npm start
```

- Frontend runs at: <http://localhost:3000>
- Deployed at: <https://glittering-figolla-746f7e.netlify.app/>

---

## Environment Variables

| Variable           | Description          | Example               |
| ------------------ | -------------------- | --------------------- |
| REACT_APP_API_BASE | Backend API base URL | <http://localhost:5000> |
| REACT_APP_ENVIRONMENT| node_env config| production |


---

## Core Features

### 1. Dashboard

- Displays all reviews from the backend API.
- Filters reviews by:
  - Minimum rating
  - Review category (e.g., cleanliness, communication)
  - Channel (Hostaway, Airbnb, etc.)
- Allows sorting by:
  - Newest
  - Oldest
  - Highest rating
- Search by guest name, listing name, or review text.
- Toggle **approve/unapprove** for each review.
- Approved reviews are stored locally using LocalStorage for persistence.

### 2. Listing Display (Public Page)

- Displays only approved reviews.
- Groups reviews by listing name.
- Used to simulate the public display of verified, admin-approved guest reviews.

---

## API Integration

The frontend consumes this backend endpoint:

```
GET /api/v1/reviews/hostaway
```

Example response:

```json
{
  "status": "success",
  "reviews": [
    {
      "listing": "2B N1 A - 29 Shoreditch Heights",
      "guestName": "Shane Finkelstein",
      "averageRating": 9.67,
      "categories": {
        "cleanliness": 10,
        "communication": 9,
        "respect_house_rules": 10
      },
      "review": "Shane and family are wonderful guests...",
      "date": "2020-08-21",
      "channel": "Hostaway"
    }
  ]
}
```

---

## Key Components

### `ReviewCard.tsx`

- Displays a single review with guest name, rating, and categories.
- Includes an approval toggle button.
- Accepts props: `r` (review), `approved` (boolean), and `onToggle` (function).

### `Dashboard.tsx`

- Main admin view.
- Handles filtering, sorting, searching, and rendering all reviews.

### `ListingDisplay.tsx`

- Public-facing view showing only approved reviews grouped by listing.

### `useApprovals.ts`

- Custom hook that stores and retrieves approval states using LocalStorage.

### `api.ts`

- Axios-based API service for fetching data from the backend.
- Provides helper to generate unique IDs for local approval tracking.

---

## Scripts

| Command       | Description                  |
| ------------- | ---------------------------- |
| npm start     | Runs the development server  |
| npm run build | Builds the production bundle |
| npm test      | Runs tests (if any)          |
| npm run eject | CRA eject command (optional) |

---

## Example UI Flow

1. Open Dashboard (<http://localhost:3000>)
2. Reviews are fetched from backend.
3. Admin filters or approves reviews.
4. Approved reviews are saved locally.
5. Public listing page (`/listing`) shows only approved reviews.

---

## Design Decisions

- **State persistence:** Used LocalStorage to keep approved states after refresh.
- **Scalability:** Components structured to easily integrate Redux or context API later.
- **Environment-driven configuration:** Base API URL stored in `.env`.
- **Responsive UI:** Built entirely with TailwindCSS utility classes.
- **Separation of concerns:** Service (API), hooks (logic), components (UI), pages (views).

---

## Future Improvements

- Integrate backend approval persistence (via API POST/PUT)
- Add admin authentication and roles
- Include pagination for large review sets
- Implement unit tests using Jest and React Testing Library
- Deploy to Vercel or Netlify for demo

---

## Developer

**ThankGod Munachimso Agu**  
Full Stack Developer (React, Node.js, TypeScript)  
Email: <aguthankgod@gmail.com>  
GitHub: <https://github.com/Tgodmuna>  
LinkedIn: <https://linkedin.com/in/tg-agu>
