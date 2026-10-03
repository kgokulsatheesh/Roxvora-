const ProductBadge = ({
  label,
  variant = 'default',
  tone,
  icon: Icon,
  size = 'md',
  className = '',
}) => {
  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-700',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-primary-dark',
    error: 'bg-error text-white',
    info: 'bg-info text-white',
    outline: 'bg-transparent border border-current',
  };

  // Overlay tones — glassy chips that stay legible on top of product photography.
  const toneClasses = {
    gold:
      'bg-gradient-to-r from-secondary-200 via-secondary-400 to-secondary-700 text-primary-900 shadow-[0_2px_12px_rgba(10,10,11,0.28)] ring-1 ring-black/5',
    glass:
      'bg-primary-900/75 text-white backdrop-blur-md ring-1 ring-inset ring-white/20',
    glassGold:
      'bg-primary-900/75 text-secondary-200 backdrop-blur-md ring-1 ring-inset ring-secondary/40',
    sale: 'bg-error text-white shadow-[0_2px_10px_rgba(214,69,69,0.35)]',
  };

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const classes = [
    'inline-flex items-center justify-center gap-1 font-semibold uppercase tracking-wider rounded-full leading-none',
    tone ? toneClasses[tone] : variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      {Icon && <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />}
      {label}
    </span>
  );
};

export default ProductBadge;