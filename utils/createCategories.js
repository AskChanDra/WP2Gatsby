const { BlogPreviewFragment } = require(`../src/templates/posts/data.js`)
const categoryTemplate = require.resolve(`../src/templates/categories/archive.js`)

module.exports = async ({ actions, graphql, reporter }, options ) => {
  const GET_CATEGORIES = `
    query GET_CATEGORIES($first: Int $after: String) {
      wpgraphql { 
        categories(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            name
            databaseId
            slug
            posts {
              nodes {
                ...BlogPreviewFragment
              }
            }
          }
        }
      }
    }
    ${BlogPreviewFragment}
  `
  const { createPage } = actions
  const allCategories = []
  const fetchCategories = async variables =>
    await graphql(GET_CATEGORIES, variables).then(({ data }) => {
      const {
        wpgraphql: {
          categories: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data
      nodes.map(category => {
        allCategories.push(category)
      })
      if (hasNextPage) {
        return fetchCategories({ first: 10, after: endCursor })
      }
      return allCategories
    })

  await fetchCategories({ first: 10, after: null }).then(allCategories => {
    allCategories.map(category => {
      console.log(`create category: ${category.slug}`)
      createPage({
        path: `category/${category.slug}`,
        component: categoryTemplate,
        context: {
          ...category,
        },
      })
    })
    reporter.info(`* -----> Categories Total: ${allCategories.length}`)
  })
}