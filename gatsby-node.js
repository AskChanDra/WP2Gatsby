/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const createPages = require('./utils/createPages')
const createPosts = require('./utils/createPosts')
const createUsers = require('./utils/createUsers')
// const createCategories = require('./utils/createCategories')
// const createTags = require('./utils/createTags')

exports.createPagesStatefully = async ({ graphql, actions, reporter }, options) => {
    await createPages({ actions, graphql, reporter }, options )
    await createPosts({ actions, graphql, reporter }, options )
    await createUsers({ actions, graphql, reporter }, options )
    // await createCategories({ actions, graphql, reporter}, options )
    // await createTags({ actions, graphql, reporter}, options )
}