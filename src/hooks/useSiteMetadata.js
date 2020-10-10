/**
 * Queries for data with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                    }
                }
            }
        `
    )
    return data.site.siteMetadata
}

export default useSiteMetadata