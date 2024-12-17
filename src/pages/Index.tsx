import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Printer, Palette, Package } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary-100 to-primary-200">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 animate-fadeIn">
            Your Designs, Perfectly Printed
          </h1>
          <p className="text-xl text-gray-700 mb-8 animate-fadeIn">
            Custom printing solutions for your business and personal needs
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-600 text-white"
            onClick={() => navigate("/products")}
          >
            Start Creating <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose GuiaPrint?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4">
                <Printer className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Printing</h3>
              <p className="text-gray-600">
                State-of-the-art printing technology for vibrant, long-lasting results
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4">
                <Palette className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Design</h3>
              <p className="text-gray-600">
                Easy-to-use design tools to bring your ideas to life
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4">
                <Package className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick turnaround times and reliable shipping worldwide
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;