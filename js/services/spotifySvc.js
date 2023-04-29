"use strict";

const { clientId, clientSecret } = SpotifyCredentials;

function onTokenJson(json, callback) {
  setCookie("spotifyToken", json.access_token, json.expires_in);
  callback();
}

function onTokenResponse(response) {
  return response.json();
}

function getToken(callback) {
  let token = getCookie("spotifyToken");
  if (token !== "") return token;

  const requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  };

  fetch("https://accounts.spotify.com/api/token", requestOptions)
    .then(onTokenResponse)
    .then((json) => onTokenJson(json, callback))
    .catch((reason) => console.log(reason));

  return null;
}

function searchForItems(track, artist, callback) {
  const token = getToken(() => searchForItems(track, artist, callback));
  if (!token) return;
  const requestOptions = {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const type = "track";
  const limit = 5;
  let q = "";
  q += !!track ? "track: " + track : "";
  q += !!artist ? " artist: " + artist : "";
  q = encodeURIComponent(q.trim());
  const uri = `https://api.spotify.com/v1/search/?q=${q}&type=${type}&limit=${limit}`;
  return fetch(uri, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const { items } = result.tracks;
      callback(items);
    });
}

function getLyric(trackId) {
  var requestOptions = {
    method: "get",
  };
  const uri = `https://spotify-lyric-api.herokuapp.com/?trackid=${trackId}`;

  fetch(uri, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      const lyric = result.lines.map((line) => line.words).join("\n");
      console.log(lyric);
    })
    .catch((error) => console.log("error", error));
}

window.onSpotifyIframeApiReady = (IFrameAPI) => {};
