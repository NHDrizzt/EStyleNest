import React from "react";
import StarIcon from "./StarIcon";

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  activeColor?: string;
  inactiveColor?: string;
  starSize?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  activeColor = "#FACC15",
  inactiveColor = "#E5E7EB",
  starSize = 20,
}) => {
  const roundedRating = Math.round(rating * 10) / 10;

  const fullStars = Math.floor(roundedRating);
  const partialPercentage = (roundedRating - fullStars) * 100;

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, index) => (
        <StarIcon
          key={`full-${index}`}
          fill={activeColor}
          width={starSize}
          height={starSize}
        />
      ))}

      {partialPercentage > 0 && (
        <div
          className="relative inline-block"
          style={{ width: starSize, height: starSize }}
        >
          <StarIcon fill={inactiveColor} width={starSize} height={starSize} />
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{ width: `${partialPercentage}%`, height: starSize }}
          >
            <StarIcon fill={activeColor} width={starSize} height={starSize} />
          </div>
        </div>
      )}

      {Array.from(
        { length: maxStars - fullStars - (partialPercentage > 0 ? 1 : 0) },
        (_, index) => (
          <StarIcon
            key={`empty-${index}`}
            fill={inactiveColor}
            width={starSize}
            height={starSize}
          />
        ),
      )}
    </div>
  );
};

export default RatingStars;
