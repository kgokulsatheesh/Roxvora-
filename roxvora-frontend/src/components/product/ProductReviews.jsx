import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FiThumbsUp, FiCheckCircle, FiStar, FiEdit3 } from 'react-icons/fi';

import Rating from '@components/common/Rating/Rating';
import Button from '@components/common/Button/Button';
import {
  addReview,
  buildSeedReviews,
  selectUserReviews,
  summarizeReviews,
  formatReviewDate,
} from '@store/slices/reviewSlice';

const reviewSchema = yup.object({
  author: yup.string().trim().required('Your name is required').max(60, 'Keep it under 60 characters'),
  rating: yup.number().required('Pick a rating').min(1, 'Pick a rating'),
  title: yup.string().trim().required('Add a short headline').max(80, 'Keep the headline under 80 characters'),
  body: yup.string().trim().required('Tell us about your experience').max(1000, 'Keep the review under 1000 characters'),
});

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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(reviewSchema),
    mode: 'onChange',
    defaultValues: { author: '', rating: 0, title: '', body: '' },
  });

  const ratingValue = watch('rating');

  const onSubmit = (values) => {
    dispatch(
      addReview({
        productId: product.id,
        author: values.author,
        rating: values.rating,
        title: values.title,
        body: values.body,
        verified: false,
      })
    );
    toast.success('Thanks â€” your review is live');
    reset({ author: values.author, rating: 0, title: '', body: '' });
    setIsFormOpen(false);
  };

  const handleVote = (reviewId) => {
    if (votedIds.includes(reviewId)) return;
    setVotedIds((ids) => [...ids, reviewId]);
  };

  return (
    <section id="reviews" className={`scroll-mt-32 ${className}`} aria-labelledby="reviews-heading">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-6">
        <h3 id="reviews-heading" className="text-xl md:text-2xl font-secondary font-semibold text-primary">
          Customer Reviews
        </h3>
        <Button
          type="button"
          variant="secondary"
          size="md"
          onClick={() => setIsFormOpen((open) => !open)}
          leftIcon={<FiEdit3 className="w-4 h-4" />}
        >
          {isFormOpen ? 'Close form' : 'Write a review'}
        </Button>
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="card p-6 mb-8"
          aria-label="Write a review"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-1" htmlFor="review-author">
                Your name
              </label>
              <input
                id="review-author"
                type="text"
                placeholder="Ananya Sharma"
                className="input-field"
                {...register('author')}
              />
              {errors.author?.message && (
                <p className="mt-1 text-sm text-error">{errors.author.message}</p>
              )}
            </div>

            <div>
              <span className="block text-sm font-medium text-primary mb-1">Your rating</span>
              <Rating
                value={ratingValue || 0}
                max={5}
                size="lg"
                readonly={false}
                ariaLabel="Your rating"
                onChange={(value) => setValue('rating', value, { shouldValidate: true })}
              />
              {errors.rating?.message && (
                <p className="mt-1 text-sm text-error">{errors.rating.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-primary mb-1" htmlFor="review-title">
              Headline
            </label>
            <input
              id="review-title"
              type="text"
              placeholder="Sum it up in a few words"
              className="input-field"
              {...register('title')}
            />
            {errors.title?.message && (
              <p className="mt-1 text-sm text-error">{errors.title.message}</p>
            )}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-primary mb-1" htmlFor="review-body">
              Your review
            </label>
            <textarea
              id="review-body"
              rows={4}
              placeholder="What did you like or dislike? How is the fit and quality?"
              className="input-field resize-y"
              {...register('body')}
            />
            {errors.body?.message && (
              <p className="mt-1 text-sm text-error">{errors.body.message}</p>
            )}
          </div>

          <Button type="submit" variant="primary" size="md" loading={isSubmitting}>
            Submit review
          </Button>
        </form>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 min-w-0">
          <div className="card p-6">
            <div className="flex items-end gap-4">
              <span className="text-5xl font-secondary font-bold text-primary leading-none">
                {summary.average}
              </span>
              <div className="pb-1">
                <Rating value={summary.average} max={5} size="sm" readonly />
                <p className="text-sm text-ink-soft mt-1">
                  {summary.count} review{summary.count === 1 ? '' : 's'}
                </p>
              </div>
            </div>

            <dl className="space-y-2 mt-6">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = summary.distribution[star] || 0;
                const percent = summary.count ? Math.round((count / summary.count) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <dt className="flex items-center gap-1 text-sm text-ink-soft w-9 shrink-0">
                      {star}
                      <FiStar className="w-3.5 h-3.5 text-secondary" aria-hidden="true" />
                    </dt>
                    <dd className="flex-1 flex items-center gap-3">
                      <div className="flex-1 h-1.5 rounded-full bg-neutral-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-secondary-400 to-secondary-600"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-ink-soft w-9 text-right">{percent}%</span>
                    </dd>
                  </div>
                );
              })}
            </dl>

            <p className="text-sm text-ink-soft mt-6 pt-4 border-t border-neutral-100">
              <span className="font-semibold text-primary">{summary.recommended}%</span> of buyers
              rated this 4 stars or higher.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-4">
            <p className="text-sm text-ink-soft">
              Showing {summary.count} review{summary.count === 1 ? '' : 's'}
            </p>
            <div className="flex items-center gap-1" role="group" aria-label="Sort reviews">
              {SORTS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSort(option.id)}
                  aria-pressed={sort === option.id}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    sort === option.id
                      ? 'bg-primary text-white'
                      : 'text-ink-soft hover:text-primary hover:bg-neutral-100'
                  }`}
                >
                  {option.label}
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
                    <div
                      className="w-11 h-11 rounded-full bg-primary-900 text-secondary-200 flex items-center justify-center text-sm font-semibold flex-shrink-0"
                      aria-hidden="true"
                    >
                      {initials(review.author)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="font-medium text-primary">{review.author}</p>
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-xs text-success">
                            <FiCheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                            Verified purchase
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ink-soft mt-0.5">
                        {formatReviewDate(review.createdAt)}
                        {review.location ? ` Â· ${review.location}` : ''}
                      </p>

                      <div className="mt-3">
                        <Rating value={review.rating} max={5} size="xs" readonly />
                      </div>

                      <h4 className="font-medium text-primary mt-3">{review.title}</h4>
                      <p className="text-[0.9375rem] leading-7 text-ink-soft mt-1.5">{review.body}</p>

                      <button
                        type="button"
                        onClick={() => handleVote(review.id)}
                        disabled={hasVoted}
                        className={`mt-4 inline-flex items-center gap-2 text-xs font-medium transition-colors ${
                          hasVoted ? 'text-success' : 'text-ink-soft hover:text-primary'
                        }`}
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