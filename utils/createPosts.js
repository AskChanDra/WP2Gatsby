const {
  PostTemplateFragment,
  BlogPreviewFragment,
} = require('../src/templates/posts/data.js')

const postTemplate = require.resolve(`../src/templates/posts/index.js`)
const blogTemplate = require.resolve(`../src/templates/posts/blog.js`)

const GET_POSTS = `
  # Make use of the imported fragments
  ${PostTemplateFragment}
  ${BlogPreviewFragment}
  # Define our query variables
  query GET_POSTS($first:Int $after:String) {
    wpgraphql {
      # Ask for posts
      posts(
          # Ask for the first XX number of posts
          first: $first 
          
          # A Cursor to where in the dataset our query should start
          # and get items _after_ that point
          after:$after
      ) {
          # In response, we'll want pageInfo so we know if we need
          # to fetch more posts or not.
          pageInfo {
              # If true, we need to ask for more data.
              hasNextPage
              
              # This cursor will be used for the value for $after
              # if we need to ask for more data
              endCursor
          } 
          nodes {
              uri
              
              #This is the fragment used for the Post Template
              ...PostTemplateFragment

              # This is the fragment used for the Blog Preview Template or Archive Pages
              ...BlogPreviewFragment
          }
      }
    }
  }
`

/**
 * Array to store allPostss. We make paginated requests
 * to WordPress to get allPostss, and once we have all pages,
 * then we iterate over them to create pages.
 *
 * @type {Array}
 */
const allPosts = []

const blogPages = []

/**
 * We track the post number so we can output the post number to the console.
 *
 * @type {number}
 */
let pageNumber = 0
const itemsPerPage = 10

/**
 * This is the export which Gatbsy will use to process.
 *
 * @param { actions, graphql }
 * @returns {Promise<void>}
 */
module.exports = async ({ actions, graphql, reporter }, options ) => {
  /**
   * This is the method from Gatsby that we're going
   * to use to create pages in our static site.
   */
  const { createPage } = actions

  /**
   * Fetch pages method. This accepts variables to alter
   * the query. The variable `first` controls how many items to
   * request per fetch and the `after` controls where to start in
   * the dataset.
   *
   * @param variables
   * @returns {Promise<*>}
   */
  const fetchPages = async (variables) => {
    /**
     * Fetch pages using the GET_POSTS query and the variables passed in.
     */
    return await graphql(GET_POSTS, variables).then(({ data }) => {
      /**
       * Extract the data from the GraphQL query results
       */
      const {
        wpgraphql: {
          posts: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data

      /**
       * Define the path for the paginated blog page.
       * This is the url the page will live at
       * @type { string }
       */
      const blogPagePath = !variables.after
      ? `blog/`
      : `blog/page/${pageNumber + 1}`

      /**
       * Add config for the blogPage to the blog Page array
       * for creating later
       * 
       * @type {{
       * path: string,
       * component: string,
       * context: {nodes:*, pageNumber: number, hasNextPage: *}
       * }}
       */
      blogPages[pageNumber] = {
        path: blogPagePath,
        component: blogTemplate,
        context: {
          nodes,
          pageNumber: pageNumber + 1,
          hasNextPage,
          itemsPerPage,
          allPosts,
        },
      }

      /**
       * Map over the pages for later creation
       */
      nodes &&
        nodes.map(posts => {
          allPosts.push(posts)
        })

      /**
       * If there's another post, fetch more
       * so we can have all the data we need.
       */
      if (hasNextPage) {
        pageNumber++
        console.log(`fetch post ${pageNumber} of posts...`)
        return fetchPages({ first: 10, after: endCursor })
      }

      /**
       * Once we're done, return all the pages
       * so we can create the necessary pages with
       * all the data on hand.
       */
      return allPosts
    })
  }

  /**
   * Kick off our `fetchPages` method which will get us all
   * the pages we need to create individual pages.
   */
  await fetchPages({ first: itemsPerPage, after: null }).then(allPosts => {
    /**
     * Map over the allPosts array to create the
     * single pages
     */
    allPosts &&
      allPosts.map(post => {
        console.log(`create posts: ${post.uri}`)
        createPage({
        path: `${post.uri}`,
        component: postTemplate,
        context: {
            post: post,
        },
        })
      })
      reporter.info(`# -----> POSTS TOTAL: ${allPosts.length}`)

      /**
       * Map over the `blogPages` array to crat the paginated blog pages
       */
      blogPages &&
        blogPages.map((blogPage) => {
          if(blogPage.context.pageNumber === 1 ) {
            blogPage.context.publisher = true
            blogPage.context.label = blogPage.path.replace('/', '')
          }
          createPage(blogPage)
          reporter.info(`created blog arhive page ${blogPage.context.pageNumber}`)

        })
  })
}