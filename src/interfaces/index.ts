import {Moment} from "moment";

export interface ListPagination {
  total: number;
  pageSize: number;
  pageCount: number;
}

export interface BasicPost {
  title: string,
  slug: string,
  date: Moment,
  updated: Moment,
  comments: boolean,
  path: string,
  excerpt: string | null,
  categories: BasicItem[],
  tags: BasicItem[],
  photos: string[],
  link: string
}

export interface PostListItem extends BasicPost {
  keywords: string | null,
  cover: string | null,
  text: string,
  content: string | null,
  raw: string | null,
}

export interface Article extends BasicPost {
  covers: string[] | null,
  content: string,
}

export interface BasicItem {
  name: string,
  path: string
}

export interface TagItem extends BasicItem {
  count: number
}

export interface CategoryItem extends BasicItem {
  count: number
}


