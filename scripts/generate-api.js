/**
 * Mostly use the hexo-generator-restful,
 * adding the photos fields and other useful stuffs.
 */

'use strict';

const pagination = require('hexo-pagination');

// const _pick = require('lodash.pick');

function filterHTMLTags(str) {
  return str ? str
    .replace(/\<(?!img|br).*?\>/g, "")
    .replace(/\r?\n|\r/g, '')
    .replace(/<img(.*)>/g, ' [Figure] ') : null
}

function fetchCovers(str) {
  let temp,
    imgURLs = [],
    rex = /<img[^>]+src="?([^"\s]+)"(.*)>/g;
  while (temp = rex.exec(str)) {
    imgURLs.push(temp[1]);
  }
  return imgURLs.length > 0 ? imgURLs : null;
}

function fetchCover(str) {
  const covers = fetchCovers(str);
  return covers ? covers[0] : null;
}

function generator(cfg, site) {

  let restful = {
      site: true,
      posts_size: cfg.per_page || 10,
      posts_props: {
        title: true,
        slug: true,
        date: true,
        updated: true,
        comments: true,
        cover: true,
        path: true,
        photos: true,
        text: true,
        raw: false,
        link: true,
        excerpt: false,
        content: false,
        categories: true,
        tags: true
      },
      categories: true,
      tags: true,
      post: true,
      pages: true,
    },

    posts = site.posts.sort('-date').filter(function (post) {
      return post.published;
    }),

    posts_props = (function () {
      const props = restful.posts_props;

      return function (name, val) {
        return props[name] ? (typeof val === 'function' ? val() : val) : null;
      }
    })(),

    postMap = function (post) {
      return {
        title: posts_props('title', post.title),
        slug: posts_props('slug', post.slug),
        date: posts_props('date', post.date),
        updated: posts_props('updated', post.updated),
        comments: posts_props('comments', post.comments),
        path: posts_props('path', 'api/articles/' + post.slug + '.json'),
        excerpt: posts_props('excerpt', filterHTMLTags(post.excerpt)),
        keywords: posts_props('keywords', cfg.keywords),
        cover: posts_props('cover', fetchCover(post.content)),
        content: posts_props('content', post.content),
        text: posts_props('text', filterHTMLTags(post.content).substring(0, 140)),
        link: posts_props('link', post.link),
        raw: posts_props('raw', post.raw),
        photos: posts_props('photos', post.photos),
        categories: posts_props('categories', function () {
          return post.categories.map(function (cat) {
            return {
              name: cat.name,
              path: 'api/categories/' + cat.name + '.json'
            };
          });
        }),
        tags: posts_props('tags', function () {
          return post.tags.map(function (tag) {
            return {
              name: tag.name,
              path: 'api/tags/' + tag.name + '.json'
            };
          });
        })
      };
    },

    cateReduce = function (cates, name) {
      return cates.reduce(function (result, item) {
        if (!item.length) return result;

        return result.concat(pagination(item.path, posts, {
          perPage: 0,
          data: {
            name: item.name,
            path: 'api/' + name + '/' + item.name + '.json',
            postlist: item.posts.map(postMap)
          }

        }));
      }, []);
    },

    catesMap = function (item) {
      return {
        name: item.data.name,
        path: item.data.path,
        count: item.data.postlist.length
      };
    },

    cateMap = function (item) {
      const itemData = item.data;
      return {
        path: itemData.path,
        data: JSON.stringify({
          name: itemData.name,
          postlist: itemData.postlist
        })
      };
    },

    apiData = [];


  if (restful.site) {
    apiData.push({
      path: 'api/site.json',
      data: JSON.stringify(/*restful.site instanceof Array ? _pick(cfg, restful.site) :*/ cfg)
    });
  }

  if (restful.categories) {

    const cates = cateReduce(site.categories, 'categories');

    if (!!cates.length) {
      apiData.push({
        path: 'api/categories.json',
        data: JSON.stringify(cates.map(catesMap))
      });

      apiData = apiData.concat(cates.map(cateMap));
    }

  }

  if (restful.tags) {
    const tags = cateReduce(site.tags, 'tags');

    if (tags.length) {
      apiData.push({
        path: 'api/tags.json',
        data: JSON.stringify(tags.map(catesMap))
      });

      apiData = apiData.concat(tags.map(cateMap));
    }

  }

  const postlist = posts.map(postMap);

  if (restful.posts_size > 0) {

    const page_posts = [],
      len = postlist.length,
      ps = restful.posts_size,
      pc = Math.ceil(len / ps);

    for (let i = 0; i < len; i += ps) {
      page_posts.push({
        path: 'api/posts/' + Math.ceil((i + 1) / ps) + '.json',
        data: JSON.stringify({
          total: len,
          pageSize: ps,
          pageCount: pc,
          data: postlist.slice(i, i + ps)
        })
      });
    }

    apiData.push({
      path: 'api/posts.json',
      data: page_posts[0].data
    });

    apiData = apiData.concat(page_posts);

  } else {

    apiData.push({
      path: 'api/posts.json',
      data: JSON.stringify(postlist)
    });
  }

  if (restful.post) {
    apiData = apiData.concat(posts.map(function (post) {
      const path = 'api/articles/' + post.slug + '.json';
      return {
        path: path,
        data: JSON.stringify({
          title: post.title,
          slug: post.slug,
          date: post.date,
          updated: post.updated,
          comments: post.comments,
          path: path,
          photos: post.photos,
          link: post.link,
          excerpt: filterHTMLTags(post.excerpt),
          covers: fetchCovers(post.content),
          keywords: cfg.keyword,
          content: post.content,
          categories: post.categories.map(function (cat) {
            return {
              name: cat.name,
              path: 'api/categories/' + cat.name + '.json'
            };
          }),
          tags: post.tags.map(function (tag) {
            return {
              name: tag.name,
              path: 'api/tags/' + tag.name + '.json'
            };
          })
        })
      };
    }));
  }

  if (restful.pages) {
    apiData = apiData.concat(site.pages.data.map(function (page) {
      const safe_title = page.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      const path = 'api/pages/' + safe_title + '.json';

      return {
        path: path,
        data: JSON.stringify({
          title: page.title,
          date: page.date,
          updated: page.updated,
          comments: page.comments,
          path: path,
          covers: fetchCovers(page.content),
          excerpt: filterHTMLTags(page.excerpt),
          content: page.content
        })
      };
    }));
  }

  return apiData;
}

hexo.extend.generator.register('liteRestfulApi', function (site) {
  return generator(Object.assign({}, hexo.config, hexo.theme.config), site);
});