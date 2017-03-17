import { PropTypes } from 'react';

const { shape, string, object } = PropTypes;

export const url = shape({
  pathname: string.isRequired,
  query: object.isRequired,
});

const propTypes = {
  url: url.isRequired,
};

export default propTypes;
