import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/homeLayout/Home";
import Index from "./pages/homeLayout/Index";
import { Provider } from "react-redux";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/Todo_toolKit_Tailwind",
    element: <Home />,
    children: [{ index: true, element: <Index /> }],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
