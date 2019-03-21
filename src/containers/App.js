import { connect } from 'react-redux';
import App from '../components/App';
import actions from '../redux/actions';

const gifs = state => {
  const { searchGifs, trendingGifs } = state;

  return searchGifs.active ? searchGifs.gifs : trendingGifs.gifs;
};

const error = ({ trendingGifs, searchGifs }) => (searchGifs.error || trendingGifs.error);
const isFetching = ({ trendingGifs, searchGifs }) => (searchGifs.isFetching || trendingGifs.isFetching);
const gifListRefreshing = ({ searchGifs: { active, isFetching, isNewSearch } }) => (
  active && isFetching && isNewSearch
);

export const mapStateToProps = state => ({
  error: error(state),
  gifListRefreshing: gifListRefreshing(state),
  gifs: gifs(state),
  isFetching: isFetching(state),
  searchResultTotal: state.searchGifs.resultTotal,
  searchTerm: state.searchGifs.searchTerm,
  searching: state.searchGifs.active,
});

const { fetchTrendingGifs, searchForGifs } = actions;
const mapDispatchToProps = { fetchTrendingGifs, searchForGifs };

export default connect(mapStateToProps, mapDispatchToProps)(App);
