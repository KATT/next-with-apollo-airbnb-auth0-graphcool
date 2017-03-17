import { PropTypes } from 'react';
import Loading from './Loading';

function ShowMore({ loading, loadMore }) {
  if (loading) {
    return <Loading />;
  }
  return <button onClick={() => loadMore()}>Show More</button>;
}

ShowMore.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default ShowMore;
