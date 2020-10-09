// src/helper/index.js
import React from 'react'
import { Link as GatsbyLink } from "gatsby"

/**
 * Parses a menu item object and returns Gatsby field URI.
 * @param {object} menuItem a single menu item
 * @param wordPressUrl
 * @param blogURI 
 */
export const CreateLocalLink = ( menuItem, wordPressUrl, blogURI='blog/') => {
    const { url, connectedObject } = menuItem

    if ( url === '#' ) {
        return null;
    }

    /** Pull of API URL */
    let newUri = url.replace(wordPressUrl, '')

    /** if it's a blog link, respect the users blogURI setting */
    if(connectedObject && connectedObject.__typename === 'WPGraphQL_Post') {
        newUri = blogURI + newUri
    }

    return newUri
}

/**
 * Separate Normal link `<a>` vs Gatsby `<Link>`
 */
export const UniveralLink = ({ children, to, activeClassName, partiallyActive, ...other }) => {
    const internal = /^\/(?!\/)/.test(to)
    // Use Gatsby Link for internal links, and <a> for external
    
    if(internal) {
        return (
            <GatsbyLink
                to={to}
                activeClassName={activeClassName}
                partiallyActive={partiallyActive}
                {...other}
                >
                {children}
            </GatsbyLink>
        )
    }
    return (
        <a href={to} {...other}>
            {children}
        </a>
    )
}