declare const require: (url: string) => any;

import axios from 'axios';

const prefix: string = '/api';

/**
 * Config
 */

// GET /api/site.json
export const fetchHexoConfig = async () => {
  return axios.get(prefix + '/site.json');
};


/**
 * Posts List
 */

// GET /api/posts.json
export const fetchPostsList = async () => {
  return axios.get(prefix + '/posts.json');
};

// GET /api/posts/:pageNum.json
export const fetchPostsListByPageNumber = async (currentPage: number) => {
  return axios.get(prefix + `/posts/${currentPage}.json`);
};

// GET /api/tags/:TagName.json
export const fetchPostsListByTag = async (tagName: string) => {
  return axios.get(prefix + `/tags/${tagName}.json`);
};

// GET /api/categories/:CategoriesName.json
export const fetchPostsListByCategory = async (categoryName: string) => {
  return axios.get(prefix + `/categories/${categoryName}.json`);
};

/**
 * Post
 */

// GET /api/articles/:Slug.json
export const fetchPostBySlug = async (slug: string) => {
  return axios.get(prefix + `/articles/${slug}.json`);
};


/**
 * Tags
 */

// GET /api/tags.json
export const fetchAllTags = async () => {
  return axios.get(prefix + '/tags.json');
};

/**
 * Categories
 */

// GET /api/categories.json
export const fetchAllCategories = async () => {
  return axios.get(prefix + '/categories.json');
};


/**
 * Implicit Pages
 */

// GET /api/pages/about.json
export const fetchImplicitPageByName = async (pageName: string) => {
  return axios.get(prefix + `/pages/${pageName}.json`);
};
