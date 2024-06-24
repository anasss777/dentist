import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type Props = {
  lat: number;
  lng: number;
};

const Map = ({ lat, lng }: Props) => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: lat,
    lng: lng,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyD6EGMS3ZFzFd1Di5xBs8b71k_f241-nzs">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={18}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
