import { useEffect, useState } from 'react';

const STORAGE_KEY = 'flex_approvals_v1';

export default function useApprovals(initial: Record<string, boolean> = {}) {
  const [map, setMap] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {}
  }, [map]);

  const toggle = (id: string) => {
    setMap(m => ({ ...m, [id]: !m[id] }));
  };

  const setApproved = (id: string, value: boolean) => {
    setMap(m => ({ ...m, [id]: value }));
  };

  return { map, toggle, setApproved };
}
