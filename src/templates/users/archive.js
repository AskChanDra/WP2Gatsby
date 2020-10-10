// src/templates/users/archive.js
import React from 'react'
import Layout from '../../components/Layout'
import PostEntry from '../../components/PostEntry'

const AuthorArchive = props => {
    const {
        pageContext: {name, posts},
    } = props

    return (
        <Layout className="archive">
            <header className="page-header">
                <h1 className="page-title">
                    Author Archive <span className="page-description">{name}</span>
                </h1>
            </header>
            {
                posts.nodes &&
                    posts.nodes.map( post => {
                        return <PostEntry key={post.id} post={post} />
                    })
            }
        </Layout>
    )
}

export default AuthorArchive