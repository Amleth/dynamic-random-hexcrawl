import {connect} from 'react-redux';
import MapComponent from '../components/Map';
import {exploreHex, exploreMap, inspectHex, resetMap} from '../actions/index';

const mapStateToProps = (state) => ({
  mapRadius: state.mapRadius,
  hexes: state.hexes,
  inspectedHex: state.inspectedHex,
  newlyExploredHex: state.newlyExploredHex,
  reliefTypesAndWeights: state.reliefTypesAndWeights
});

const mapDispatchToProps = dispatch => {
  return {
    exploreHex: hexId => dispatch(exploreHex(hexId)),
    exploreMap: () => dispatch(exploreMap()),
    inspectHex: hexId => dispatch(inspectHex(hexId)),
    resetMap: () => dispatch(resetMap())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);