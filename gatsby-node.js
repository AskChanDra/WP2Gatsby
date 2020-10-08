/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const createPages = require('./utils/createPages')
const createPosts = require('./utils/createPosts')

exports.createPagesStatefully = async ({ graphql, actions, reporter }, options) => {
    await createPages({ actions, graphql, reporter }, options )
    await createPosts({ actions, graphql, reporter }, options )
}