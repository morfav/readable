import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui/svg-icons/communication/comment';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class Post extends Component {
  constructor() {
    super();

    this.sortByTime = this.sortByTime.bind(this);
    this.sortByScore = this.sortByScore.bind(this);
  }

  sortByTime = (e) => {
    e.stopPropagation();
    this.props.sortByTime();
  }

  sortByScore = (e) => {
    e.stopPropagation();
    this.props.sortByScore();
  }

  incrementVotes = (post, e) => {
    e.stopPropagation();
    this.props.incrementVotes(post);
  }

  decrementVotes = (post, e) => {
    e.stopPropagation();
    this.props.decrementVotes(post);
  }

  categoryClicked = (category, e) => {
    e.stopPropagation();
    this.props.categoryClicked(category);
  }

  render() {
    const { post, history } = this.props;
    return (
      <div className="Post">
        <Card
          onClick={() => history.push(`${post.category}/${post.id}`)}
        >
          <div
            style={{
              position: 'absolute',
              right: 24,
              zIndex: 1000,
            }}
          >
            <Badge
              badgeContent={post.commentCount}
              secondary
              badgeStyle={{ top: 12, right: 12 }}
            >
              <IconButton tooltip="Comments">
                <CommentIcon />
              </IconButton>
            </Badge>
          </div>
          <FlatButton
            label={new Date(post.timestamp).toDateString()}
            labelPosition="before"
            onClick={e => this.sortByTime(e)}
            style={{ width: 'auto' }}
            icon={<ArrowDropDown />}
          />
          <CardTitle
            title={post.title}
            subtitle={`by ${post.author}`}
          />
          <CardText>
            {post.body}
          </CardText>
          <div style={{ width: '100%', position: 'relative', paddingBottom: '8px' }}>
            <div style={{ paddingLeft: 12 }}>
              <CardActions style={{ display: 'inline-flex', verticalAlign: 'bottom' }}>
                <RaisedButton icon={<RemoveIcon />} style={{ float: 'left', minWidth: '48px' }} onClick={e => this.decrementVotes(post, e)} />
                <RaisedButton icon={<AddIcon />} style={{ float: 'left', minWidth: '48px', marginRight: 0 }} onClick={e => this.incrementVotes(post, e)} />
              </CardActions>
              <Badge
                badgeContent={post.voteScore}
                primary
                badgeStyle={{ top: 12, right: 12 }}
                style={{ paddingLeft: 0, paddingBottom: 0, verticalAlign: 'middle' }}
                onClick={e => this.sortByScore(e)}
              >
                <IconButton tooltip="Votes" iconStyle={{ display: 'inline-flex' }}>
                  <div>
                    <PlusOneIcon />
                    <ArrowDropDown />
                  </div>
                </IconButton>
              </Badge>
              <Link
                to={'test'}
              >
              <Chip
                style={{
                  margin: 4, right: 16, bottom: 16, position: 'absolute', display: 'inline-block',
                }}
                onClick={e => this.categoryClicked(post.category, e)}
              >
                #{post.category}
              </Chip>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(Post);
