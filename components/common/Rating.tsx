import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number | null;
  reviews?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export default function Rating({
  value,
  reviews,
  size = "sm",
  showValue = true,
}: RatingProps) {
  // Handle null rating - show nothing
  if (value === null) {
    return null;
  }

  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalf = value % 1 >= 0.5;

  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSize = { sm: "text-xs", md: "text-sm", lg: "text-base font-bold" };

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className={`${sizeClasses[size]} text-amber-400 fill-amber-400 drop-shadow-sm`}
      />
    );
  }

  if (hasHalf) {
    stars.push(
      <StarHalf
        key="half"
        className={`${sizeClasses[size]} text-amber-400 fill-amber-400 drop-shadow-sm`}
      />
    );
  }

  for (let i = stars.length; i < 5; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        className={`${sizeClasses[size]} text-slate-200 dark:text-slate-700`}
      />
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span className={`${textSize[size]} text-slate-700 dark:text-slate-200 font-semibold`}>
          {value.toFixed(1)}
        </span>
      )}
      {reviews !== undefined && (
        <span className={`${textSize[size]} text-slate-400 dark:text-slate-500 font-medium`}>
          ({reviews.toLocaleString()})
        </span>
      )}
    </div>
  );
}
