import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Review } from "@/lib/types"
import { Star } from "lucide-react"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useDictionary } from "@/hooks/use-dictionary"

interface ProductReviewsProps {
  reviews: Review[];
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
  </div>
);


export default function ProductReviews({ reviews }: ProductReviewsProps) {
  const dictionary = useDictionary();

  if (!dictionary) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{dictionary.product.reviews}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.map((review) => {
           const authorImage = PlaceHolderImages.find(p => p.id === review.authorImageId);
           return (
            <div key={review.id} className="flex gap-4">
              <Avatar>
                {authorImage && <AvatarImage src={authorImage.imageUrl} alt={review.author} data-ai-hint={authorImage.imageHint} />}
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{review.author}</p>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                 <div className="my-1">
                    <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
              </div>
            </div>
           )
        })}
      </CardContent>
    </Card>
  )
}
