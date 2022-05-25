import React from 'react'

import { getPostBySlug, getAllPosts } from "./api/postsApi"
import MDX from "@mdx-js/runtime"
import TestEditor from '../components/editor'

const components = {
  Comp: props => <p>{props.children}</p>,
  Editor: TestEditor
}

const PostPage = ({ post }) => (
    // this is where you would wrap the children in a component that 
    // conditionally renders the children or a pay-wall that has info about
    // token purchases or free courses
    <>
      <h2>{post.title}</h2>
      {post.content}
      <MDX  components={components}>{post.content}</MDX>
    </>
)

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "excerpt",
    "date",
    "edit",
    "tags",
    "slug",
    "author",
    "content",
    "coverImage",
    "coverImageAlt",
    "coverImageHeight",
    "coverImageWidth",
    "draft",
    'next',
    'prev',
    'other',
    'prereq',
    'restricted'
  ])

  return {
    props: { post },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"])

  return {
    paths: posts.map((post) => {
      return {
        params: { ...post },
      }
    }),
    fallback: false,
  }
}

export default PostPage
