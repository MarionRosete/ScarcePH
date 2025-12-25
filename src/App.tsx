import { ThemeProvider } from "./components/theme-provide";
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter} from "react-router";
import LazyRoutes from "./routes";

export function App() {
    return (
       
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <BrowserRouter>
                    <LazyRoutes/>
                </BrowserRouter>
            </AuthProvider>
            <Toaster position="top-right" richColors />
        </ThemeProvider>
       
       
    );
}
export default App