# Book-to-Read 📚

A simple reading list app built with Vue.js and Ruby on Rails. Add books, mark them as finished, undo status, and delete them easily.

## Features ✨
- ➕ Add books to your reading list  
- ✅ Mark books as finished  
- ↩️ Undo finished status  
- 🗑 Delete books from the list  
- 📱 Responsive design for all devices  

## Tech Stack 🛠️
- **Frontend**: Vue.js + Vite
- **Backend**: Ruby on Rails  
- **Database**: PostgreSQL  

## Getting Started 🚀
### Prerequisites  
- Ruby 3.0+ & Rails 6.1+  
- Node.js 14+ & Yarn  
- PostgreSQL  

### Installation  
1️⃣ Clone the repo  
   ```bash
   git clone https://github.com/lilytulips/book-to-read.git && cd book-to-read
```

2️⃣ Install backend dependencies 
   ```bash
  bundle install  
rails db:create db:migrate db:seed
```

3️⃣ Install frontend dependencies 
   ```bash
  cd book-to-read-frontend && npm install 
```

refer here: https://www.louisramos.dev/blogs/rails-api-authentication-with-devise-and-json-web-tokens to set up your JWT Secret Token

## Run the App 🚀  

### Backend  
```bash
rails server
```
Runs on: http://localhost:3000

### Frontend  
```bash
npm run dev
```
Runs on: http://localhost:5173 (default Vite port)

## Running Tests 🧪
### Install Cypress

If you haven't installed Cypress yet, run:
```bash
npm install cypress --save-dev
```
### Open Cypress UI

To run Cypress in interactive mode:
```bash
npx cypress open
```
This opens the Cypress Test Runner, where you can run tests manually.

### Run Cypress in Headless Mode

To execute all tests in headless mode (without opening the UI):
```bash
npx cypress run
```
Run Specific Test File
```bash
npx cypress run --spec cypress/e2e/my-test.cy.js
```
 

