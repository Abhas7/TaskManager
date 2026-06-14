# TaskFlow — ASP.NET Core & React Task Manager MVP

TaskFlow is a modern, high-performance, responsive single-page task manager application built with an ASP.NET Core 8 Web API backend and a Vite + React frontend styled using Tailwind CSS v4.

---

## Folder Structure

```text
task-manager/
├── backend/            # ASP.NET Core 8 Web API
│   ├── Controllers/    # Auth and Tasks endpoints
│   ├── Data/           # EF DbContext configuration
│   ├── DTOs/           # Request/Response data contracts
│   ├── Models/         # Entity models (User, TaskItem)
│   ├── Services/       # Core business logic layer
│   ├── appsettings.json
│   └── Program.cs
│
└── frontend/           # React + Vite Client
    ├── src/
    │   ├── api/        # Axios API client setup
    │   ├── context/    # Global Authentication context
    │   ├── pages/      # Login, Register, Dashboard views
    │   └── components/ # Navbar, TaskCard, TaskList, TaskForm
    ├── index.html
    └── package.json
```

---

## Prerequisites

Before running this project, ensure you have:
1. **.NET 8 SDK** (LTS) installed.
2. **Node.js** (v18+) and npm installed.
3. **PostgreSQL** instance running locally.

---

## 1. Backend Setup & Run

### Database Configuration
1. Open the PostgreSQL configuration file: [appsettings.json](file:///c:/Users/abhas/Desktop/New%20folder%20(8)/task-manager/backend/appsettings.json)
2. Update the password in the connection string under `ConnectionStrings.DefaultConnection` to match your local PostgreSQL configuration:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=taskmanagerdb;Username=postgres;Password=YOUR_POSTGRES_PASSWORD"
   }
   ```

### Database Migrations
Database tables are configured to build and migrate **automatically on application startup**. You do not need to run manual migration commands.

### Start the API Server
Launch the Web API application from your backend folder:

```bash
cd task-manager/backend
# Use absolute path if 'dotnet' is not in your system environment PATH:
& "C:\Program Files\dotnet\dotnet.exe" run
# OR if 'dotnet' command is recognized:
dotnet run
```
The API server will listen on `http://localhost:5005`. You can access the Swagger documentation page at:
[http://localhost:5005/swagger](http://localhost:5005/swagger)

---

## 2. Frontend Setup & Run

The client uses Vite + React with Tailwind CSS v4.

### Install Dependencies
Run the package installation inside the `task-manager/frontend/` directory:

```bash
cd task-manager/frontend
npm install
```

### Start the Client Server
Launch the development server:

```bash
npm run dev
```
The application will open at:
[http://localhost:5173](http://localhost:5173)

---

## Architecture Features

- **JWT Authentication**: Secure user login/registration issuing signed tokens containing identity claims.
- **Data Isolation**: All CRUD operations in the service layer validate ownership (users can only access, modify, or delete their own items).
- **Cascade Delete**: Deleting a user account automatically wipes all associated tasks at the database level.
- **Glassmorphism Design**: Tailwind CSS v4 custom color palettes,Outfit/Plus Jakarta Sans Google fonts, and sleek ambient shadows.
- **Axios Route Guards**: Automated request interceptors mapping authorization headers and handling `401 Unauthorized` responses by auto-logging out.
