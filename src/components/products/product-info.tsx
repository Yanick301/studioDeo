'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Star, Languages } from 'lucide-react';
import LanguageSelector from './language-selector';
import { useDictionary } from '@/hooks/use-dictionary';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes.length > 0 ? product.sizes[0] : null);
  const [showTranslator, setShowTranslator] = useState(false);
  const dictionary = useDictionary();

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size.');
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageId: product.imageId,
      size: selectedSize || 'One Size',
      slug: product.slug,
    }, 1);
  };
  
  if (!dictionary) return null;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl lg:text-4xl font-headline font-bold">{product.name}</h1>
      
      <div className="flex items-center gap-4">
        <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{product.rating} ({product.reviewCount} reviews)</span>
        </div>
      </div>
      
      <Separator />

      <div>
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{dictionary.product.description}</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowTranslator(!showTranslator)}>
                <Languages className="mr-2 h-4 w-4" />
                {dictionary.product.translate}
            </Button>
        </div>
        <LanguageSelector originalText={product.description} isVisible={showTranslator} />
      </div>

      {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
        <div>
          <h3 className="text-sm font-medium mb-2">{dictionary.product.size}</h3>
          <RadioGroup
            value={selectedSize || ''}
            onValueChange={setSelectedSize}
            className="flex flex-wrap gap-2"
          >
            {product.sizes.map((size) => (
              <div key={size}>
                <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                <Label
                  htmlFor={`size-${size}`}
                  className="cursor-pointer flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary h-12 w-12"
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <Button onClick={handleAddToCart} size="lg" className="mt-4">
        {dictionary.product.addToCart}
      </Button>
    </div>
  );
}
