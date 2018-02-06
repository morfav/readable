import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import Badge from 'material-ui/Badge';
import { CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';

import { SCORE } from '../utils/PostsComparatorHelper';
import { DECREMENT_POST_VOTE, INCREMENT_POST_VOTE, SORT_BY_SCORE, suppressOnClick } from '../actions/';

const PostFooter = ({
  post, vote, sortPosts, getArrowIcon, categoryUrl, editPost, deletePost,
}) => {
  const icon = getArrowIcon(SCORE);
  return (
    <div style={{ width: '100%', position: 'relative', paddingBottom: '8px' }}>
      <div style={{ paddingLeft: 12 }}>
        <CardActions
          style={{ display: 'inline-flex', verticalAlign: 'bottom' }}
        >
          <FlatButton
            icon={<RemoveIcon />}
            style={{ float: 'left', minWidth: '48px' }}
            onClick={e => vote(DECREMENT_POST_VOTE, e)}
          />
          <FlatButton
            icon={<AddIcon />}
            style={{ float: 'left', minWidth: '48px', marginRight: 0 }}
            onClick={e => vote(INCREMENT_POST_VOTE, e)}
          />
        </CardActions>
        <Badge
          badgeContent={post.voteScore}
          primary
          badgeStyle={{ top: 12, right: 12 }}
          style={{ paddingLeft: 0, paddingBottom: 0, height: '50px' }}
          onClick={e => sortPosts(SORT_BY_SCORE, e)}
        >
          <IconButton
            tooltip="Votes"
            iconStyle={{ display: 'inline-flex' }}
          >
            <div>
              <PlusOneIcon />
              {icon}
            </div>
          </IconButton>
        </Badge>
        <IconButton
          tooltip="Edit Post"
          style={{ verticalAlign: 'bottom' }}
          onClick={e => editPost(post.id, e)}
        >
          <ModeEditIcon />
        </IconButton>
        <IconButton
          tooltip="Delete post"
          style={{ verticalAlign: 'bottom' }}
          onClick={e => deletePost(post.id, post.category, e)}
        >
          <Delete />
        </IconButton>
        <Link
          to={categoryUrl}
          href={categoryUrl}
          onClick={e => suppressOnClick(e)}
        >
          <Chip
            style={{
              margin: 4, right: 16, bottom: 16, position: 'absolute', display: 'inline-block', cursor: 'pointer',
            }}
          >
            #{post.category}
          </Chip>
        </Link>
      </div>
    </div>
  );
};

PostFooter.propTypes = {
  vote: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  }).isRequired,
  deletePost: PropTypes.func.isRequired,
  sortPosts: PropTypes.func.isRequired,
  getArrowIcon: PropTypes.func.isRequired,
  categoryUrl: PropTypes.string.isRequired,
  editPost: PropTypes.func.isRequired,
};

export default PostFooter;
