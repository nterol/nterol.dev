import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';

type MultiItems = {
  __typename: string;
  id: string;
  content?: string | null | undefined;
}[];

export async function serializeContent(items: MultiItems) {
  return await Promise.all(
    items.map(async (item) => ({
      ...item,
      content: item.content
        ? await serialize(item.content, {
            parseFrontmatter: true,
            mdxOptions: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              rehypePlugins: [rehypeHighlight],
            },
          })
        : null,
    })),
  );
}
