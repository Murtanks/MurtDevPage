import React from "react";
import styles from "../styles/Footer.module.css";
const Footer = () => (<footer className={styles.footer}><div className={styles.contactFooter}><span>📞 <a href="tel:+56912345678">+56 9 1234 5678</a></span><span>✉️ <a href="mailto:contacto@murtdev.cl">contacto@murtdev.cl</a></span></div><div className={styles.copy}>&copy; {new Date().getFullYear()} MurtDev. Todos los derechos reservados.</div></footer>);
export default Footer;
