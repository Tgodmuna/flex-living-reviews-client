import React, { useEffect, useMemo, useState } from 'react';
import { fetchHostawayReviews } from '../services/api';
import type { NormalizedReview } from '../types';
import ReviewCard from '../components/ReviewCard';
import useApprovals from '../hooks/useApproval';
import Header from '../components/Dashboardheader';

export default function Dashboard() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [minRating, setMinRating] = useState(0);
  const [category, setCategory] = useState<string>('all');
  const [channel, setChannel] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'new' | 'old' | 'rating'>('new');

  const { map: approvals, toggle } = useApprovals({});

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await fetchHostawayReviews();
        if (!data || data.length === 0) {
          console.warn('No reviews fetched from API');
          return;
        }

        if (mounted) setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // unique categories
  const categories = useMemo(() => {
    const s = new Set<string>();
    reviews.forEach(r => Object.keys(r.categories).forEach(k => s.add(k)));
    return [...s];
  }, [reviews]);

  // unique channels
  const channels = useMemo(
    () => [...new Set(reviews.map(r => r.channel))],
    [reviews]
  );

  // filtering and sorting
  const filtered = useMemo(() => {
    return reviews
      .filter(r => {
        if (r.averageRating < minRating) return false;
        if (category !== 'all' && !Object.keys(r.categories).includes(category))
          return false;
        if (channel !== 'all' && r.channel !== channel) return false;
        if (
          search &&
          !`${r.listing} ${r.guestName} ${r.review}`
            .toLowerCase()
            .includes(search.toLowerCase())
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === 'rating') return b.averageRating - a.averageRating;
        if (sort === 'new') return +new Date(b.date) - +new Date(a.date);
        return +new Date(a.date) - +new Date(b.date);
      });
  }, [reviews, minRating, category, channel, search, sort]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* header */}
      <Header />
      {/* filters */}
      <section className="bg-white p-4 rounded mb-6 shadow">
        <div className="flex gap-3">
          <input
            placeholder="Search listing, guest or review"
            className="flex-1 border rounded p-2"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            value={minRating}
            onChange={e => setMinRating(Number(e.target.value))}
            className="border rounded p-2"
          >
            <option value={0}>Min rating: Any</option>
            <option value={5}>5+</option>
            <option value={7}>7+</option>
            <option value={9}>9+</option>
          </select>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">All categories</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={channel}
            onChange={e => setChannel(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">All channels</option>
            {channels.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={e => setSort(e.target.value as any)}
            className="border rounded p-2"
          >
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="rating">Best Rating</option>
          </select>
        </div>
      </section>

      <section>
        {loading ? (
          <div>Loading...</div>
        ) : filtered.length ? (
          filtered.map(r => (
            <ReviewCard
              key={r.id}
              r={r}
              approved={!!approvals[r.id!]}
              onToggle={toggle}
            />
          ))
        ) : (
          <div className="text-gray-500">No reviews match filters.</div>
        )}
      </section>
    </div>
  );
}
