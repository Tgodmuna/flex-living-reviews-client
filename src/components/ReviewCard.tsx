import React from 'react';
import type { NormalizedReview } from '../types';
import { makeId } from '../services/api';

type Props = {
  r: NormalizedReview;
  approved: boolean;
  onToggle: (id: string) => void;
};

export default function ReviewCard({ r, approved, onToggle }: Props) {
  const id = r.id || makeId(r);
  return (
    <div className="bg-white rounded-md shadow p-4 mb-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500">
            {r.channel} • {r.date}
          </div>
          <div className="text-lg font-semibold">{r.listing}</div>
          <div className="text-sm text-slate-700 mt-1">{r.guestName}</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold">{r.averageRating.toFixed(1)}</div>
          <button
            onClick={() => onToggle(id)}
            className={`mt-2 px-3 py-1 rounded-full text-sm border ${
              approved
                ? 'bg-green-50 border-green-400 text-green-700'
                : 'bg-white border-gray-200'
            }`}
          >
            {approved ? 'Approved ✓' : 'Approve'}
          </button>
        </div>
      </div>

      <p className="mt-3 text-gray-700">{r.review}</p>

      <div className="mt-3 text-xs text-gray-500 flex flex-wrap gap-2">
        {Object.entries(r.categories).map(([k, v]) => (
          <span key={k} className="px-2 py-1 bg-slate-100 rounded">
            {k}: {v}
          </span>
        ))}
      </div>
    </div>
  );
}
