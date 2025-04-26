
import Admin from "@/pages/Admin";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Home";

const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: "/admin",
        element: <Admin />
    },
    {
        path: "/admin/dashboard",
        element: <Dashboard />
    }
];

export default routes;
