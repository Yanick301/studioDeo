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
import { useDictionary } from '@/hooks/use-dictionary';
import { SheetClose } from '../ui/sheet';

export default function CartSheet({ lang }: { lang: Locale }) {
  const { items, subtotal, tax, total, cartCount } = useCart();
  const dictionary = useDictionary();

  if (!dictionary) return null;

  return (
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="px-6">
        <SheetTitle>{dictionary.cart.title} {cartCount > 0 && `(${cartCount})`}</SheetTitle>
      </SheetHeader>
      <Separator />
      {cartCount > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 px-6 py-4">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.size}`} item={item} lang={lang} />
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="bg-secondary px-6 py-4 mt-auto">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-sm">
                <span>{dictionary.cart.subtotal}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>{dictionary.cart.taxes}</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>{dictionary.cart.total}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link href={`/${lang}/checkout`}>{dictionary.cart.checkout}</Link>
              </Button>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <p className="text-lg text-muted-foreground">{dictionary.cart.empty}</p>
          <SheetClose asChild>
            <Button asChild variant="outline">
              <Link href={`/${lang}/category/all`}>{dictionary.cart.continueShopping}</Link>
            </Button>
          </SheetClose>
        </div>
      )}
    </SheetContent>
  );
}
