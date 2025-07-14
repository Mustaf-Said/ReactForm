// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";
import Layout from "./layout/Layout";
import UserInfo from "./nav/UserInfo";
import { UserProvider } from "./context/UserProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/RegisterForm", element: <RegisterForm /> },
      { path: "/UserInfo", element: <UserInfo /> },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
