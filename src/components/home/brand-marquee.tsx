'use client';

const brands = [
  'Gucci',
  'Prada',
  'Louis Vuitton',
  'Chanel',
  'Dior',
  'Hermès',
  'Rolex',
  'Cartier',
  'Burberry',
  'Saint Laurent',
];

const MarqueeItem = ({ brand }: { brand: string }) => (
    <div className="py-2 px-8 text-lg font-semibold text-primary/70 whitespace-nowrap">
      {brand}
    </div>
);

export default function BrandMarquee() {
  const allBrands = [...brands, ...brands]; // Duplicate for seamless loop

  return (
    <div className="relative flex overflow-hidden border-b bg-secondary/50">
        <div className="flex brand-marquee-animation">
            {allBrands.map((brand, index) => (
                <MarqueeItem key={`${brand}-${index}`} brand={brand} />
            ))}
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-background"></div>
    </div>
  );
}
