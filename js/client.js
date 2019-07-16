"use strict";

const mediaStreamConstrains = {
  video: {
    frameRate: { min: 20 },
    width: { min: 640, ideal: 1280 },
    height: { min: 360, ideal: 720 },
    aspectRatio: 16 / 9
  },
  audio: {
    echoCancellation: true, // 开启回音消除
    noiseSuppression: true, // 开启降噪
    autoGainControl: true // 开启自动增益功能
  }
};

const localVideo = document.querySelector("video");

function gotLocalMediaStream(mediaStream) {
  localVideo.srcObject = mediaStream;
}

function handleLocalMediaStreamError(error) {
  console.log("navigator.getUserMedia error: ", error);
}

navigator.mediaDevices
  .getUserMedia(mediaStreamConstrains)
  .then(gotLocalMediaStream)
  .catch(handleLocalMediaStreamError);
