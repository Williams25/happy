import React, { useState, useEffect } from 'react';
import MapMarker from '../assets/icon/map.svg'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIcon from '../assets/icon/map.svg'
import Leaflet from 'leaflet'
import '../styles/pages/orphanagesMap.css'
import 'leaflet/dist/leaflet.css'
import api from '../services/api';

const mapIcon = Leaflet.icon({
  iconUrl: markerIcon,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [179, 0]
})

interface Orphanage {
  id: number,
  latitude: number,
  longitude: number,
  name: string
}

const OrphanagesMap = (props: any) => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  const handleOrphanages = async () => {
    api.get('orphanages').then(res => {
      console.log(res.data)
      setOrphanages(res.data)
    }).catch(err => console.log(err))
  }

  useEffect(() => {
    handleOrphanages()
  }, [])

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
        center={[-21.6119002, -48.3647899]}
        zoom={14}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_BOX_TOKEN}`} />

        {
          orphanages.map(orphanage => {
            return (
              <Marker
                key={orphanage.id}
                position={[orphanage.latitude, orphanage.longitude]}
                icon={mapIcon}
              >
                <Popup
                  closeButton={false}
                  maxWidth={250}
                  minWidth={250}
                  className="map-popup"
                >
                  {orphanage.name}

                  <Link to={`/Orphanage/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#fff" />
                  </Link>
                </Popup>
              </Marker>
            )
          })
        }

      </Map>

      <Link to="/CreateOrphanage" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  )
}

export default OrphanagesMap