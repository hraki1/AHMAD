// Components/UI/StarRating.jsx
import { Star } from "lucide-react";

const StarRating = ({
  rating,
  onRatingChange,
  interactive = true,
  size = 16,
}) => {
  return (
    <div className="d-flex align-items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          color={star <= rating ? "#ffc107" : "#e4e5e9"}
          fill={star <= rating ? "#ffc107" : "none"}
          onMouseEnter={
            interactive ? () => onRatingChange?.setHoveredStar(star) : undefined
          }
          onMouseLeave={
            interactive ? () => onRatingChange?.setHoveredStar(null) : undefined
          }
          onClick={
            interactive
              ? () => onRatingChange?.handleStarClick(star)
              : undefined
          }
          style={{
            cursor: interactive ? "pointer" : "default",
            marginRight: "4px",
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;
