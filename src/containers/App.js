import { connect } from 'react-redux';
import App from '../components/App';
import { fetchTrendingGifs, loadMoreGifs } from '../redux/actions';
import { SEARCHING } from '../constants';

export const mapStateToProps = ({ app: {
  currentSearch,
  error,
  gifs,
  isFetching,
  mode,
  resultTotal,
} }) => ({
  enableInfiniteScroll: !isFetching && gifs.length > 0 && gifs.length < resultTotal,
  error,
  emptySearch: mode === SEARCHING && resultTotal === 0,
  gifs,
  currentSearch,
  resultTotal,
  searching: mode === SEARCHING,
});

const mapDispatchToProps = {
  fetchTrendingGifs,
  loadMoreGifs,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
