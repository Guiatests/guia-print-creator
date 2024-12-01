import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">GuiaPrint</h3>
            <p className="text-primary-200">
              Custom print-on-demand solutions for your business and personal needs.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-primary-200 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-primary-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-primary-200 hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-primary-200 hover:text-white transition-colors">
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <p className="text-primary-200">
              Email: info@guiaprint.com<br />
              Phone: (555) 123-4567<br />
              Address: 123 Print Street<br />
              Design City, DC 12345
            </p>
          </div>
        </div>
        
        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-200">
          <p>&copy; {new Date().getFullYear()} GuiaPrint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;