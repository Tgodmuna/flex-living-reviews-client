import React, { useEffect, useMemo, useState } from 'react';
import { fetchHostawayReviews } from '../services/api';
import type { NormalizedReview } from '../types';
import { Link } from 'react-router-dom';
import useApprovals from '../hooks/useApproval';

export default function ListingDisplay() {
  const [reviews, setReviews] = useState<NormalizedReview[]>([]);
  const { map: approvals } = useApprovals({});
  useEffect(() => {
    (async () => {
      const data = await fetchHostawayReviews();
      setReviews(data);
    })();
  }, []);

  const approved = useMemo(
    () => reviews.filter(r => approvals[r.id || '']),
    [reviews, approvals]
  );

  const byListing = useMemo(() => {
    const m = new Map<string, NormalizedReview[]>();
    approved.forEach(r => {
      const arr = m.get(r.listing) || [];
      arr.push(r);
      m.set(r.listing, arr);
    });
    return Array.from(m.entries());
  }, [approved]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Public Review Display</h1>
        <Link to="/" className="text-sm text-blue-600">
          Back to Dashboard
        </Link>
      </header>

      {byListing.length === 0 ? (
        <div className="text-gray-500">No approved reviews yet.</div>
      ) : (
        byListing.map(([listing, items]) => (
          <div key={listing} className="bg-white p-4 rounded mb-4 shadow">
            <h2 className="font-semibold">{listing}</h2>
            <div className="mt-3 space-y-3">
              {items.map(r => (
                <div key={r.id} className="border rounded p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm text-gray-500">
                        {r.channel} • {r.date}
                      </div>
                      <div className="font-medium">{r.guestName}</div>
                    </div>
                    <div className="text-lg font-bold">
                      {r.averageRating.toFixed(1)}
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{r.review}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
