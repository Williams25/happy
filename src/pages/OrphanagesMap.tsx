import React from 'react';
import MapMarker from '../assets/icon/map.svg'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'
import '../styles/pages/orphanagesMap.css'
import 'leaflet/dist/leaflet.css'

const OrphanagesMap = (props: any) => {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={MapMarker} alt="Marcador mapa" />
          <h2>
            Escolha um orfanato no mapa
          </h2>
          <p>
            Muitas crianças estão esperado a sua visita :)
          </p>
        </header>
        <footer>
          <strong>Matão </strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        className="map"
        center={[-21.6119002,-48.3647899]}
        zoom={14}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_BOX_TOKEN}`} />
      </Map>

      <Link to="/" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap