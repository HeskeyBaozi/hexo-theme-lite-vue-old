/**
 * @Doc https://hexo.io/zh-cn/docs/configuration.html
 */

export class Site {
  title = ''; // 网站标题
  subtitle = ''; // 网站副标题

  /**
   * 其中，description主要用于SEO，告诉搜索引擎一个关于您站点的简单描述，通常建议在其中包含您网站的关键词。author参数用于主题显示文章的作者。
   */
  description = ''; // 网站描述
  author = ''; // 您的名字
  language = ''; // 网站使用的语言
  timezone = ''; //网站时区。Hexo 默认使用您电脑的时区。时区列表。比如说：America/New_York, Japan, 和 UTC 。
}

export class URL {
  url = ''; // 网址
  root = ''; // 网站根目录
  permalink = ''; // 文章的 永久链接 格式
  permalink_defaults = ''; // 永久链接中各部分的默认值
}

export class Directory {
  source_dir = ''; // 资源文件夹，这个文件夹用来存放内容。
  public_dir = ''; // 公共文件夹，这个文件夹用于存放生成的站点文件。
  tag_dir = ''; // 标签文件夹
  archive_dir = ''; // 归档文件夹
  category_dir = ''; // 分类文件夹
  code_dir = ''; // Include code 文件夹
  i18n_dir = ''; // 国际化（i18n）文件夹
  skip_render = ''; // 跳过指定文件的渲染，您可使用 glob 表达式来匹配路径。
}

export class Writing {
  new_post_name = ''; // 新文章的文件名称
  default_layout = ''; // 预设布局
  titlecase = false; // 把标题转换为 title case
  filename_case = 0; // 把文件名称转换为 (1) 小写或 (2) 大写
  external_link = ''; // 在新标签中打开链接
  render_drafts = false; // 显示草稿
  post_asset_folder = false; // 启动 Asset 文件夹
  relative_link = false; // 把链接改为与根目录的相对位址
  future = true; // 显示未来的文章
  highlight: {
    enable: boolean,
    line_number: boolean,
    auto_detect: boolean,
    tab_replace: string
  } | null = null; // 代码块的设置

}

export class CategoryAndTags {
  default_category = ''; // 默认分类
  category_map = ''; // 分类别名
  tag_map = ''; // 标签别名
}

export class DateTimeFormat {
  date_format = ''; // 日期格式	YYYY-MM-DD
  time_format = ''; // 时间格式	H:mm:ss
}

export class Pagination {
  per_page = 0; // 每页显示的文章量 (0 = 关闭分页功能)
  pagination_dir = ''; // 分页目录
}

export class Extensions {
  theme: string | boolean = false; // 当前主题名称。值为false时禁用主题
  deploy = {}; // 部署部分的设置
}

export class Theme {
  menu = {};
  menu_icons = {
    enable: false
  };
  social = {};
  social_icons = {
    enable: false
  };

  avatar = {
    enable: false,
    url: ''
  };
}

