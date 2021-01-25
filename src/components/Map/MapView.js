import React from 'react';
import './Map.css';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView() {
    return (
        <div className='main-map-container'>
            <LeafletMap>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='http://osm.org/copyright'>
                OpenStreetMap</a> contributors"/>
            </LeafletMap>
        </div>
    )
}

export default MapView;
