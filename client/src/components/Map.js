import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDyVPWG-TwhFWw44FwHvdd0a_k2POUaUu8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.parameters.lat, lng: props.parameters.long }}>
    {props.parameters.longLat.map((item) => (
      <Marker position={{ lat: item.lat, lng: item.long }} />
    ))}
  </GoogleMap>
));

const enhance = _.identity;

const ReactGoogleMaps = (params) => [
  <MyMapComponent key="map" parameters={params} />
];

export default enhance(ReactGoogleMaps);