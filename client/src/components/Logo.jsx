import React from 'react';

export default function Logo({ size = 36, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ParkSmart Logo"
      style={{ flexShrink: 0 }}
    >
      <rect width="64" height="64" rx="16" fill="#0B1F33" />
      <path
        d="M22 18H36C42.6274 18 48 23.3726 48 30C48 36.6274 42.6274 42 36 42H22V18Z"
        stroke="#5EEAD4"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <line
        x1="22"
        y1="18"
        x2="22"
        y2="48"
        stroke="#5EEAD4"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="48" cy="18" r="4" fill="#38BDF8" />
      <path
        d="M48 10C52.4183 10 56 13.5817 56 18"
        stroke="#38BDF8"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
