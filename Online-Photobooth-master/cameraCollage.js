let width = 800
let height = 0

let streaming = false

let video = null
let canvasPhoto = null
let startButton = null
let startMixingButton = null
let BeerMe = null
let Glasses = null
let FunHat = null
let BigBurger = null
let BreadBuddy = null
let CatEyes = null

let db = null
let returnButton = null

let photo = null

let cameraContentarea = null
let canvasMixArea = null

let canvas = null


function startUp() {
  cameraContentarea = document.querySelector('#cameraContentarea')
  canvasMixArea = document.querySelector('#canvasMixArea')
  cameraContentarea.className = 'displayBlock'
  canvasMixArea.className = 'displayNone'

  video = document.querySelector('#video')
  canvasPhoto = document.querySelector('#canvasPhoto')
  photo = document.querySelector('#photo')
  startButton = document.querySelector('#startButton')
  BeerMe = document.querySelector('#BeerMe')
  Glasses = document.querySelector('#Glasses')
  FunHat = document.querySelector('#FunHat')
  BigBurger = document.querySelector('#BigBurger')
  BreadBuddy = document.querySelector('#BreadBuddy')
  CatEyes = document.querySelector('#CatEyes')
  db = document.querySelector('#downloadButton')
  returnButton = document.querySelector('#returnButton')
  startMixingButton = document.querySelector('#startMixingButton')

  canvas = new fabric.Canvas('c')

  startButton.addEventListener('click', takePicture, false)
  startMixingButton.addEventListener('click', startMixingFunction, false)
  downloadButton.addEventListener('click', saveImage, false)
  returnButton.addEventListener('click', returnFunction, false)
  BeerMe.addEventListener('click', placeImage, false)
  Glasses.addEventListener('click', placeImage, false)
  FunHat.addEventListener('click', placeImage, false)
  BigBurger.addEventListener('click', placeImage, false)
  BreadBuddy.addEventListener('click', placeImage, false)
  CatEyes.addEventListener('click', placeImage, false)

  video.addEventListener('click', function() {
    video.play()
  }, false)

  navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    .then(function(stream) {
      video.srcObject = stream
      video.play()
    })
    .catch(function(err) {
      console.log("An error has happened: " + err)
    })

  video.addEventListener('canplay', function(e) {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width)

      if (isNaN(height)) {
        height = width / (4 / 3)
      }
      video.setAttribute('width', width)
      video.setAttribute('height', height)
      canvasPhoto.setAttribute('width', width)
      canvasPhoto.setAttribute('height', height)

      streaming = true
    }
  }, false)


  clearPhoto()


} //end startUp

function clearPhoto() {
  let ctx = canvasPhoto.getContext('2d')
  ctx.fillStyle = "#B39C47"
  ctx.fillRect(0, 0, canvasPhoto.width, canvasPhoto.height)
  let data = canvasPhoto.toDataURL('image/png')
  photo.setAttribute('src', data)
} //end clearPhoto


function takePicture() {
  let ctx = canvasPhoto.getContext('2d')
  if (width && height) {
    canvasPhoto.width = width
    canvasPhoto.height = height
    ctx.drawImage(video, 0, 0, width, height)

    let data = canvasPhoto.toDataURL('image/png')
    photo.setAttribute('src', data)
  } else {
    clearPhoto()
  }

} //end takePicture

/////////////////end camera
/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


function startMixingFunction() {
  cameraContentarea.className = 'displayNone'
  canvasMixArea.className = 'displayBlock'

  let webcamPicture = document.querySelector('#photo')
  let webcamPictureSrc = webcamPicture.getAttribute('src')
  fabric.Image.fromURL(webcamPictureSrc, function(wImg){
    wImg.set({
      left: 50,
      top: 50
    })
    canvas.add(wImg)
  })

  // fabric.Image.fromURL('images/horns.png', function(hImg){
  //   hImg.set({
  //     left: Math.random() = 600 + 100,
  //     top: Math.random() = 400 + 100,
  //   })
  //   canvas.add(hImg)
  // })
} //end startMixingFuction

function saveImage(e) {
  e.target.download = 'myImage.png'
  e.target.href = canvas.toDataURL('image/png')


} //end saveImage
function returnFunction() {
  cameraContentarea.className = 'displayBlock'
  canvasMixArea.className = 'displayNone'
  canvas.clear()
  clearPhoto()


} //end returnFuction
function placeImage(e) {
  console.log(e.currentTarget.getAttribute('src'));
  let newImg = e.currentTarget.getAttribute('src')
fabric.Image.fromURL(newImg, function(nImg){
    let newX = canvas.width / 2 - nImg.width / 2
    let newY = canvas.height / 2 - nImg.height / 2
    nImg.set({
      left: newX,
      top: newY
    })
    canvas.add(nImg)
  })


} //end placeImage






window.addEventListener('load', startUp, false)
