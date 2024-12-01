import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ProductDesignEditor from "@/components/ProductDesignEditor";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const product = {
    id: parseInt(id || "1"),
    name: "Custom T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "High-quality custom t-shirt made from 100% cotton. Perfect for any occasion.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy", "Gray"],
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <ProductDesignEditor productImage={product.image} />
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-bold text-primary">
                    ${product.price}
                  </p>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Size</h3>
                    <div className="flex gap-3">
                      {product.sizes.map((size) => (
                        <motion.div
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            className="w-14 h-14 text-lg hover:bg-primary hover:text-white transition-colors"
                          >
                            {size}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Color</h3>
                    <div className="flex gap-3">
                      {product.colors.map((color) => (
                        <motion.div
                          key={color}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            className="min-w-[100px] h-12 text-base hover:bg-primary hover:text-white transition-colors"
                          >
                            {color}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary-600 text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-3 h-6 w-6" />
                    Add to Cart
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;