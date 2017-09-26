import {connect} from 'react-redux';
import {exploreHex, exploreMap, inspectHex, requestReliefStats, resetMap} from '../actions/index';
import MapComponent from '../components/Map';

const mapStateToProps = (state) => ({
  mapRadius: state.mapRadius,
  hexes: state.hexes,
  hoveredHex: state.hoveredHex,
  inspectedHex: state.inspectedHex,
  newlyExploredHex: state.newlyExploredHex,
  reliefTypesAndWeights: state.reliefTypesAndWeights
});

const mapDispatchToProps = dispatch => {
  return {
    exploreHex: hex => dispatch(exploreHex(hex)),
    exploreMap: () => dispatch(exploreMap()),
    inspectHex: hex => dispatch(inspectHex(hex)),
    requestReliefStats: hex => dispatch(requestReliefStats(hex)),
    resetMap: () => dispatch(resetMap())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);