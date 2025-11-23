'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { categories, products as allProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import ProductCard from '@/components/products/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SortOption = 'latest' | 'price-asc' | 'price-desc' | 'popularity';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  const category = categories.find((c) => c.slug === params.slug);
  const isAllCategory = params.slug === 'all';

  const productsForCategory = useMemo(() => {
    if (isAllCategory) return allProducts;
    if (!category) return [];
    return allProducts.filter((p) => p.categoryId === category.id);
  }, [category, isAllCategory]);

  const sortedProducts = useMemo(() => {
    return [...productsForCategory].sort((a: Product, b: Product) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'popularity':
          return b.popularity - a.popularity;
        case 'latest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [productsForCategory, sortOption]);

  if (!category && !isAllCategory) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4 md:mb-0">
          {isAllCategory ? 'All Products' : category?.name}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Sort by</span>
          <Select onValueChange={(value: SortOption) => setSortOption(value)} defaultValue="latest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
         <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
