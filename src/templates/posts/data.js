/**
 * Post Template Fragment
 */
const PostTemplateFragment = `
    fragment PostTemplateFragment on WPGraphQL_Post {
        id
        databaseId
        title
        content
        link
        featuredImage {
            node {
                sourceUrl
            }
        }
        categories {
            nodes {
                name
                slug
                id  
            }
        }
        tags {
            nodes {
                slug
                name
                id 
            }
        }
        author {
            node
            {
                name
                slug
            }
        }                
    }
`

const BlogPreviewFragment = `
    fragment BlogPreviewFragment on WPGraphQL_Post {
        id
        databaseId
        title
        uri
        date
        slug
        excerpt
        content
        featuredImage {
            node {
                sourceUrl
            }
        }
        author {
            node {
                name
                slug
            }
        }
    }
`

exports.PostTemplateFragment = PostTemplateFragment
exports.BlogPreviewFragment = BlogPreviewFragment