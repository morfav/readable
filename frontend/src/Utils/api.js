const server = 'http://localhost:3001';
const requestHeaders = { Authorization: 'whatever-you-want', 'Content-Type': 'application/json', Accept: 'application/json' };


export function fetchCategories() {
  return fetch(`${server}/categories`, {
    headers: requestHeaders,
  })
    .then(res => res.json());
}

export function fetchPosts(postId = null) {
  return fetch(`${server}/posts${postId ? `/${postId}` : ''}`, {
    headers: requestHeaders,
  })
    .then(res => res.json());
}

export function fetchCommentsForPost(postId) {
  return fetch(`${server}/posts/${postId}/comments`, {
    headers: requestHeaders,
  })
    .then(res => res.json());
}

export function commentVoteApi(commentId, type) {
  return fetch(`${server}/comments/${commentId}`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      option: type,
    }),
  });
}

export function updateCommentApi(commentId, commentBody) {
  return fetch(`${server}/comments/${commentId}`, {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify({
      timestamp: Date.now(),
      body: commentBody,
    }),
  });
}

export function createCommentApi(commentId, commentBody, parentId) {
  return fetch(`${server}/comments`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      id: commentId,
      timestamp: Date.now(),
      body: commentBody,
      author: requestHeaders.Authorization,
      parentId,
    }),
  });
}

export function deleteCommentApi(commentId) {
  return fetch(`${server}/comments/${commentId}`, {
    method: 'DELETE',
    headers: requestHeaders,
  });
}

export function postVoteApi(postId, type) {
  return fetch(`${server}/posts/${postId}`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      option: type,
    }),
  });
}

export function createPostApi(postId, postTitle, postBody, postCategory) {
  return fetch(`${server}/posts`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      id: postId,
      timestamp: Date.now(),
      title: postTitle,
      body: postBody,
      author: requestHeaders.Authorization,
      category: postCategory,
    }),
  });
}

export function updatePostApi(postId, postTitle, postBody) {
  return fetch(`${server}/posts/${postId}`, {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify({
      title: postTitle,
      body: postBody,
    }),
  });
}

/**
 | `GET /:category/posts` | Get all of the posts for a particular category. |  |
 | `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | |
 | `GET /comments/:id` | Get the details for a single comment. | |
 */
