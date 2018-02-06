import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const Categories = ({ categories, selectedCategories, categoryUrl }) => (
  <div>
    <Drawer>
      {categories.map(category => (
        <Link
          key={category.path}
          href={`/${categoryUrl(category.name)}`}
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

Categories.propTypes = {
  categories: PropTypes.arrayOf(String).isRequired,
  selectedCategories: PropTypes.arrayOf(String).isRequired,
  categoryUrl: PropTypes.func.isRequired,
};

export default Categories;
