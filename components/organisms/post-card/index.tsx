import Link from "next/link";

import CardWrapper from "@/components/atoms/card-wrapper";

import classes from "./post-card.module.css";
import { IPost } from "@/types/posts";

type Props = {
  post: IPost;
  color: string;
};

const PostCard = ({ post, color }: Props) => (
  <CardWrapper color={color}>
    <section className={classes.content}>
      <Link href={`/post/${post.slug}`}>
        <h3 className="font-bold text-xl">{post.title}</h3>
        <p>{post.description}</p>
      </Link>
    </section>
    <div className={classes.action}>
      <button className={classes.logo_container}> &rarr; </button>
    </div>
  </CardWrapper>
);

export default PostCard;
