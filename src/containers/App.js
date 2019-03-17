import { connect } from 'react-redux';
import App from '../components/App';
import { fetchTrendingGifs } from '../redux/actions';


const mapStateToProps = ({ trendingGifs: { error, gifs, isFetching } }) => ({
  gifs, error, isFetching
});

const mapDispatchToProps = { fetchTrendingGifs };

export default connect(mapStateToProps, mapDispatchToProps)(App);
