import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Locale } from '@/i18n-config';

interface ProductCardProps {
  product: Product;
  lang: Locale;
}

export default function ProductCard({ product, lang }: ProductCardProps) {
  const productImage = PlaceHolderImages.find(p => p.id === product.imageId);

  return (
    <Link href={`/${lang}/product/${product.slug}`}>
      <Card className="overflow-hidden h-full flex flex-col group transition-shadow duration-300 hover:shadow-xl">
        <CardHeader className="p-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
             {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={productImage.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-headline text-lg font-medium">{product.name}</h3>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-base font-semibold">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
