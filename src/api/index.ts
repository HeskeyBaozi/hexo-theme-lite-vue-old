declare const require: (url: string) => any;

const apiPrefix: string = '.';

/**
 * Config
 */

// GET /api/site.json
export const fetchHexoConfig = async () => {
  return Promise.resolve(require(`${apiPrefix}/site.json`));
};


/**
 * Posts List
 */

// GET /api/posts.json
export const fetchPostsList = async () => {
  return Promise.resolve(require(`${apiPrefix}/posts.json`));
};

// GET /api/posts/:pageNum.json
export const fetchPostsListByPageNumber = async (currentPage: number) => {
  return Promise.resolve(require(`${apiPrefix}/posts/${currentPage}.json`));
};

// GET /api/tags/:TagName.json
export const fetchPostsListByTag = async (tagName: string) => {
  return Promise.resolve(require(`${apiPrefix}/tags/${tagName}.json`));
};

// GET /api/categories/:CategoriesName.json
export const fetchPostsListByCategory = async (categoryName: string) => {
  return Promise.resolve(require(`${apiPrefix}/categories/${categoryName}.json`));
};

/**
 * Post
 */

// GET /api/articles/:Slug.json
export const fetchPostBySlug = async (slug: string) => {
  return Promise.resolve(require(`${apiPrefix}/articles/${slug}.json`));
};


/**
 * Tags
 */

// GET /api/tags.json
export const fetchAllTags = async () => {
  return Promise.resolve(require(`${apiPrefix}/tags.json`));
};

/**
 * Categories
 */

// GET /api/categories.json
export const fetchAllCategories = async () => {
  return Promise.resolve(require(`${apiPrefix}/categories.json`));
};


/**
 * Implicit Pages
 */

// GET /api/pages/about.json
export const fetchImplicitPageByName = async (pageName: string) => {
  return Promise.resolve(require(`${apiPrefix}/pages/${pageName}.json`));
};
