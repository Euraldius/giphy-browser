import { connect } from 'react-redux';
import App from '../components/App';
import actions from '../redux/actions';

const gifs = state => {
  const { searchGifs, trendingGifs } = state;

  return searchGifs.active ? searchGifs.gifs : trendingGifs.gifs;
};

const error = ({ trendingGifs, searchGifs }) => (
  searchGifs.error || trendingGifs.error
);

const isFetching = ({ trendingGifs, searchGifs }) => (
  searchGifs.isFetching || trendingGifs.isFetching
);

const gifListRefreshing = ({
  searchGifs: { active, isFetching, isNewSearch },
  trendingGifs: { refreshing },
}) => (
  (active && isFetching && isNewSearch) || refreshing
);

const allGifsLoaded = ({ searchGifs }) => (
  searchGifs.active && searchGifs.resultTotal === searchGifs.gifs.length
);

export const mapStateToProps = state => ({
  allGifsLoaded: allGifsLoaded(state),
  error: error(state),
  gifListRefreshing: gifListRefreshing(state),
  gifs: gifs(state),
  isFetching: isFetching(state),
  lastSearch: state.searchGifs.lastSearch,
  searchResultTotal: state.searchGifs.resultTotal,
  searching: state.searchGifs.active,
});

const { fetchTrendingGifs, searchForGifs, showTrendingGifs } = actions;
const mapDispatchToProps = {
  fetchTrendingGifs,
  searchForGifs,
  showTrendingGifs,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
