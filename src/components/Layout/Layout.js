import React from "react"
import PropTypes from "prop-types"

import { useSiteMetadata } from '../../hooks'

import Header from "../header"
import "../layout.css"
import Menu from "../Menu"
import Footer from "../Footer"

import styles from './Layout.module.scss'

import "@wordpress/block-library/build-style/style.css"

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)
  const { title } = useSiteMetadata

  return (
    <>
      <Header siteTitle={title} />
      <div
        className={styles.layout}
      >
        <Menu />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
