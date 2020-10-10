import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.com/docs/use-static-query/
 */

// const Image = () => {
//   const data = useStaticQuery(graphql`
//     query {
//       placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
//         childImageSharp {
//           fluid(maxWidth: 300) {
//             ...GatsbyImageSharpFluid
//           }
//         }
//       }
//     }
//   `)

//   if (!data?.placeholderImage?.childImageSharp?.fluid) {
//     return <div>Picture not found</div>
//   }

//   return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
// }

// export default Image

const Image = ({ image, withFallback = false, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      fallBackImage: file(relativePath: { eq: "fallback.svg" }) {
          publicURL
      }
    }
  `)

  /**
   * Return fallback Image, if no Imag is given.
   */
  if(!image) {
    return withFallback ? <img src={data.fallBackImage.publicURL} alt={"Fallback"} {...props} /> : null
  }

  return <img src={image.node.sourceUrl} alt={image.altText} {...props} />
}

export default Image