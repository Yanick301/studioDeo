import { notFound } from 'next/navigation';
import { products, reviews as allReviews } from '@/lib/data';
import ProductGallery from '@/components/products/product-gallery';
import ProductInfo from '@/components/products/product-info';
import ProductReviews from '@/components/products/product-reviews';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.slug === params.id);

  if (!product) {
    notFound();
  }

  const reviewsForProduct = allReviews.slice(0, 5);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <ProductGallery imageIds={product.galleryImageIds} productName={product.name} />
        </div>
        <div>
          <ProductInfo product={product} />
        </div>
      </div>
      <div className="mt-16">
         <ProductReviews reviews={reviewsForProduct} />
      </div>
    </div>
  );
}
