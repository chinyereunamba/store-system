# Store Management System

This is a **Store Management System** designed to help store owners and managers efficiently track inventory, manage sales and purchases, and analyze their store’s performance. Built with a **Django** backend and a **Next.js** frontend, it offers a seamless, user-friendly experience for managing all aspects of a store's operations.

---

## Features

### Core Features
- **Product Management**: Add, update, and delete products with categories and brands.
- **Sales Tracking**: Record sales transactions and automatically update stock levels.
- **Purchase Management**: Log purchases from suppliers and update inventory.
- **Dashboard**: A high-level overview of store performance, including profits, losses, and inventory status.
- **Authentication & Authorization**: Secure login system for store staff, with role-based permissions.

### Planned Features
- **Reports**: Generate sales and inventory reports.
- **Email Notifications**: Send automated updates for stock levels or reports.
- **User-Friendly Interface**: Responsive design for easy use on various devices.

---

## Directory Structure

### Backend (Django)
- **base**: Core settings and configurations for the Django project.
- **store**: Business logic for products, purchases, sales, and other store operations.
- **users**: Handles user authentication and management.
  - **templates**: Custom templates for user registration and authentication.

### Frontend (Next.js)
- **app**: 
  - **api**: API integration logic (e.g., NextAuth for authentication).
  - **layout1 & layout2**: Page layouts for different sections, like login, register, products, purchase, sales, etc.
- **components**: Reusable React components for UI, forms, layouts, and data handling.
  - **dashboard**: Dashboard components for summarizing store performance.
  - **ui**: Shared user interface components.
- **hooks**: Custom React hooks for state and data management.
- **lib**: Utility libraries for shared logic.
- **queries**: GraphQL or REST queries for data fetching.
- **store**: Zustand-based state management.
- **types**: TypeScript type definitions.

---

## Tech Stack

### Backend
- **Django**: Python web framework for the backend.
- **Django REST Framework (DRF)**: For creating RESTful APIs.
- **SQLite/PostgreSQL**: Database options for storing data.

### Frontend
- **Next.js**: React framework for server-side rendering and client-side interactions.
- **Tailwind CSS**: For styling components.
- **Zustand**: State management for frontend data handling.
- **Shadcn UI**: UI Library.

---

## Installation

### Backend
1. Clone the repository:  
   ```bash
   git clone "https://github.com/chinyereunamba/store-system"
   cd backend
   ```
2. Create a virtual environment:  
   
   - Linux and macOS
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   - Windows (Command Prompt)
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

   - Windows (PowerShell)
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```
3. Install dependencies:  
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:  
   ```bash
   python manage.py migrate
   ```
5. Start the server:  
   ```bash
   python manage.py runserver
   ```

### Frontend
1. Navigate to the frontend directory:  
   ```bash
   cd frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the development server:  
   ```bash
   npm run dev
   ```

---

## Usage
1. Log in using the provided credentials.
2. Navigate to the **Dashboard** to view the store's performance summary.
3. Use the **Products**, **Sales**, or **Purchases** sections to manage store operations.
4. Check reports and stock levels from the dashboard.

---

## Contributing
If you'd like to contribute:
1. Fork the repository.
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:  
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:  
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Author
**Chinyere Unamba**  
Contact: [Website](chinyereunamba.vercel.app)
