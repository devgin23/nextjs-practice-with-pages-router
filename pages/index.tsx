import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getSortedPostsData } from "../lib/post";
import homeStyles from '../styles/Home.module.css';
import Link from "next/link";

const Home = ({allPostsData}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) => {
  return (
    <div className={homeStyles.container}>
      <Head>
        <title>JINHEELEE</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Dev Jin Introduction]</p>
        <p>
          (This is a website)
        </p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({id,date,title}) => (
            <li className={homeStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              
              <br/>
              <small className={homeStyles.lightText}>
                {date}
              </small>
            </li>
          ))}
          
        </ul>
      </section>
    </div>
  );
}

export default Home

export const getStaticProps: GetStaticProps =async () => {
  const allPostsData = getSortedPostsData();
  return {
    props:{
      allPostsData
    }
  }
}