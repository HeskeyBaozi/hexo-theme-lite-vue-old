import {Moment} from "moment";

export interface ListPagination {
  total: number;
  pageSize: number;
  pageCount: number;
}

export interface PostListItem {
  "title": string,
  "slug": string,
  "date": Moment,
  "updated": Moment,
  "comments": boolean,
  "path": string,
  "excerpt": string | null,
  "keywords": string | null,
  "cover": string | null,
  "text": string,
  link: string,
  photos: string[],
  "content": string | null,
  "raw": string | null,
  "categories": any[],
  "tags": any[]
}

export interface TagItem {
  name: string,
  path: string,
  count: number
}

export interface CategoryItem {
  name: string,
  path: string,
  count: number
}

export interface Article {
  title: string,
  slug: string,
  date: string,
  updated: string,
  comments: boolean,
  path: string,
  excerpt: string | null,
  covers: string[] | null,
  content: string,
  categories: { name: string, path: string }[],
  tags: { name: string, path: string }[]
}
