import React from 'react'

// importing components
import Header from "../Header"
import Footer from "../Footer"

import styles from "./layout.module.css"

const Layout = props => {
    return (
        <div className={`${styles.layout}`}>
            <header className={`${styles.header}`}>
                <Header />
            </header>
            <main className={`${styles.main}`}>
                {props.children}
            </main>
            <footer className={`${styles.footer}`}>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout