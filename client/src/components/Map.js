import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: props.lat, lng: props.long }}
      center={{ lat: props.lat, lng: props.long }}
    >
      {props.isMarkerShown && (
        <Marker
          shape="rectangle"
          position={{ lat: props.lat, lng: props.long }}
        />
      )}
    </GoogleMap>
  ))
);

export default MapComponent;
