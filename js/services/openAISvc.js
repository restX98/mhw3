"use strict";

const { apiKey } = OpenAICredentials;

function getSummary(lyric) {
  const raw = JSON.stringify({
    model: "text-davinci-003",
    prompt:
      "Summarize and formatting this song text for a image AI Generator: " +
      lyric,
    temperature: 0.7,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  var requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    body: raw,
  };
  const uri = "https://api.openai.com/v1/completions";

  return fetch(uri, requestOptions).then((response) => response.json());
}

function getImages(prompt) {
  prompt = prompt.replaceAll("\n", " ");

  var raw = JSON.stringify({
    prompt: prompt,
    n: 2,
    size: "512x512",
  });

  var requestOptions = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apiKey,
    },
    body: raw,
  };

  return fetch(
    "https://api.openai.com/v1/images/generations",
    requestOptions
  ).then((response) => response.json());
}
