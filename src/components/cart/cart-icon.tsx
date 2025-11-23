'use client';

import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import CartSheet from './cart-sheet';
import { useCart } from '@/hooks/use-cart';
import { Locale } from '@/i18n-config';

export default function CartIcon({ lang }: { lang: Locale }) {
  const { cartCount } = useCart();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-accent-foreground bg-accent transform translate-x-1/2 -translate-y-1/2 rounded-full">
              {cartCount}
            </span>
          )}
          <span className="sr-only">Warenkorb</span>
        </Button>
      </SheetTrigger>
      <CartSheet lang={lang} />
    </Sheet>
  );
}
