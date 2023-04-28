function selectSongHandler(e) {
  const embedIFrame = document.querySelector("#embed-iframe");
  const songsBox = document.querySelector(".player");
  const target = e.currentTarget;
  const options = {
    width: "100%",
    height: "100%",
    uri: target.dataset.uri,
  };
  const callback = (EmbedController) => {
    document.querySelectorAll(".song").forEach((song) => {
      song.removeEventListener("click", selectSongHandler);
      song.addEventListener("click", () => {
        EmbedController.loadUri(song.dataset.uri);
      });
    });
  };
  SpotifyIframeApi.createController(embedIFrame, options, callback);
  songsBox.style.display = "block";
}

function searchHandler(e) {
  e.preventDefault();
  const form = e.target;
  const { track, artist } = serialize(form);
  searchForItems(track, artist);
}

const searchForm = document.querySelector(".search form");
searchForm.addEventListener("submit", searchHandler);
