import Rating from '@components/common/Rating/Rating';

const ProductRating = ({
  rating = 0,
  reviewCount = 0,
  max = 5,
  size = 'md',
  showLabel = true,
  showCount = true,
  className = '',
  readonly = true,
  onChange,
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Rating
        value={rating}
        max={max}
        size={size}
        readonly={readonly}
        showLabel={showLabel}
        onChange={onChange}
      />
      {showCount && reviewCount > 0 && (
        <span className="text-sm text-secondary">
          ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
};

export default ProductRating;