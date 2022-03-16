import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import ImageCarousel from "./screens/ImageCarousel";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ImageCarousel />
    </QueryClientProvider>
  );
}

export default App;
