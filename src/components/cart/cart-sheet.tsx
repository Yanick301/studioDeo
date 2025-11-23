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

export default function CartSheet() {
  const { items, subtotal, tax, total, cartCount } = useCart();

  return (
    <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
      <SheetHeader className="px-6">
        <SheetTitle>Cart {cartCount > 0 && `(${cartCount})`}</SheetTitle>
      </SheetHeader>
      <Separator />
      {cartCount > 0 ? (
        <>
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-4 px-6 py-4">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.size}`} item={item} />
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="bg-secondary px-6 py-4 mt-auto">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Taxes</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-4">
          <p className="text-lg text-muted-foreground">Your cart is empty</p>
          <Button asChild variant="outline">
            <Link href="/category/all">Start Shopping</Link>
          </Button>
        </div>
      )}
    </SheetContent>
  );
}
