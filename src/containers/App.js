import { connect } from 'react-redux';
import App from '../components/App';
import actions from '../redux/actions';

const gifs = state => {
  const { searchGifs, trendingGifs } = state;

  return searchGifs.active ? searchGifs.gifs : trendingGifs.gifs;
};

const error = ({ trendingGifs, searchGifs }) => (searchGifs.error || trendingGifs.error);
const isFetching = ({ trendingGifs, searchGifs }) => (searchGifs.isFetching || trendingGifs.isFetching);

export const mapStateToProps = state => ({
  gifs: gifs(state),
  error: error(state),
  isFetching: isFetching(state),
  searching: state.searchGifs.active,
  searchTerm: state.searchGifs.searchTerm,
});

const { fetchTrendingGifs, searchForGifs } = actions;
const mapDispatchToProps = { fetchTrendingGifs, searchForGifs };

export default connect(mapStateToProps, mapDispatchToProps)(App);
