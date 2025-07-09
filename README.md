# - Modern Book Library 
BookLibrary is a full-stack web application for managing book collections, borrowing books, and tracking inventory. It features an admin dashboard, user authentication, and responsive design.
### 🌐 Live url
[LiveLink](https://booklibrary-4bb29.web.app/)


# Frontend 
### Book Management


- TypeScript
- Redux Toolkit
- Tailwind CSS
- Firebase
- Framer Motion (Animations)
- **Form Handling** : React Hook Form with Yup validation

# Backend
- Backend: Node.js, Express, TypeScript

- Database: MongoDB (Mongoose ODM)

- API Testing: Thunder Client / Postman

## Setup & Installation ⚙️
### Prerequisites
- Node.js (v18+)

- MongoDB (local or cloud URI)

- Yarn / npm

### API Endpoints 🌐

### user  :
| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| POST   | `/user/register`       | Create a new user                    |
| GET    | `/user`       | Get all user  |
| GET    | `/user/login`   | Get login user                    |
                     

### Book :

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|                      
| GET    | `/books`      | Get all books          |
| POST | `/books/`   | Create book                    |
| GET | `/books/:id`   | Get Single Book by ID                    |
| PUT | `/books/:id`   | Update  book                    |
| DELETE | `/books/:id`   | Delete  book                    |

### Borrow Book :

| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|                      
| GET    | `/borrow/summary`      | Get summary           |
| POST | `/borrow/`   | Create Borrow                    |


### 📖 Book Management
| Feature | Description |
|---------|-------------|
| **CRUD Operations** | Full Create, Read, Update, Delete functionality |
| **Advanced Filtering** | Filter by genre, availability, and more |
| **Sorting** | Sort by title, author, creation date |
