import s from "./header.module.scss";

import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import Container from "../Container/Container";
import MobileMenu from "../MobileMenu/MobileMenu";
import { Icons } from "../SVGIcons/icons";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const path = useLocation().pathname;

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    if (path.startsWith("/trade") && !isActive) {
      return s.link_dark;
    } else if (isActive) {
      return s.link_active;
    } else {
      return s.link;
    }
  };

  const getClass = (element: string) => {
    const elements: { [key: string]: string } = {
      header: path.includes("trade") ? s.header_dark : s.header,
      logo: path.includes("trade") ? s.logo_dark : s.logo,
    };
    return elements[element];
  };

  return (
    <header className={getClass("header")}>
      <Container>
        <div className={s.wrapper}>
          <NavLink to="/">
            <Icons.LogoIcon
              height="50px"
              width="160px"
              className={getClass("logo")}
            />
          </NavLink>
          <nav className={s.nav}>
            <ul className={s.list}>
              <li className={s.list_item}>
                <NavLink className={getLinkClass} to="/">
                  Home
                </NavLink>
              </li>
              <li className={s.list_item}>
                <NavLink className={path.startsWith('/trade')? s.link_active: s.link} to={"/trade/BTC-USDT"}>
                  Trade
                </NavLink>
              </li>
              <li className={s.list_item}>
                <NavLink className={getLinkClass} to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <span className={s.icon} onClick={() => setIsMenuOpen(true)}>
            <Icons.MenuIcon />
          </span>
        </div>
      </Container>
      <MobileMenu
        path={path}
        isMenuOpen={isMenuOpen}
        closeMenu={() => setIsMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
