import starFilled from '/src/assets/icons/rating-star-filled.svg'
import starOutlined from '/src/assets/icons/rating-star-outlined.svg'

interface RatingStarsProps{
  rating: number | null
  onRate: (rating: number) => void
}

export default function RatingStars({ rating, onRate }: RatingStarsProps){
  const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div>
      {stars.map((star) => (
        <span key={star} onClick={() => onRate(star)}>
          {rating && star <= rating ? starFilled : starOutlined}
        </span>
      ))}
    </div>
  )
}