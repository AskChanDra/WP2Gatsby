// src/helper/index.js
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