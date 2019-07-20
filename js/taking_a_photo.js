"use strict";

// 获取HTML页面中的video标签
var videoplay = document.querySelector("video#player");

// 播放视频流
function gotMediaStream(stream) {
  videoplay.srcObject = stream;
}

// 处理异常
function handleError(error) {
  console.log("getUserMedia error: ", error);
}

// 对采集的数据做一些限制
var constrains = {
  video: {
    width: 1280,
    height: 720,
    frameRate: 15
  },
  audio: false
};

// 采集视频数据流
navigator.mediaDevices
  .getUserMedia(constrains)
  .then(gotMediaStream)
  .catch(handleError);

// 获取图片
document.querySelector("button#TakePhoto").onclick = function() {
  // 获得HTML中的canvas标签，设置其宽高
  var photo = document.querySelector("canvas#Photo");
  photo.width = 640;
  photo.height = 480;

  // 获取下拉菜单select标签
  var filtersSelect = document.querySelector("select#filter");
  // 设置视频滤镜
  photo.className = filtersSelect.value;

  // 利用drawImage方法抓取视频流中当前正在显示的图片
  photo.getContext("2d").drawImage(videoplay, 0, 0, photo.width, photo.height);
};

// 保存图片
function downLoad(url) {
  var oA = document.createElement("a");

  // 设置下载的文件名，默认是“下载”
  oA.download = "photo";
  oA.href = url;
  document.body.appendChild(oA);
  oA.click();

  // 下载之后把创建的元素删除
  oA.remove();
}

document.querySelector("button#SavePhoto").onclick = function() {
  var canvas = document.querySelector("canvas");
  downLoad(canvas.toDataURL("image/jpeg"));
};
