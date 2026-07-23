import React from "react";
import styles from "../styles/SearchBar.module.css";

const SearchBar = () => (
  <form className={styles.searchForm} onSubmit={e => e.preventDefault()}>
    <input
      className={styles.searchInput}
      type="text"
      placeholder="Buscar..."
      aria-label="Buscar"
    />
    <button className={styles.searchButton} type="submit">🔍</button>
  </form>
);

export default SearchBar;
