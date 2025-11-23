'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products as allProducts } from '@/lib/data';
import ProductCard from '@/components/products/product-card';
import { Skeleton } from '@/components/ui/skeleton';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-headline font-bold mb-8">
        {query ? `Search results for "${query}"` : 'Search'}
      </h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">
            No products found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<SearchSkeleton />}>
            <SearchResults />
        </Suspense>
    )
}

function SearchSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <Skeleton className="h-12 w-1/2 mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="aspect-[3/4]" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-1/4" />
                    </div>
                ))}
            </div>
        </div>
    )
}
