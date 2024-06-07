import { useState } from "react";
import "./hamburger.scss";
export default function HamburgerMenu() {
  const [active, setActive] = useState(false);
  return (
    <div
      className={`hamburger ${active ? "hamburger--active" : ""}`}
      onClick={() => {
        setActive((prev) => !prev);
      }}
    >
      <li className="line"></li>
      <li className="line"></li>
      <li className="line"></li>
    </div>
  );
}
