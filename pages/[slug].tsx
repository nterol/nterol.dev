import { getAllPosts } from "@utils/mdx/posts";

export async function getStaticProps({ params: { slug } }) {
  // const posts = await getAllPosts();
  // const articles = posts.filter((post) => post.type === "article");
  // console.log("🎟🎟🎟🎟", articles);
  // const post = articles.find((p) => p.slug === slug);
  // console.log("🎟", post);
  // const blocks = await fetch(
  //   `https://lambda-notion.grimmoire.workers.dev/v1/page/${post.id}`
  // ).then((res) => res.json());
  // console.log(blocks);
  // return {
  //   props: {
  //     post,
  //     blocks,
  //   },
  // };
}

export async function getStaticPaths() {
  const allPosts = getAllPosts(["slug"]);

  const allSlugs = allPosts.map(({ slug }) => `/${slug}`);
  return {
    paths: allSlugs,
    fallback: false,
  };
}

const PostPage = ({ blocks, post }) => {
  return <div>Needs Layout</div>;
};

export default PostPage;
