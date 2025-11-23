'use client';

import { useCart } from '@/hooks/use-cart';
import CartItem from '@/components/cart/cart-item';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';
import { useDictionary } from '@/hooks/use-dictionary';
import { Locale } from '@/i18n-config';

export default function CartPage({ params: { lang } }: { params: { lang: Locale } }) {
  const { items, subtotal, tax, total, cartCount } = useCart();
  const dictionary = useDictionary();

  if (!dictionary) {
    return <p className="text-center py-20">Loading...</p>;
  }

  if (cartCount === 0) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 text-center">
            <div className="text-center py-20 border-2 border-dashed rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">{dictionary.cart.empty}</h2>
                <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild>
                    <Link href={`/${lang}/category/all`}>{dictionary.cart.continueShopping}</Link>
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">{dictionary.cart.title}</h1>
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6 space-y-6">
              {items.map((item, index) => (
                <>
                  <CartItem key={`${item.id}-${item.size}`} item={item} lang={lang} />
                  {index < items.length - 1 && <Separator />}
                </>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">{dictionary.cart.summary}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{dictionary.cart.subtotal}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>{dictionary.cart.taxes}</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>{dictionary.cart.total}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" size="lg">
                <Link href={`/${lang}/checkout`}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  {dictionary.cart.checkout}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
