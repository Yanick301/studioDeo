'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProductGalleryProps {
  imageIds: string[];
  productName: string;
}

export default function ProductGallery({ imageIds, productName }: ProductGalleryProps) {
  const [selectedImageId, setSelectedImageId] = useState(imageIds[0]);

  const images = imageIds.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);
  const selectedImage = PlaceHolderImages.find(p => p.id === selectedImageId);

  return (
    <div className="flex flex-col gap-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] w-full">
            {selectedImage && (
              <Image
                src={selectedImage.imageUrl}
                alt={productName}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={selectedImage.imageHint}
              />
            )}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image) => image && (
          <div
            key={image.id}
            className={cn(
              'relative aspect-square cursor-pointer overflow-hidden rounded-md transition-all',
              selectedImageId === image.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:opacity-80'
            )}
            onClick={() => setSelectedImageId(image.id)}
          >
            <Image
              src={image.imageUrl}
              alt={`${productName} thumbnail`}
              fill
              className="object-cover"
              sizes="25vw"
              data-ai-hint={image.imageHint}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
