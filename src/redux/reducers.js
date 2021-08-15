const DEFAULT_SETTINGS = { streams: {}, quality: "720p" }
export const videoQuality = (state = DEFAULT_SETTINGS, { type, data }) => {
  if (type === "set-streams") {
    return { ...state, streams: data, url: data[state.quality] }
  }
  if (type === "set-quality") {
    return { ...state, quality: data, url: state.streams[data] }
  }
  return state
}