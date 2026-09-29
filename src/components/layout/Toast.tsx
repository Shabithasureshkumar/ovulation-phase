import React from 'react';

/** Bottom-right status toast announced to screen readers. */
export const Toast: React.FC<{ message: string | null }> = ({ message }) =>
  message ? (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 sm:max-w-sm z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold"
    >
      {message}
    </div>
  ) : null;
