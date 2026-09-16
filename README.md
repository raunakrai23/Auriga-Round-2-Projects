# Ritual Habit Tracker

## Overview

Ritual is a full-stack habit tracker for creating daily rituals and marking progress over time. Accounts and habit data are private to each user.

## Features

- Email/password registration and sign-in with 7-day JWT sessions
- Create, edit, delete, and complete/uncomplete habits for a chosen day (today in the UI)
- Daily, weekday, and weekly frequency metadata
- Seven-day completion history, progress summary, and responsive dashboard
- Client- and server-side validation, loading states, empty states, and helpful API errors

## Tech stack

React 18, Vite, Tailwind CSS, Lucide icons, Node.js, Express, MongoDB/Mongoose, JWT, bcrypt.

## Prerequisites

Node.js 20+ and a MongoDB database (local MongoDB Community Server or MongoDB Atlas).

## Installation

1. Copy `.env.example` to `.env` in the project root and set a strong `JWT_SECRET`.
2. Install dependencies with `npm run install:all`.
3. Start MongoDB if using the local connection string.
4. Run `npm run dev`.
5. Open `http://localhost:5173`.

For production frontend output, run `npm run build`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORT` | API port, default `5000` |
| `MONGODB_URI` | MongoDB connection URI |
| `JWT_SECRET` | Long random secret used to sign sessions |
| `CLIENT_URL` | Browser origin allowed by CORS |
| `VITE_API_URL` | API URL exposed to Vite (defaults to localhost API) |

## MongoDB setup

For local MongoDB, use the example URI and start the MongoDB service. For Atlas, create a database user, allow your IP address, and replace `MONGODB_URI` with the Atlas connection string. The app creates collections automatically after the first registration.

## Usage

Register an account, create a ritual, and tap its outlined check to mark it complete today. The small weekday circles show completions for the current trailing seven days. Use pencil and trash controls to edit or remove a ritual.

## API overview

All JSON endpoints begin with `/api`. Protected habit endpoints need `Authorization: Bearer <token>`.

- `POST /auth/register` — `{ name, email, password }`
- `POST /auth/login` — `{ email, password }`
- `GET /habits` — list current user's habits
- `POST /habits` — create habit
- `PUT /habits/:id` — update habit
- `PATCH /habits/:id/toggle` — `{ date: "YYYY-MM-DD" }`
- `DELETE /habits/:id` — delete habit
- `GET /health` — connection-independent service check

## Limitations

The dashboard intentionally focuses on today; it does not yet offer a historical calendar, password reset, email verification, or shared household habits. Browser sessions are stored in local storage; a production deployment should use secure, httpOnly refresh cookies and rate limiting.
