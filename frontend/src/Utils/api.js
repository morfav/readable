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

export function postCommentVote(commentId, type) {
  return fetch(`${server}/comments/${commentId}`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      option: type,
    }),
  });
}

export function putUpdateComment(commentId, commentBody) {
  return fetch(`${server}/comments/${commentId}`, {
    method: 'PUT',
    headers: requestHeaders,
    body: JSON.stringify({
      timestamp: new Date(),
      body: commentBody,
    }),
  });
}

export function postCreateComment(commentId, commentBody, parentId) {
  return fetch(`${server}/comments`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({
      id: commentId,
      timestamp: new Date(),
      body: commentBody,
      author: requestHeaders.Authorization,
      parentId,
    }),
  });
}


/**
 | `GET /categories` | Get all of the categories available for the app. List is found in `categories.js`. Feel free to extend this list as you desire. |  |
 | `GET /:category/posts` | Get all of the posts for a particular category. |  |
 | `GET /posts` | Get all of the posts. Useful for the main page when no category is selected. |  |
 | `POST /posts` | Add a new post. | **id** - UUID should be fine, but any unique id will work <br> **timestamp** - [Timestamp] Can in whatever format you like, you can use `Date.now()` if you like. <br> **title** - [String] <br> **body** - [String] <br> **author** - [String] <br> **category** -  Any of the categories listed in `categories.js`. Feel free to extend this list as you desire. |
 | `GET /posts/:id` | Get the details of a single post. | |
 | `POST /posts/:id` | Used for voting on a post. | **option** - [String]: Either `"upVote"` or `"downVote"`. |
 | `PUT /posts/:id` | Edit the details of an existing post. | **title** - [String] <br> **body** - [String] |
 | `DELETE /posts/:id` | Sets the deleted flag for a post to 'true'. <br> Sets the parentDeleted flag for all child comments to 'true'. | |
 | `GET /posts/:id/comments` | Get all the comments for a single post. | |
 | `POST /comments` | Add a comment to a post. | **id** - Any unique ID. As with posts, UUID is probably the best here. 
 <br> **timestamp** - [Timestamp] Get this however you want. 
 <br> **body** - [String] <br> **author** - [String] <br> **parentId** - Should match a post id in the database. |
 | `GET /comments/:id` | Get the details for a single comment. | |
 | `PUT /comments/:id` | Edit the details of an existing comment. | **timestamp** - timestamp. Get this however you want. <br> **body** - [String] |
 | `DELETE /comments/:id` | Sets a comment's deleted flag to `true`.
 */
