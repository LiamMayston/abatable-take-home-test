# Carbon Portfolio Summary - Technical Test

Welcome! This is a ~60 minute take-home exercise to assess your ability to understand existing code, fix bugs, extend functionality, and make frontend changes.

## Overview

You're working with a simplified **Carbon Portfolio** system that tracks carbon credit positions and computes portfolio summaries.

### Business domain

A carbon portfolio is a collection of carbon credit holdings across multiple projects, vintages, and statuses, viewed as a single investment or risk exposure. The goal is to understand the aggregate tonnes, value, and pricing of these holdings at a portfolio level.

- **Position**: A carbon credit holding with properties like project name, tonnes, price per tonne, status (available/retired), and vintage year
- **Portfolio Summary**: Aggregated statistics including total tonnes, total value, and weighted average price per tonne

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone --bare <REPO_URL>
cd take-home-tech-test

# Install all dependencies
npm install
cd backend && npm install && cd ..
```

### Running the application

**Option 1: Single command (recommended)**

```bash
npm run dev
```

This will start both:

- Backend on http://localhost:4000 (with auto-reload via nodemon)
- Frontend on http://localhost:8080 (with hot module reload)

**Option 2: Using shell scripts**

**For Mac/Linux:**

```bash
chmod +x start-dev.sh
./start-dev.sh
```

**For Windows:**

```bash
start-dev.bat
```

**Option 3: Separate terminals**

Terminal 1 - Backend:

```bash
npm run dev:backend
```

Terminal 2 - Frontend:

```bash
npm run dev:frontend
```

**Run tests:**

```bash
npm test           # Run tests once
npm run test:watch # Run tests in watch mode
```

Or from the backend directory:

```bash
cd backend
npm test           # Run tests once
npm run test:watch # Run tests in watch mode
```

## Your tasks

You have **~60 minutes** to complete the following tasks. Focus on working code over perfection, but be prepared to explain and justify your key design decisions.

### Task 1: Implement portfolio summary feature 📊

Build the frontend for the portfolio summary feature. The backend endpoint `/api/portfolio/summary` already exists, but there's a bug in the `computeSummary` function that needs fixing, and the frontend needs to be built.

**Requirements:**

- Fix the bug in `computeSummary` function in `backend/src/services/portfolioSummary.ts` (some tests are currently failing)
- Build a frontend component to display the summary
- Call the `/api/portfolio/summary` API from the frontend and display the results
- Handle the slow API response gracefully (the endpoint has a 2-second delay - see Task 3)

**What to display:**

- Total Tonnes: sum of all tonnes across positions
- Total Value: sum of (tonnes × pricePerTonne) for all positions
- Average Price/Tonne: weighted average price per tonne

**Important:** The `/api/portfolio/summary` endpoint has an intentional 2-second delay that MUST NOT be removed. This simulates a slow API response - you'll need to handle this gracefully in the frontend (see Task 3).

---

### Task 2: Add filtering by status 🔧

Extend the portfolio summary to support filtering by status.

**Requirements:**

- Extend the backend so consumers can request a summary filtered by status
- Update the summary computation logic appropriately
- Add or update tests to cover the filtering functionality
- Update the frontend to allow users to filter by status

**Design decisions you'll need to make:**

- Should filtering happen in the service layer or in the handler?
- Should the summary endpoint accept query params or have a new endpoint?
- How do you type the filter parameter?
- How you expose this in the API and backend structure is up to you.

---

### Task 3: Handle slow API performance 🐌

The `/api/portfolio/summary` endpoint has an intentional 2-second delay that simulates a slow API response. **You must not remove or modify this delay.**

**Requirements:**

- Handle the slow API response gracefully without removing the timeout
- The delay will block page load if not handled properly
- Improve the user experience despite the slow backend

**Note:** The 2-second delay is in `backend/src/server.ts` and must remain unchanged.

---

### Task 4: Update the frontend 💻

Add UI elements to support the new features.

**Requirements:**

- Add a simple way for the user to choose which status to view (for filtering)

---

### Task 5: Design commentary 📝

Update the file called `NOTES.md` in the root directory documenting your design decisions, trade-offs, and reasoning.

---

## Project structure

```
/backend
  /src
    /data
      portfolio.ts          # Sample position data
    /services
      portfolioSummary.ts   # Business logic
    types.ts               # TypeScript definitions
    server.ts              # Express API
  /tests
    portfolioSummary.test.ts  # Unit tests

/frontend
  /src
    /pages
      Index.tsx            # Main portfolio page
    /components
      ...                  # UI components
    /types
      portfolio.ts        # TypeScript definitions
```

## API endpoints

**Current implementation:**

- `GET /api/portfolio` - Returns all positions
- `GET /api/portfolio/summary` - Returns portfolio summary

## What we're looking for

- You have ~60 minutes. Document what you intentionally didn't do and why.
- We want to gauge how you break down the problem and organize your solution. We want to see you write code that is well structured and easy to maintain.
- Working code that demonstrates good judgment is better than perfect code
- Focus on explaining your design decisions - this is as important as the implementation
- You are welcome to use any tools you'd use in real life, including AI coding assistants.

## Questions?

In a real scenario, you'd be able to ask clarifying questions. For this exercise, make reasonable assumptions and document them.

---

Good luck! 🚀
