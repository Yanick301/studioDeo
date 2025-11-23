'use client';

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import CartItem from './cart-item';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';
import { Locale } from '@/i18n-config';

export default function CartSheet({ lang }: { lang: Locale }) {
  const { items, subtotal, tax, total, cartCount } = useCart();

  return (
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="px-6">
        <SheetTitle>Warenkorb {cartCount > 0 && `(${cartCount})`}</SheetTitle>
      </SheetHeader>
      <Separator />
      {cartCount > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 px-6 py-4">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.size}`} item={item} lang={lang}/>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="bg-secondary px-6 py-4 mt-auto">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-sm">
                <span>Zwischensumme</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Steuern</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Gesamt</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link href={`/${lang}/checkout`}>Zur Kasse</Link>
              </Button>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <p className="text-lg text-muted-foreground">Ihr Warenkorb ist leer</p>
          <Button asChild variant="outline">
            <Link href={`/${lang}/category/all`}>Weiter einkaufen</Link>
          </Button>
        </div>
      )}
    </SheetContent>
  );
}
