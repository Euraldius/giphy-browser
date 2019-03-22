import { connect } from 'react-redux';
import Search from '../components/Search';
import { searchForGifs, setSearchTerm } from '../redux/actions';

const mapStateToProps = ({ searchForm: { searchTerm } }) => ({
  searchTerm,
});

const mapDispatchToProps = {
  onChange: setSearchTerm,
  onSubmit: searchForGifs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
