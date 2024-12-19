import s from "./menu.module.scss";

import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Icons } from "../SVGIcons/icons";


type MenuProps = {
  closeMenu: () => void;
  isMenuOpen: boolean;
  path: string
  onLogout: ()=> void
};

const MobileMenu: React.FC<MenuProps> = ({ closeMenu, isMenuOpen, path, onLogout }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    if (isMenuOpen) {
      setIsMounted(true);
      setModalRoot(document.getElementById("modal-root"));
  
      document.body.style.overflow = "hidden";
    }
   

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navigateTo = (href: string) => {
    navigate(href);
    closeMenu();
  };

  const getClass = (href: string) => {
    return path === href ? s.link_active : s.link;
  };

  if (!isMounted || !modalRoot) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isMenuOpen && (
        <>
        <motion.div
          className={s.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
          <motion.div
            initial={{ x: "100%"}}
            animate={{ x: 0 }}
            transition={{ damping: 20, duration: 0.4 }}
            exit={{ x: "100%"}}
            className={s.menu}
          >
            <span className={s.closeBtn} onClick={closeMenu}>
              <Icons.IconClose />
            </span>

            <nav className={s.nav}>
              <ul className={s.nav_list}>
                <li className={s.nav_list_item}>
                  <span className={getClass('/')} onClick={() => navigateTo("/")}>
                    Home
                  </span>
                </li>
                <li className={s.nav_list_item}>
                  <span
                    className={getClass('/business')}
                    onClick={() => navigateTo("/trade/BTC-USDT")}
                  >
                    Trade
                  </span>
                </li>
                <li className={s.nav_list_item}>
                  <span
                    className={getClass('/contact')}
                    onClick={() => navigateTo("/contact")}
                  >
                    Contact us
                  </span>
                </li>
                </ul>
                <span onClick={onLogout} className={s.logout}>log out</span>
             
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    modalRoot
  );
};

export default MobileMenu;
