import React from 'react';
import styles from "./Layout.module.css"

function Layout({children}) {
  return(
  <>
    <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>
            Iliad | <a href="https://hemmatjoo.com">Portfolio</a>
        </p>
    </header>
    {children}
    <footer className={styles.footer}>
        <p>Developed by Iliad with❤️</p>
    </footer>
  
  </>
  )
}

export default Layout