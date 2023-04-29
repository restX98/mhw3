"use strict";

function selectSongHandler(e) {
  const embedIFrame = document.querySelector(".embed-iframe");
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
  spinner("Stiamo recuperando il testo della canzone...");
  getLyric(id)
    .then((result) => {
      if (result.error) {
        throw new Error(
          result.message || "Lyrics for this track is not available on spotify!"
        );
      }
      const lyric = result.lines.map((line) => line.words).join(" ");
      spinner("Stiamo riassumento il testo della canzone...");
      getSummary(lyric)
        .then((result) => {
          if (result.error) {
            throw new Error(
              "Non è stato possibile creare il riassunto perché:" +
                result.error.message
            );
          }
          document
            .querySelectorAll(".gallery .images img")
            .forEach((img) => img.remove());
          spinner("Stiamo creando le immagini...");
          if (!result.choices || result.choices.length === 0)
            throw new Error("Non è stato possibile creare il riassunto!");
          getImages(result.choices[0].text)
            .then((result) => {
              if (result.error) {
                throw new Error(result.error.message);
              }
              spinner("", true);
              updateImages(result.data);
            })
            .catch((response) => errorHandler(response.message));
        })
        .catch((response) => errorHandler(response.message));
    })
    .catch((response) => errorHandler(response.message));
}
