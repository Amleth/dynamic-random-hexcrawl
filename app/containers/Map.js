import {connect} from 'react-redux';
import MapComponent from '../components/Map';
import {exploreHex, inspectHex} from '../actions/index';

const mapStateToProps = (state) => ({
  mapRadius: state.mapRadius,
  hexes: state.hexes,
  inspectedHex: state.inspectedHex,
  newlyExploredHex: state.newlyExploredHex,
  reliefTypesAndWeights: state.reliefTypesAndWeights
});

const mapDispatchToProps = dispatch => {
  return {
    exploreHex: hexId => {
      return dispatch(exploreHex(hexId))
    },
    inspectHex: hexId => {
      return dispatch(inspectHex(hexId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);