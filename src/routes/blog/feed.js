export const get = async requests => {
  const res = await fetch(`http://${requests.host}/blog.json?all=true`);
  const { posts } = await res.json();
  const body = render(posts);
  const headers = {
    'Content-Type': 'application/xml',
  };
  return {
    body,
    headers,
  };
};

const render = (posts) => 
`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">

<channel>
  <title>Kudadam Blog</title>
  <link>https://www.kudadam.com/blog</link>
<description>A place where I write about everthing tech related</description>
<category> Technology </category>
${posts
  .map(
    (post) => `
<item>
  <title>${post.title}</title>
  <link>https://www.davidwparker.com/posts/${post.slug}</link>
  <description>${post.description}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
</item>`
  )
  .join('')}
</channel>
</rss>
`;