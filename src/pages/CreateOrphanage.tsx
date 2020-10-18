import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { latLng, LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import mapMarkerImg from '../assets/icon/map.svg'
import Sidebar from '../components/Sidebar'
import '../styles/pages/create-orphanage.css';
import api from "../services/api";
import { useHistory } from "react-router-dom";

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {
  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpen_hours] = useState('')
  const [open_on_weekends, setOpen_on_weekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<String[]>([])

  const history = useHistory()

  const [latLong, setLatLong] = useState({
    latitude: 0,
    longitude: 0
  })

  const handleMapClick = (e: LeafletMouseEvent) => {
    const { lat, lng } = e.latlng
    setLatLong({
      latitude: lat,
      longitude: lng
    })
  }

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const selectImages = Array.from(e.target.files)
    setImages(selectImages)

    const selectImagesPreview = selectImages.map(image => {
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectImagesPreview)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const { latitude, longitude } = latLong
    console.log(
      latitude,
      longitude,
      name,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    )
    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))

    // enviando apesnas uma imagen por vez
    images.forEach(image => {
      data.append('images', image)
    })

    api.post('/orphanages', data).then(res => {
      history.push('/OrphanagesMap')
    }).catch(err => console.log(err))
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-21.6119002, -48.3647899]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAP_BOX_TOKEN}`} />

              {
                latLong.latitude && latLong.longitude !== 0 && (
                  <Marker interactive={false} icon={happyMapIcon} position={[latLong.latitude, latLong.longitude]} />
                )
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map(image => {
                    return (
                      <img key={String(image)} src={String(image)} alt="!" />
                    )
                  })
                }
                <label htmlFor="image[]" className="new-image" >
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple type="file" id="image[]" onChange={handleSelectImages} />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours"
                value={opening_hours}
                onChange={e => setOpen_hours(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpen_on_weekends(true)}
                >
                  Sim
              </button>
                <button type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpen_on_weekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
