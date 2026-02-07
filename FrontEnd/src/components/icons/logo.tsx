import * as React from "react";

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 0h256v256H0z" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M24 128h28l24-40 32 80 24-120 32 80 24-40h28"
      />
      <path
        d="M178.2 26.2a8 8 0 0110.4 3.9l32 80a8 8 0 01-14.2 5.8L174.6 36a8 8 0 013.6-9.8z"
        fill="currentColor"
      />
    </svg>
  );
}
