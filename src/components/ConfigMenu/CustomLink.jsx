import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'evergreen-ui';

const CustomLink = ({ url, name }) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    marginLeft={5}
    marginRight={5}
    color="green"
  >
    {name}
  </Link>
);

CustomLink.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

export default CustomLink;
