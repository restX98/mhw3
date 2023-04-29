"use strict";

function setCookie(cName, cValue, expireIn) {
  if (!cName || !cValue) throw new Error("Missing Parameters");
  let cookie = cName + "=" + cValue;
  if (!!expireIn) {
    cookie += ";max-age=" + expireIn;
  }
  cookie += ";path=/";
  document.cookie = cookie;
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    c.trim();
    if (c.indexOf(name) > -1) {
      return c.split("=")[1];
    }
  }
  return "";
}

function createSongItem(id, uri, trackName, artistName, durationTime, imgSrc) {
  const dataAttribute = {
    id: id,
    uri: uri,
  };
  const songItem = createDiv("song", dataAttribute);
  const img = createImg(imgSrc);

  const info = createDiv("info");
  const track = createSpan("track", trackName);
  const artist = createSpan("artist", artistName);
  info.appendChild(track);
  info.appendChild(artist);
  const duration = createSpan("duration", durationTime);
  songItem.appendChild(img);
  songItem.appendChild(info);
  songItem.appendChild(duration);

  return songItem;
}

function createDiv(className, dataAttributes) {
  const div = document.createElement("div");
  if (!!className) div.classList.add(className);
  if (!!dataAttributes) {
    for (const attr in dataAttributes) {
      div.dataset[attr] = dataAttributes[attr];
    }
  }
  return div;
}

function createSpan(className, text) {
  const span = document.createElement("span");
  if (!!className) span.classList.add(className);
  span.textContent = text;
  return span;
}

function createImg(imgSrc, className) {
  const img = document.createElement("img");
  if (!!className) img.classList.add(className);
  img.src = imgSrc;
  return img;
}

function serialize(form) {
  var formData = {};
  var inputs = form.elements;

  for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    var name = input.name;
    var value = input.value;

    if (name) {
      formData[name] = value;
    }
  }

  return formData;
}

function msToMin(ms) {
  let minutes = Math.floor(ms / 60000);
  let seconds = ((ms % 60000) / 1000).toFixed(0);
  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds
  );
}

function updateSongs(songs) {
  const songsBox = document.querySelector(".songs");
  document.querySelectorAll(".songs .song").forEach((song) => song.remove());
  songs.forEach((song) => {
    const { id, uri, name, artists, album } = song;
    const artist = artists.map((artist) => artist.name).join(", ");
    const duration = msToMin(song.duration_ms);
    const images = album.images;
    const image =
      images.find((image) => image.height === 64) || images[images.length - 1];
    songsBox.appendChild(
      createSongItem(id, uri, name, artist, duration, image.url)
    );
  });
  document.querySelectorAll(".songs .song").forEach((song) => {
    song.addEventListener("click", selectSongHandler);
  });
}

function updateImages(images) {
  const imagesBox = document.querySelector(".gallery .images");

  images.forEach((img) => {
    const imgEl = createImg(img.url);
    imagesBox.appendChild(imgEl);
  });
}
