// src/templates/posts/blog.js
import React from 'react'
import Layout from '../../components/layout'
import Pagination from '../../components/Pagination'
import PostEntry from '../../components/PostEntry'
import SEO from '../../components/seo'

const Blog = ({ pageContext }) => {
    const { nodes, pageNumber, hasNextPage, itemsPerPage, allPosts } = pageContext

    return (
        <Layout>
            <SEO
            title="Blog"
            description="Blog Posts"
            keywords={[`blog`]}
            />

            { nodes && nodes.map( post => <PostEntry key={post.id} post={post} />)}

            <Pagination
                pageNumber={pageNumber}
                hasNextPage={hasNextPage}
                itemsPerPage={itemsPerPage}
                allPosts={allPosts}
            />
        </Layout>
    )
}

export default Blog