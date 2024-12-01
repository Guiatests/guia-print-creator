import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white text-2xl font-bold">
            GuiaPrint
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-primary-200 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-primary-200 transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-white hover:text-primary-200 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-primary-200 transition-colors">
              Contact
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-white hover:text-primary-200 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;