import React, { Component, useEffect, useState } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import { fetchToken, TokenSingleton } from '../../../services/auth';
import { musicApi } from '../../../services/music';
import { store } from '../../../store';

export default function Discover() {
  const stateToken = store.getState().token
  const [token, setToken] = useState(stateToken);
  const [newReleases, setNewReleases] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    if (!token) {
      fetchToken(setToken);
    }
  }, [])

  useEffect(() => {
    if (token) {
      musicApi(token).getNewReleases(setNewReleases)
      musicApi(token).getFeaturedPlaylist(setPlaylists)
      musicApi(token).getCategories(setCategories)
    }
  }, [token])

  return (
    <div className="discover">
      <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
      <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
      <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
    </div>
  )
}
