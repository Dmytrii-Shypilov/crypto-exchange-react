// icon:logout-box-r-line | Remix Icon https://remixicon.com/ | Remix Design
import * as React from "react";

function LogoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="inherit"
      height="25px"
      width="25px"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M5 22a1 1 0 01-1-1V3a1 1 0 011-1h14a1 1 0 011 1v3h-2V4H6v16h12v-2h2v3a1 1 0 01-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z" />
    </svg>
  );
}

export default LogoutIcon;
