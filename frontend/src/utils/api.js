const server = 'http://localhost:3001';
const requestHeaders = { Authorization: 'whatever-you-want', 'Content-Type': 'application/json', Accept: 'application/json' };


export function fetchCategories() {
  return fetch(`${server}/categories`, {
    headers: requestHeaders,
  })
    .then(res => res.json());
}

export function fetchPostById(postId) {
  return fetch(`${server}/posts/${postId}`, {
    headers: requestHeaders,
  })
    .then(res => res.json());
}

export function fetchAllPosts() {
  return fetch(`${server}/posts`, {
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

export function deletePostApi(postId) {
  return fetch(`${server}/posts/${postId}`, {
    method: 'DELETE',
    headers: requestHeaders,
  });
}

export function fetchPostsForCategoryApi(postCategory) {
  return fetch(`${server}/${postCategory}/posts`, {
    headers: requestHeaders,
  })
    .then(res => res.json());
}
