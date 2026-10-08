import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiThumbsUp, FiCheckCircle, FiStar, FiEdit3, FiX } from 'react-icons/fi';
import Rating from '../common/Rating/Rating';
import {
  addReview,
  buildSeedReviews,
  selectUserReviews,
  summarizeReviews,
  formatReviewDate,
} from '../../store/slices/reviewSlice';

const SORTS = [
  { id: 'recent', label: 'Most recent' },
  { id: 'rating', label: 'Highest rated' },
  { id: 'helpful', label: 'Most helpful' },
];

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

const ProductReviews = ({ product, className = '' }) => {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) => selectUserReviews(state, product.id));
  const [sort, setSort] = useState('recent');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [votedIds, setVotedIds] = useState([]);
  const [formValues, setFormValues] = useState({ author: '', rating: 0, title: '', body: '' });
  const [formErrors, setFormErrors] = useState({});

  const reviews = useMemo(
    () => [...userReviews, ...buildSeedReviews(product.id)],
    [userReviews, product.id]
  );

  const summary = useMemo(() => summarizeReviews(reviews), [reviews]);

  const sorted = useMemo(() => {
    const list = [...reviews];
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'helpful') list.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
    else list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [reviews, sort]);

  const validate = () => {
    const errs = {};
    if (!formValues.author.trim()) errs.author = 'Your name is required';
    if (!formValues.rating) errs.rating = 'Please select a rating';
    if (!formValues.title.trim()) errs.title = 'A headline is required';
    if (!formValues.body.trim()) errs.body = 'Tell us about your experience';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    dispatch(addReview({ productId: product.id, ...formValues }));
    toast.success('Thanks — your review is live');
    setFormValues({ author: '', rating: 0, title: '', body: '' });
    setFormErrors({});
    setIsFormOpen(false);
  };

  const change = (field) => (e) => {
    setFormValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="reviews" className={`scroll-mt-32 ${className}`} aria-labelledby="reviews-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
        <h3 id="reviews-heading" className="text-xl md:text-2xl font-secondary font-semibold text-primary">
          Customer Reviews
        </h3>
        <button
          type="button"
          className="btn btn-secondary btn-md inline-flex items-center gap-2"
          onClick={() => setIsFormOpen((o) => !o)}
        >
          {isFormOpen ? <FiX className="w-4 h-4" aria-hidden="true" /> : <FiEdit3 className="w-4 h-4" aria-hidden="true" />}
          {isFormOpen ? 'Close' : 'Write a review'}
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} noValidate className="card p-6 mb-8" aria-label="Write a review">
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="review-author" className="block text-sm font-medium text-primary mb-1">Your name</label>
              <input id="review-author" type="text" value={formValues.author} onChange={change('author')} className="input-field w-full" placeholder="Your name" />
              {formErrors.author && <p className="mt-1 text-sm text-error">{formErrors.author}</p>}
            </div>
            <div>
              <span className="block text-sm font-medium text-primary mb-1">Your rating</span>
              <Rating
                value={formValues.rating}
                max={5}
                size="lg"
                readonly={false}
                onChange={(v) => { setFormValues((p) => ({ ...p, rating: v })); setFormErrors((p) => ({ ...p, rating: undefined })); }}
              />
              {formErrors.rating && <p className="mt-1 text-sm text-error">{formErrors.rating}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="review-title" className="block text-sm font-medium text-primary mb-1">Headline</label>
            <input id="review-title" type="text" value={formValues.title} onChange={change('title')} className="input-field w-full" placeholder="Sum it up in a few words" />
            {formErrors.title && <p className="mt-1 text-sm text-error">{formErrors.title}</p>}
          </div>

          <div className="mb-5">
            <label htmlFor="review-body" className="block text-sm font-medium text-primary mb-1">Your review</label>
            <textarea id="review-body" rows={4} value={formValues.body} onChange={change('body')} className="input-field w-full resize-y" placeholder="What did you like or dislike?" />
            {formErrors.body && <p className="mt-1 text-sm text-error">{formErrors.body}</p>}
          </div>

          <button type="submit" className="btn btn-primary btn-md">Submit review</button>
        </form>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="card p-6">
            <div className="flex items-end gap-4">
              <span className="text-5xl font-secondary font-bold text-primary leading-none">{summary.average}</span>
              <div className="pb-1">
                <Rating value={summary.average} max={5} size="sm" readonly />
                <p className="text-sm text-secondary mt-1">{summary.count} review{summary.count === 1 ? '' : 's'}</p>
              </div>
            </div>

            <dl className="space-y-2 mt-6">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = summary.distribution[star] || 0;
                const percent = summary.count ? Math.round((count / summary.count) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <dt className="flex items-center gap-1 text-sm text-secondary w-9 shrink-0">
                      {star}<FiStar className="w-3.5 h-3.5 text-yellow-400" aria-hidden="true" />
                    </dt>
                    <dd className="flex-1 flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                        <div className="h-full rounded-full bg-yellow-400" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="text-xs text-secondary w-9 text-right">{percent}%</span>
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="text-sm text-secondary mt-6 pt-4 border-t border-neutral-100">
              <span className="font-semibold text-primary">{summary.recommended}%</span> rated 4★ or higher
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="text-sm text-secondary">{summary.count} review{summary.count === 1 ? '' : 's'}</p>
            <div className="flex items-center gap-1" role="group" aria-label="Sort reviews">
              {SORTS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSort(opt.id)}
                  aria-pressed={sort === opt.id}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${sort === opt.id ? 'bg-primary text-white' : 'text-secondary hover:text-primary hover:bg-neutral-100'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <ul className="space-y-4">
            {sorted.map((review) => {
              const hasVoted = votedIds.includes(review.id);
              return (
                <li key={review.id} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-primary-900 text-secondary-200 flex items-center justify-center text-sm font-semibold flex-shrink-0" aria-hidden="true">
                      {initials(review.author)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="font-medium text-primary">{review.author}</p>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-xs text-green-600">
                            <FiCheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                            Verified purchase
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-secondary mt-0.5">{formatReviewDate(review.createdAt)}{review.location ? ` · ${review.location}` : ''}</p>
                      <div className="mt-2"><Rating value={review.rating} max={5} size="sm" readonly /></div>
                      <h4 className="font-medium text-primary mt-2">{review.title}</h4>
                      <p className="text-sm leading-relaxed text-secondary mt-1">{review.body}</p>
                      <button
                        type="button"
                        onClick={() => !hasVoted && setVotedIds((ids) => [...ids, review.id])}
                        disabled={hasVoted}
                        className={`mt-3 inline-flex items-center gap-2 text-xs font-medium transition-colors ${hasVoted ? 'text-green-600' : 'text-secondary hover:text-primary'}`}
                      >
                        <FiThumbsUp className="w-4 h-4" aria-hidden="true" />
                        {hasVoted ? 'Marked helpful' : 'Helpful'}
                        {review.helpful > 0 && ` (${review.helpful + (hasVoted ? 1 : 0)})`}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
