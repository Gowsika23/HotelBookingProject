# Luxury Hotel Booking System

A full-stack **Hotel Booking Application** built using **Angular** (Frontend) and **ASP.NET Core Web API** (Backend).

Users can browse hotels, manage rooms, book stays, and admins can manage hotels, rooms, customers, and bookings.

---

## Features

### Customer Features

* User Signup / Login
* Browse Hotels
* Search Hotels by Location
* View Room Details
* Book Rooms
* My Bookings History
* Cancel Bookings
* Validation & Error Handling

### Admin Features

* Add Hotels
* Update Hotels
* Delete Hotels
* Manage Rooms
* Room Availability Management
* View Customers
* View Booking Details
* Dashboard Navigation

---

## Tech Stack

### Frontend

* Angular
* TypeScript
* HTML
* CSS

### Backend

* ASP.NET Core Web API
* C#
* Entity Framework Core

### Database

* SQL Server (SSMS)

---

## Project Structure

```plaintext
HotelBookingProject
│
├── frontend
│    ├── src
│    ├── angular.json
│    ├── package.json
│    └── ...
│
└── backend
     ├── Controllers
     ├── Models
     ├── DTOs
     ├── Data
     ├── Migrations
     ├── Program.cs
     └── ...
```

---

## Database Setup (SSMS)

Open **SQL Server Management Studio (SSMS)**.

Create a database.

Example:

```sql
CREATE DATABASE HotelBookingDb;
```

---

Open:

```plaintext
backend/appsettings.json
```

Update connection string.

Example:

```json
"ConnectionStrings": {
"DefaultConnection":
"Server=YOUR_SERVER_NAME;Database=HotelBookingDb;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

Replace:

```plaintext
YOUR_SERVER_NAME
```

with your SQL Server instance name.

Example:

```plaintext
DESKTOP-XXXXXX\SQLEXPRESS
```

---

## Backend Setup

Open terminal inside:

```plaintext
backend
```

Run:

```bash
dotnet restore
```

Apply migrations:

```bash
dotnet ef database update
```

Run backend:

```bash
dotnet run
```

Backend runs on:

```plaintext
https://localhost:7177
```

Swagger:

```plaintext
https://localhost:7177/swagger
```

---

## Frontend Setup

Open terminal inside:

```plaintext
frontend
```

Install packages:

```bash
npm install
```

Run Angular app:

```bash
ng serve
```

Frontend runs on:

```plaintext
http://localhost:4200
```

---

## Important Notes

Do NOT upload:

```plaintext
node_modules
bin
obj
.vs
.angular
dist
```

These folders are generated automatically.

---

## How To Clone And Run

Clone repository:

```bash
git clone YOUR_GITHUB_REPO_URL
```

Open project.

### Backend

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

Open new terminal.

```bash
cd frontend
npm install
ng serve
```

---

## Future Improvements

* JWT Authentication
* Payment Integration
* Email Notifications
* Image Uploads
* Revenue Analytics
* Responsive Mobile UI

---

## Author

Developed by **Gowsika**
