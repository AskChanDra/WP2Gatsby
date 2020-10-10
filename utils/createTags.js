const { BlogPreviewFragment } = require(`../src/templates/posts/data.js`)
const tagTemplate = require.resolve(`../src/templates/tags/archive.js`)

module.exports = async ({ actions, graphql, reporter }, options ) => {
  const GET_TAGS = `
    query GET_TAGS($first: Int $after: String) {
      wpgraphql { 
        tags(first: $first, after: $after) {
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
  const allTags = []
  const fetchTags = async variables =>
    await graphql(GET_TAGS, variables).then(({ data }) => {
      const {
        wpgraphql: {
          tags: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data
      nodes.map(tag => {
        allTags.push(tag)
      })
      if (hasNextPage) {
        return fetchTags({ first: 10, after: endCursor })
      }
      return allTags
    })

  await fetchTags({ first: 10, after: null }).then(allTags => {
    allTags.map(tag => {
      console.log(`create tag: ${tag.slug}`)
      createPage({
        path: `tag/${tag.slug}`,
        component: tagTemplate,
        context: tag,
      })
    })
    reporter.info(`* -----> Tags Total: ${allTags.length}`)
  })
}