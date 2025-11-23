'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus } from 'lucide-react';
import type { CartItem as CartItemType } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Locale } from '@/i18n-config';
import { useDictionary } from '@/hooks/use-dictionary';

interface CartItemProps {
  item: CartItemType;
  lang: Locale;
}

export default function CartItem({ item, lang }: CartItemProps) {
  const { updateItemQuantity, removeItem } = useCart();
  const dictionary = useDictionary();
  const productImage = PlaceHolderImages.find(p => p.id === item.imageId);

  const handleQuantityChange = (newQuantity: number) => {
    updateItemQuantity(item.id, item.size, newQuantity);
  };

  if (!dictionary) return null;

  return (
    <div className="flex items-start gap-4">
      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md">
        {productImage &&
          <Image
            src={productImage.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={productImage.imageHint}
          />
        }
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <Link href={`/${lang}/product/${item.slug}`} className="font-medium hover:underline">
              {item.name}
            </Link>
            <p className="text-sm text-muted-foreground">{dictionary.product.size}: {item.size}</p>
            <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={() => removeItem(item.id, item.size)}
            aria-label={dictionary.cart.remove}
          >
            <X size={16} />
          </Button>
        </div>
        <div className="mt-2 flex items-center">
          <div className="flex items-center rounded-md border w-fit">
             <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </Button>
            <Input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
              className="h-8 w-12 border-0 text-center focus-visible:ring-0"
              aria-label="Quantity"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
