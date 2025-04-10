import { RouterProvider } from "react-router-dom";
import router from "@routes/router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./styles/map.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
