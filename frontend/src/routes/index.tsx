import { createBrowserRouter } from "react-router-dom";
import App from "../Root";
import CheckOut from "../layout/CheckOut/CheckOut";
import Home from "./Home/Home";
import Wishlist from "../layout/WishList/WishList";
import Cart from "../layout/Cart/Cart";
import Shop from "../layout/Shop/Shop";
import Dashboard from "../component/Dashboard/Dashboard";
import AddBook from "../component/Dashboard/AddBook/AddBook";
import { Register } from "../component/User/Regester/Regester";
import { Login } from "../component/User/Login/Login";
import EditBook from "../component/Dashboard/AddBook/EditBook";
import BookDetails from "../component/Books/BookDetails/BookDetails";
import BorrowSummaryPage from "../component/Model/borrow/BorrowSummaryPage";
import ProtectedRoute from "./ProtectedRoute";
import BookList from "../component/Dashboard/AddBook/BookList";
import BorrowBook from "../component/Dashboard/BorrowBook/BorrowBook";
import AdminRoute from "./AdminRoute";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/checkOut",
        Component: CheckOut,
      },
      {
        path: "/wishlist",
        Component: Wishlist,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/shop",
        Component: Shop,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      { path: "/books/edit/:id", Component: EditBook },
      {
        path: "/details/:id",
        Component: BookDetails,
      },
      {
        element: <ProtectedRoute />, // Protected routes wrapper
        children: [
          {
            path: "/borrow-summary",
            Component: BorrowSummaryPage,
          },
          // Add other protected routes here
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      { path: "", element: <AddBook /> }, // Default dashboard child
      { path: "editBook", element: <BookList /> },
      { path: "borrowBook", element: <BorrowBook /> },
    ],
  },
]);
