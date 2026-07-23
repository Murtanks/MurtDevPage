import React, { ReactNode, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Layout.module.css";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import Logo from "./Logo";
import murtLogo from "../assets/MurtDev.svg";

type Props = { children?: ReactNode; title?: string };
const Layout = ({ children, title = "This is the default title" }: Props) => {
  const lastScrollY = useRef(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAtTop = currentScrollY < 12;
      const scrollDelta = currentScrollY - lastScrollY.current;

      setIsCompact((wasCompact) => wasCompact ? !isAtTop : currentScrollY > 220);
      if (isAtTop) {
        setIsHidden(false);
      } else if (scrollDelta > 8 && currentScrollY > 220) {
        setIsHidden(true);
      } else if (scrollDelta < -8 && currentScrollY > 12) {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Head>
        <title>{title}</title><meta charSet="utf-8" /><meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Pixelify+Sans:wght@400;500;600;700&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <header className={`${styles.header} ${isCompact ? styles.headerCompact : ""} ${isHidden ? styles.headerHidden : ""}`}>
        <div className={styles.headerLeft}><Logo /></div>
        <div className={styles.headerCenter}><SearchBar /></div>
      </header>
      {isHidden && <a className={styles.floatingLogo} href="/" aria-label="Ir al inicio"><Image src={murtLogo} alt="MurtDev" width={64} height={64} /></a>}
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout;
