import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import Card from "../../components/ui/Card";
import { getAllPostIds, getPostData } from "../../lib/postsService";

export default function PostDetailPage({ postData }) {
  console.log("postData", postData);

  const withoutContent = <p>Shit, maaannn...</p>;

  if (!postData) return withoutContent;
  const withContent = (
    <Fragment>
      <Head>
        <title>{postData.title}</title>
        <meta name="description" content={postData.excerpt} />
      </Head>
      <Card>
        {postData.title}
        <br />
        {postData.date}
        <br />
        <div style={{ position: "relative", height: "300px" }}>
          <Image
            src={postData.cover_image}
            alt={postData.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* <div>{postData.contentHtml}</div> */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Card>
    </Fragment>
  );

  return withContent;
}

export function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    fallback: false,
    paths
    // paths: [
    //   {
    //     params: { postId: "aaa" }
    //   }
    // ]
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.postId);
  return {
    props: {
      postData
    }
  };
}
