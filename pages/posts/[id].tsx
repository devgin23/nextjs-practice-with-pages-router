import { getAllPostIds, getPostsData, getSortedPostsData } from '@/lib/post'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import postStyles from '../../styles/Post.module.css';


const Post = ({ postData }: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) => {
    return (
        <div className={postStyles.container}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1>{postData.title}</h1>
                <div>
                    {postData.date}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml}}/>
            </article>
        </div>
    )
}

export default Post

export const getStaticPaths: GetStaticPaths =async () => {
    const paths = getAllPostIds();
    // [{params: {id: 'pre-rendering'}, } {params...}]
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps =async ({params}) => {
    const postData = await getPostsData(params.id as string)
    return {
        props: {
            postData
        }
    }

}