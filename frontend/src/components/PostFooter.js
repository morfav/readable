import React from 'react';
import { Link } from 'react-router-dom';

import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';

import Badge from 'material-ui/Badge';
import { CardActions } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';

import RaisedButton from 'material-ui/RaisedButton';

import { SCORE } from '../utils/PostsComparatorHelper';

const PostFooter = ({ post, incrementVoteNoClickPropagation, decrementVoteNoClickPropagation, categoryClicked, sortByScoreNoPropagation, getArrowIcon }) => {
  const icon = getArrowIcon(SCORE);
  return (
    <div style={{ width: '100%', position: 'relative', paddingBottom: '8px' }}>
      <div style={{ paddingLeft: 12 }}>
        <CardActions style={{ display: 'inline-flex', verticalAlign: 'bottom' }}>
          <RaisedButton icon={<RemoveIcon />} style={{ float: 'left', minWidth: '48px' }} onClick={e => decrementVoteNoClickPropagation(e)} />
          <RaisedButton icon={<AddIcon />} style={{ float: 'left', minWidth: '48px', marginRight: 0 }} onClick={e => incrementVoteNoClickPropagation(e)} />
        </CardActions>
        <Badge
          badgeContent={post.voteScore}
          primary
          badgeStyle={{ top: 12, right: 12 }}
          style={{ paddingLeft: 0, paddingBottom: 0, verticalAlign: 'middle' }}
          onClick={e => sortByScoreNoPropagation(e)}
        >
          <IconButton tooltip="Votes" iconStyle={{ display: 'inline-flex' }}>
            <div>
              <PlusOneIcon />
              {icon}
            </div>
          </IconButton>
        </Badge>
        <Link
          to='test'
        >
          <Chip
            style={{
              margin: 4, right: 16, bottom: 16, position: 'absolute', display: 'inline-block',
            }}
            onClick={e => categoryClicked(post.category, e)}
          >
            #{post.category}
          </Chip>
        </Link>
      </div>
    </div>
  );
};

export default PostFooter;
