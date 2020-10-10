let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

console.log(`This WordPress Endpoint is used: '${process.env.WORDPRESS_URL}'`)
// TODO: Using Gatsby Plugin Config : https://www.gatsbyjs.com/plugins/gatsby-plugin-config/?=dotenv

module.exports = {
  siteMetadata: {
    title: `WP2Gatsby`,
    description: `A Gatsby theme for Headless WordPress CMS with WPGraQL`,
    author: `@AskChandra`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "WPGraphQL",
        fieldName: "wpgraphql",
        // GraphQL endpoint, relative to your WordPress home URL.
        // url: "http://wpgraphql.local/graphql",
        // GraphQL endpoint using env variable
        url: `${process.env.WORDPRESS_URL}/graphql`,
        refetchInterval: 900,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
