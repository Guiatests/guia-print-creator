import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { RotateCw, ZoomIn, ZoomOut, Move } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DesignEditorProps {
  productImage: string;
}

const ProductDesignEditor = ({ productImage }: DesignEditorProps) => {
  const { toast } = useToast();
  const [design, setDesign] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setDesign(e.target?.result as string);
          toast({
            title: "Design uploaded",
            description: "Your design has been uploaded successfully.",
          });
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleRotationChange = (value: number[]) => {
    setRotation(value[0]);
  };

  const handleScaleChange = (value: number[]) => {
    setScale(value[0]);
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg bg-background">
      <div className="relative w-full h-[400px] border rounded-lg overflow-hidden bg-white">
        <img
          src={productImage}
          alt="Product"
          className="absolute inset-0 w-full h-full object-contain"
        />
        {design && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
              cursor: 'move',
            }}
          >
            <img
              src={design}
              alt="User design"
              className="max-w-[200px] max-h-[200px] object-contain"
              draggable={false}
            />
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
          >
            Upload Design
          </Button>
        </div>

        {design && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <RotateCw className="h-4 w-4" />
                Rotation
              </label>
              <Slider
                value={[rotation]}
                onValueChange={handleRotationChange}
                max={360}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <ZoomIn className="h-4 w-4" />
                Scale
              </label>
              <Slider
                value={[scale]}
                onValueChange={handleScaleChange}
                min={0.1}
                max={2}
                step={0.1}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDesignEditor;