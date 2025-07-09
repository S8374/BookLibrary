import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index.tsx";

import { store } from "./Redux/store.ts";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./component/Provider/authProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Toaster position="top-center" />
        <RouterProvider router={router}>
          <Root />
        </RouterProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
