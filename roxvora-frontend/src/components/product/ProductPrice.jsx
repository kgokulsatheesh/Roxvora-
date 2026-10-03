const ProductPrice = ({ current, original, currency = '$', className = '', format = 'compact', showCurrency = true }) => {
  const formatPrice = (price) => {
    if (price === null || price === undefined) return '';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numPrice)) return '';
    if (format === 'compact') {
      return numPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return numPrice.toFixed(2);
  };

  const formattedCurrent = formatPrice(current);
  const formattedOriginal = formatPrice(original);
  const hasDiscount = original && current && original > current;

  return (
    <div className={`flex items-baseline gap-2 ${className}`} aria-label={`Price: ${formattedCurrent} ${currency}`}>
      <span className="font-bold text-primary">
        {showCurrency && <span>{currency}</span>}
        {formattedCurrent}
      </span>
      {hasDiscount && (
        <>
          <span className="text-secondary line-through">
            {showCurrency && <span>{currency}</span>}
            {formattedOriginal}
          </span>
          <span className="badge badge-error badge-sm">
            -{Math.round(((original - current) / original) * 100)}%
          </span>
        </>
      )}
      {original && !hasDiscount && (
        <span className="text-secondary line-through">
          {showCurrency && <span>{currency}</span>}
          {formattedOriginal}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;