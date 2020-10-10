  const { BlogPreviewFragment } = require('../src/templates/posts/data.js')
  
  const userTemplate = require.resolve(`../src/templates/users/archive.js`)
  
  const GET_USERS = `
    # Make use of the imported fragments
    ${BlogPreviewFragment}
    # Define our query variables
    query GET_USERS($first:Int $after:String) {
      wpgraphql {
        # Ask for usrs
        users(
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
                id
                name
                databaseId
                slug
                posts {
                    nodes {
                        # This is the fragment used for the Blog Preview Template or Archive Pages
                        ...BlogPreviewFragment
                    }
                }
                
                
            }
        }
      }
    }
  `
  
  /**
   * Array to store allUsers. We make paginated requests
   * to WordPress to get allUsers, and once we have all pages,
   * then we iterate over them to create pages.
   *
   * @type {Array}
   */
  const allUsers = []
    
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
      return await graphql(GET_USERS, variables).then(({ data }) => {
        /**
         * Extract the data from the GraphQL query results
         */
        const {
          wpgraphql: {
            users : {
              nodes,
              pageInfo: { hasNextPage, endCursor },
            },
          },
        } = data
  
        /**
         * Map over the users for later creation
         */
        nodes &&
          nodes.map(user => {
            allUsers.push(user)
          })
  
        /**
         * If there's another post, fetch more
         * so we can have all the data we need.
         */
        if (hasNextPage) {
          pageNumber++
          console.log(`fetch user ${pageNumber} of users...`)
          return fetchPages({ first: 10, after: endCursor })
        }
  
        /**
         * Once we're done, return all the users
         * so we can create the necessary pages with
         * all the data on hand.
         */
        return allUsers
      })
    }
  
    /**
     * Kick off our `fetchPages` method which will get us all
     * the pages we need to create individual pages.
     */
    await fetchPages({ first: itemsPerPage, after: null }).then(allUsers => {
      /**
       * Map over the allUsers array to create the
       * single pages
       */
      allUsers &&
        allUsers.map(user => {
          console.log(`create posts: ${user.slug}`)
          createPage({
          path: `author/${user.slug}`,
          component: userTemplate,
          context: user,
          })
        })
        reporter.info(`* -----> Users Total: ${allUsers.length}`)
    })
  }