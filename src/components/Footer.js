// src/components/Footer.js
import React from 'react'

export default function Footer() {
    return (
        <footer style={{
            marginTop: `2rem`
          }}>
            © {new Date().getFullYear()}, WP2Gatsby Starter Theme, Built with
            {` `}
            <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
    )
}
