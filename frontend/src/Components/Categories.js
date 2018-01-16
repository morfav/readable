import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Categories = ({ categories, selectedCategories, categoryUrl }) => (
  <div>
    <Drawer>
      {categories.map(category => (
        <Link
          key={category.path}
          to={`/${categoryUrl(category.name)}`}
          style={{
            textDecoration: 'none',
          }}
        >
          <MenuItem
            key={category.path}
            checked={selectedCategories.includes(category.name)}
          >
            {category.name}
          </MenuItem>
        </Link>
        ))}
    </Drawer>
  </div>
);

export default Categories;
