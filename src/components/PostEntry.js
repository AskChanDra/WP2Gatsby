// src/components/PostEntry.js
import React from 'react'
import { Link } from 'gatsby'
import Image from './image'

const PostEntry = ({ post }) => {
    const { uri, title, featuredImage, excerpt } = post

    return (
        <div style={{ marginBottom: '30px' }}>
            <header>
                <Link to={`${uri}`} >
                    <h2 style={{ marginBottom: "5px" }}>{ title }</h2>
                    <Image image={featuredImage} style={{ margin: 0 }} withFallback={true} />
                </Link>
            </header>

            <div dangerouslySetInnerHTML={{__html: excerpt}} />
        </div>
    )
}
export default PostEntry