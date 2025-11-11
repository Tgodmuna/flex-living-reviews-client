export interface NormalizedReview {
  listing: string;
  guestName: string;
  averageRating: number;
  categories: Record<string, number>;
  review: string;
  date: string; // YYYY-MM-DD
  channel: string;
  // derived id (not from backend) for local approval mapping
  id?: string;
}
