"use strict";

function selectSongHandler(e) {
  const embedIFrame = document.querySelector("#embed-iframe");
  const songsBox = document.querySelector(".player");
  const target = e.currentTarget;
  const options = {
    width: "100%",
    height: "80px",
    uri: target.dataset.uri,
  };
  const callback = (EmbedController) => {
    document.querySelectorAll(".song").forEach((song) => {
      song.removeEventListener("click", selectSongHandler);
      song.addEventListener("click", () => {
        EmbedController.loadUri(song.dataset.uri);
        document.querySelector(".song.active").classList.remove("active");
        song.classList.add("active");
      });
    });
  };
  SpotifyIframeApi.createController(embedIFrame, options, callback);
  target.classList.add("active");
  songsBox.style.display = "block";
}

function searchHandler(e) {
  e.preventDefault();
  const form = e.target;
  const { track, artist } = serialize(form);
  searchForItems(track, artist, updateSongs);
}

function generateImagesHandler(e) {
  const song = document.querySelector(".songs .song.active");

  const { id } = song.dataset;
  getLyric(id)
    .then((result) => {
      const lyric = result.lines.map((line) => line.words).join(" ");
      getSummary(lyric)
        .then((result) => {
          document
            .querySelectorAll(".gallery .images img")
            .forEach((img) => img.remove());
          getImages(result.choices[0].text)
            .then((result) => updateImages(result.data))
            .catch((error) => console.log("error", error));
        })
        .catch((error) => console.log("error", error));
    })
    .catch((error) => console.log("error", error));
}
