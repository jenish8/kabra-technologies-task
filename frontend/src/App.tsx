// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Toaster
import { Toaster } from "react-hot-toast";

//Pages

import HomePage from "./pages/Home";
import NewProductPage from "./pages/NewProduct";
import SingleProductPage from "./pages/Product";
import CartPage from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:id",
    element: <SingleProductPage />,
  },
  {
    path: "/new",
    element: <NewProductPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
