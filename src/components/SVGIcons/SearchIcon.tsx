// icon:icon-search | Heroicons UI https://github.com/sschoger/heroicons-ui | Steve Schoger
import * as React from "react";

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="inherit"
      height="15px"
      width="15px"
      {...props}
    >
      <path d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
  );
}

export default SearchIcon;
