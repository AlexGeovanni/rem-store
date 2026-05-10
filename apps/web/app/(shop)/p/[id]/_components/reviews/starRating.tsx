import { Star, StarHalf } from "lucide-react";


export default function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
  
    return (
      <ul className="flex gap-1 justify-start items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < fullStars) {
            return (
              <li key={index}>
                <Star className="w-4 h-4 text-yellow-400 fill-amber-400"  />
              </li>
            );
          }
          if (index === fullStars && hasHalfStar) {
            return (
              <li key={index}>
                <StarHalf className="w-4 h-4 text-yellow-400 fill-amber-400" />
              </li>
            );
          }
          return (
            <li key={index}>
              <Star className="w-4 h-4 text-gray-600/40 fill-gray-300/40" />
            </li>
          );
        })}
      </ul>
    );
  };
  