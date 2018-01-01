import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const Categories = ({ categories, onClick }) => (
  <div>
    <Drawer>
      {categories.map(category =>
        <MenuItem key={category} onClick={() => onClick(category)}>{category}</MenuItem>)}
    </Drawer>
  </div>
);

export default Categories;
