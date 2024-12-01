import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  {
    id: 1,
    name: "Custom T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Apparel",
  },
  {
    id: 2,
    name: "Business Cards",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1589041127168-bf8039d9d9cc?w=500",
    category: "Stationery",
  },
  {
    id: 3,
    name: "Custom Mug",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
    category: "Accessories",
  },
];

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Our Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-primary font-bold mb-4">${product.price}</p>
                <Button
                  className="w-full bg-primary hover:bg-primary-600"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  Customize Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;