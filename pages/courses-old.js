import React from 'react'
import Link from 'next/link'

// import config from "../blog.config"
// import PostLayout from "../src/layout/PostLayout"
// import Posts from "../src/views/Posts"
import { getAllPosts } from "./api/postsApi"


const PostsPage = ({ posts }) => {
  // console.log(posts)
  return(
    <div style={{padding: '1rem'}}>
   {/* <PostLayout
     url={config.url}
     title={config.title}
     description={config.description}
     imageUrl={config.shareImage}
     imageAlt={config.shareImageAlt}
   >
     <Posts posts={posts} />
   </PostLayout> */}
   <p>Courses: {posts.length}</p>
    <hr />
    {posts && posts.map(x => <Link key={x.title} href={x.slug} ><button>--{x.title}--</button></Link>)}
    <hr />
    {JSON.stringify(posts)}
  </div>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "coverImageAlt",
    "coverImageHeight",
    "coverImageWidth",
    "excerpt",
    "draft",
    'tags',
    'content',
    'lang',
    'type',
  ])

  // const startIndex = 0
  // const endIndex = config.postsPerPage
  // const prevPosts = null
  // const nextPosts = endIndex >= posts.length ? null : 2

  return {
    props: { posts },
  }
}

export default PostsPage
