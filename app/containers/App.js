import {connect} from 'react-redux';
import AppComponent from '../components/App';
import {exploreMap, resetMap} from '../actions/index';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => {
  return {
    exploreMap: () => dispatch(exploreMap()),
    resetMap: () => dispatch(resetMap())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);