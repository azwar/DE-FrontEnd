import apiClient from "./client";

export const musicApi = (token) => {
  const client = apiClient(token)
  const browse = (data) => client.get(`/browse/${data}`)

  const getNewReleases = async (setter) => {
    const resp = await browse('new-releases')
    setter(resp?.data?.albums?.items);
  }
  
  const getFeaturedPlaylist = async (setter) => {
    const resp = await browse('featured-playlists')
    setter(resp?.data?.playlists?.items)
  }

  const getCategories = async (setter) => {
    const resp = await browse('categories')
    setter(resp?.data?.categories?.items)
  }

  return {
    getNewReleases,
    getFeaturedPlaylist,
    getCategories
  }
}


