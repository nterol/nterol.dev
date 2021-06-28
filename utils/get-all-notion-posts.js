import fetch from "isomorphic-fetch";

import { NOTION_WORKER_ROOT_URL } from "../env.config";

const getAllNotionPosts = async () =>
  fetch(`${NOTION_WORKER_ROOT_URL}/v1/table/${process.env.NOTION_ALL_POSTS_ID}`)
    .then((res) => res.json())
    .then((data) => data.filter((d) => d.published));

export default getAllNotionPosts;
