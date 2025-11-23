import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { categories, products } from '@/lib/data';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/product-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tight">
              Elegance in Every Thread
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              Discover curated collections of modern essentials. Uncompromising quality and timeless design, delivered to your door.
            </p>
            <Button asChild size="lg" className="mt-8 font-bold">
              <Link href="/category/all">Shop Now <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-10">Shop by Category</h2>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {categories.map((category) => {
                  const categoryImage = PlaceHolderImages.find(p => p.id === category.imageId);
                  return (
                    <CarouselItem key={category.id} className="md:basis-1/2 lg:basis-1/4">
                      <div className="p-1">
                        <Link href={`/category/${category.slug}`}>
                          <Card className="overflow-hidden group">
                            <CardContent className="p-0 relative aspect-[4/3]">
                              {categoryImage && (
                                <Image
                                  src={categoryImage.imageUrl}
                                  alt={category.name}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  data-ai-hint={categoryImage.imageHint}
                                />
                              )}
                              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-2xl font-headline font-bold text-white">{category.name}</h3>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-10">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
