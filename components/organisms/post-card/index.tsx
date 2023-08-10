import Link from "next/link";

import CardWrapper from "@components/atoms/card-wrapper";
import { IPost } from "@custom-types/posts";

import classes from "./post-card.module.css";

type Props = {
  post: IPost;
  color: string;
};

const PostCard = ({ post, color }: Props) => (
  <CardWrapper color={color}>
    <section className={classes.content}>
      <Link href={`/${post.slug}`}>
        <h3>{post.title}</h3>
        <p>{post.description}</p>
      </Link>
    </section>
    <div className={classes.action}>
      <button className={classes.logo_container}> &rarr; </button>
    </div>
  </CardWrapper>
);

export default PostCard;
