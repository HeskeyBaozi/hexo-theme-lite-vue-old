export interface PostListItem {
  "title": string,
  "slug": string,
  "date": string,
  "updated": string,
  "comments": boolean,
  "path": string,
  "excerpt": null,
  "keywords": null,
  "cover": null,
  "content": null,
  "raw": null,
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
