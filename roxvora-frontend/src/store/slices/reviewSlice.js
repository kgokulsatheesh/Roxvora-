import { createSlice } from '@reduxjs/toolkit';

const SEED_REVIEWERS = [
  { name: 'Ananya Sharma', location: 'Mumbai' },
  { name: 'Rohit Verma', location: 'New Delhi' },
  { name: 'Kavya Nair', location: 'Bengaluru' },
  { name: 'Ishaan Patel', location: 'Ahmedabad' },
  { name: 'Meera Iyer', location: 'Chennai' },
  { name: 'Arjun Reddy', location: 'Hyderabad' },
  { name: 'Sara Khan', location: 'Lucknow' },
  { name: 'Neha Gupta', location: 'Pune' },
  { name: 'Vikram Singh', location: 'Jaipur' },
  { name: 'Divya Menon', location: 'Kochi' },
];

const SEED_TITLES = [
  'Exactly as described',
  'Worth every rupee',
  'Quality you can feel',
  'My new go-to piece',
  'Beautiful finish and stitching',
  'Ran smaller than expected',
  'Arrived ahead of schedule',
  'Would absolutely buy again',
  'Great for the price',
  'Colour is even better in person',
];

const SEED_BODIES = [
  'Ordered this on a whim and it turned into the most worn piece in my rotation. The fabric feels substantial and the stitching is neat throughout.',
  'Fit is true to size and the measurements matched the size chart exactly. Washed it twice already with no colour bleeding.',
  'Packaging was lovely and it arrived in three days. Only note is that it is slightly more structured than the photos suggest.',
  'I have bought three pieces from this brand now and the consistency is what keeps me coming back. Highly recommended.',
  'Beautiful detailing around the seams. I sized up based on the reviews and it fits perfectly.',
  'The colour is richer than it appears on screen. Would have liked more colour options though.',
  'Comfortable enough for a full workday and still looks polished in the evening.',
  'Delighted with the purchase. The return process was easy too, though I did not need to use it.',
  'Feels like a much more expensive piece. Compliments every time I wear it.',
  'Second one I have bought in the same colourway. Holds up well after multiple washes.',
];

// Fixed epoch keeps seeded reviews stable between renders and reloads.
const SEED_EPOCH = Date.parse('2026-08-28T00:00:00.000Z');
const DAY = 86400000;

const pick = (list, seed) => list[Math.abs(seed) % list.length];

const RATING_POOL = [5, 5, 5, 4, 4, 4, 4, 3, 5, 2];

export const buildSeedReviews = (productId) => {
  const count = 4 + (productId % 5);
  return Array.from({ length: count }, (_, index) => {
    const seed = productId * 7 + index * 13;
    const author = pick(SEED_REVIEWERS, seed + 3);
    return {
      id: `seed-${productId}-${index}`,
      productId,
      author: author.name,
      location: author.location,
      rating: pick(RATING_POOL, seed),
      title: pick(SEED_TITLES, seed + 5),
      body: pick(SEED_BODIES, seed + 11),
      createdAt: new Date(SEED_EPOCH - (seed % 120) * DAY).toISOString(),
      verified: (seed + 9) % 4 !== 0,
      helpful: seed % 27,
      owned: true,
    };
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const initialState = {
  userReviewsByProduct: {},
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    add: (state, action) => {
      const { productId } = action.payload;
      const existing = state.userReviewsByProduct[productId] || [];
      state.userReviewsByProduct[productId] = [action.payload, ...existing];
    },
  },
});

export const addReview = (review) =>
  reviewSlice.actions.add({
    ...review,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
    helpful: 0,
    owned: true,
  });

const EMPTY_REVIEWS = [];

export const selectUserReviews = (state, productId) =>
  state.review?.userReviewsByProduct?.[productId] || EMPTY_REVIEWS;

export const summarizeReviews = (reviews) => {
  const count = reviews.length;
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;

  reviews.forEach((review) => {
    const rating = Math.min(5, Math.max(1, Number(review.rating) || 0));
    distribution[rating] += 1;
    total += rating;
  });

  return {
    count,
    average: count ? Number((total / count).toFixed(1)) : 0,
    distribution,
    recommended: count
      ? Math.round(
          (reviews.filter((review) => Number(review.rating) >= 4).length / count) * 100
        )
      : 0,
  };
};

export const formatReviewDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export default reviewSlice.reducer;