'use client';

export default function NotFound() {
  function getRoute() {
    if (typeof window === 'undefined') return;

    return window.location.toString();
  }

  return <div>Hey - {getRoute()}</div>;
}
