import { ComponentExample } from "@/components/component-example";
import { ThemeProvider } from "./components/theme-provide";
import LoginPage from "./pages/login";
import { Toaster } from "@/components/ui/sonner"

export function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            
            <LoginPage />
            <Toaster/>
        </ThemeProvider>
    );
}
export default App