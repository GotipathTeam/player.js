# Gotipath Player API

The Gotipath Player API allows you to interact with and control an embedded Gotipath
Player.

## Installation

You can install the Gotipath Player API through either npm:

```bash
npm install @gotipath/player
```

Alternatively, you can reference an up‐to‐date version on our CDN:

```html
<script src="https://player.gotipath.com/api/player.js"></script>
```

## Getting Started

In order to control the Gotipath player, you need a player to control. There are a
few ways to get a player:

### Pre-existing player

Already have a player on the page? Pass the element to the `Gotipath.Player`
constructor and you’re ready to go.

```html
<iframe src="https://player.gotipath.com/stream/libraryId/default/VideoId" width="640" height="360" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>

<script src="https://player.gotipath.com/api/player.js"></script>
<script>
    const iframe = document.querySelector('iframe');
    const player = new Gotipath.Player(iframe);

      player.on('ready', function () {
        console.log('player is ready!')
      })
      player.on('play', function () {
        console.log('played the video!')
      })
      player.on('pause', function () {
        console.log('paused the video!')
      })
      player.on('ended', function () {
        console.log('ended the video!')
      })
      player.on('timeupdate', function (currentTime) {
        console.log('current time:', currentTime)
      })
      player.on('seeked', function (currentTime) {
        console.log('seeked to:', currentTime)
      })
      player.on('volumechange', function (volume) {
        console.log('volume changed to:', volume)
      })

       var btn = document.getElementById('setCurrentTime')
      var playBtn = document.getElementById('play')
      var pauseBtn = document.getElementById('pause')

      playBtn.addEventListener('click', function () {
        player.play()
      })

      pauseBtn.addEventListener('click', function () {
        player.pause()
      })

      btn.addEventListener('click', function () {
        player.setCurrentTime(3)
      })
   
</script>
```


