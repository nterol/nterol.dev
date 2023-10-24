import { atom } from "jotai";

export type ViewerData = {
  url:string; 
  login: string; 
  name: string; 
  repository: { pushedAt: Date } 
}
export type ViewerQueryData = {data: {viewer:ViewerData }};


export const viewerDataAtom = atom<ViewerData | null>(null);