import {connect} from 'react-redux';
import ParametersComponent from '../components/Parameters';
import {setMapRadius} from '../actions/index';

const mapStateToProps = (state) => ({
  mapRadius: state.mapRadius
});

const mapDispatchToProps = dispatch => {
  return {
    onMapRadiusChange: (event, data) => dispatch(setMapRadius(parseInt(data.value)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParametersComponent);