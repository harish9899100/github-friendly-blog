
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Search, User, Edit } from "lucide-react";

export const BlogHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">DevBlog</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Home size={18} />
              <span>Home</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Search size={18} />
              <span>Browse</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Edit size={18} />
              <span>Write</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
              <User size={18} />
              <span>Profile</span>
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Sign In</Button>
            <Button>Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Home size={18} />
                <span>Home</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Search size={18} />
                <span>Browse</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <Edit size={18} />
                <span>Write</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors">
                <User size={18} />
                <span>Profile</span>
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button variant="outline" className="w-full">Sign In</Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
