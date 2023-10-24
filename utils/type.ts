import { type MDXRemoteSerializeResult } from 'next-mdx-remote';

export type UncertainMDX = MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>> | null;
