import { connect } from 'react-redux';
import Search from '../components/Search';
import actions from '../redux/actions';

const mapStateToProps = ({ searchGifs: { searchTerm } }) => ({
  searchTerm,
});

const mapDispatchToProps = {
  onChange: actions.setSearchTerm,
  onSubmit: actions.searchForGifs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
