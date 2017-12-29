const server = 'http://localhost:3001';

export function fetchPosts(postId = null) {
  return fetch(`${server}/posts`,
    {
      headers: { 'Authorization': 'whatever-you-want' }
    })
  .then(res => res.json())
  .then((posts) => posts.map( post  => post));
}
