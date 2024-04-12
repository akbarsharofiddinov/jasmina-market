import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { EdisonContextProvider } from "./context/EdisonContext";
import ErrorComponent from "./components/ErrorComponent";
import { Header } from "./components";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/error",
      element: <ErrorComponent />,
    },
  ]);

  return (
    <EdisonContextProvider>
      <Header />
      <RouterProvider router={router} />
    </EdisonContextProvider>
  );
}

export default App;
