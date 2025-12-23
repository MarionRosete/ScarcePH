import { ComponentExample } from "@/components/component-example";
import { ThemeProvider } from "./components/theme-provide";

export function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ComponentExample />
        </ThemeProvider>
    );
}
export default App