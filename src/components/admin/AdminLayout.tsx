
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Users, 
  Image,
  LogOut 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { logout, currentUser } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Publications", href: "/admin/publications", icon: FileText },
    { name: "News & Events", href: "/admin/news", icon: Calendar },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Media Library", href: "/admin/media", icon: Image },
  ];
  
  const NavLink = ({ item }: { item: typeof navigation[0] }) => (
    <Link
      to={item.href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        isActive(item.href)
          ? "bg-law-light/10 text-gray-500"
          : "text-gray-500 hover:bg-law-light/10 hover:text-law-DEFAULT"
      )}
      onClick={() => setOpen(false)}
    >
      <item.icon className="h-4 w-4" />
      {item.name}
    </Link>
  );
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile navigation */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed left-4 top-4 z-40 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="border-b p-4">
              <h2 className="text-lg font-semibold text-law-DEFAULT">
                LSPS Admin
              </h2>
              {currentUser && (
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              )}
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </nav>
            <div className="border-t p-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="fixed hidden h-full w-64 border-r bg-white md:block">
        <div className="flex h-full flex-col">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold text-law-DEFAULT">
              LSPS Admin
            </h2>
            {currentUser && (
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            )}
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>
          <div className="border-t p-4">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="md:pl-64">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
