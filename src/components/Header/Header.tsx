import s from "./header.module.scss";

import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import { Icons } from "../SVGIcons/icons";
import Container from "../Container/Container";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/user/user-selector";
import { logoutUser } from "../../redux/user/user-operations";
import { AppDispatch } from "../../redux/store";




const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>()
  const {isAuthenticated, user: {id}} = useSelector(getUserData)
  const path = useLocation().pathname;
  const isTradePath = path.startsWith("/trade") 

  const onLogout = () => {
    dispatch(logoutUser(id))
  }

  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    if (isTradePath && !isActive) {
      return s.link_dark;
    } else if (isActive) {
      return s.link_active;
    } else {
      return s.link;
    }
  };

  const getClass = (element: string) => {
    const elements: { [key: string]: string } = {
      header: isTradePath ? s.header_dark : s.header,
      logo: isTradePath ? s.logo_dark : s.logo,
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
          {isAuthenticated &&<nav className={s.nav}>
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
          </nav>}
          {isAuthenticated && <span className={isTradePath? s.logout_icon_dark :s.logout_icon} onClick={onLogout}><Icons.LogoutIcon/></span>}
          {isAuthenticated && <span className={s.icon} onClick={() => setIsMenuOpen(true)}>
            <Icons.MenuIcon />
          </span>}
          
        </div>
      </Container>
     {isAuthenticated && <MobileMenu
        onLogout={onLogout}
        path={path}
        isMenuOpen={isMenuOpen}
        closeMenu={() => setIsMenuOpen(false)}
      />}
    </header>
  );
};

export default Header;
