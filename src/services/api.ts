import axios from 'axios';
import type { NormalizedReview } from '../types';

const API_BASE = 'http://localhost:5000';

export async function fetchHostawayReviews(): Promise<NormalizedReview[]> {
  const resp = await axios.get(
    process.env.REACT_APP_ENVIRONMENT === 'production'
      ? ` ${process.env.REACT_APP_SERVER_URL}/api/v1/reviews/hostaway`
      : `${API_BASE}/api/v1/reviews/hostaway`
  );
  const data = resp.data;

  if (!data) return [];
  const reviews: NormalizedReview[] = data.reviews || data;
  // ensure ids
  return reviews.map((r: NormalizedReview) => ({
    ...r,
    id: makeId(r),
  }));
}

export function makeId(r: NormalizedReview) {
  // stable id for localStorage; safe enough
  return `${slugify(r.listing)}|${slugify(r.guestName)}|${r.date}`;
}

function slugify(s = '') {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
