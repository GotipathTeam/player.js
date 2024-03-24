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
<iframe src="https://player.gotipath.com/video/76979871?h=8272103f6e" width="640" height="360" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>

<script src="https://player.gotipath.com/api/player.js"></script>
<script>
    const iframe = document.querySelector('iframe');
    const player = new Gotipath.Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });
</script>
```

### Create with a video id or url

You can use the library to make the embed for you. All you need is an empty
element and the video id or Gotipath.com url (and optional
[embed options](#embed-options)).

**NOTE:** If the video [privacy settings](https://Gotipath.zendesk.com/hc/en-us/articles/224817847-Privacy-settings-overview) are "Unlisted", instead of providing an `id` property, you will need to provide the full video URL as a `url` property and include the `h` parameter.

```html
<div id="made-in-ny"></div>

<script src="https://player.gotipath.com/api/player.js"></script>
<script>
    const options = {
        id: 59777392,
        width: 640,
        loop: true
    };

    const player = new Gotipath.Player('made-in-ny', options);

    player.setVolume(0);

    player.on('play', function() {
        console.log('played the video!');
    });
</script>
```

### Automatically with HTML attributes

When the library loads, it will scan your page for elements with Gotipath
attributes. Each element must have at least a `data-Gotipath-id` or
`data-Gotipath-url` attribute in order for the embed to be created automatically.
You can also add attributes for any of the [embed options](#embed-options),
prefixed with `data-Gotipath` (`data-Gotipath-portrait="false"`, for example).

**NOTE:** If the video [privacy settings](https://Gotipath.zendesk.com/hc/en-us/articles/224817847-Privacy-settings-overview) are "Unlisted", instead of providing a `data-Gotipath-id` attribute, you will need to provide the full video URL in a `data-Gotipath-url` attribute and include the `h` parameter.

```html
<div data-Gotipath-id="19231868" data-Gotipath-width="640" id="handstick"></div>
<div data-Gotipath-url="https://player.gotipath.com/video/76979871?h=8272103f6e" id="playertwo"></div>

<script src="https://player.gotipath.com/api/player.js"></script>
<script>
    // If you want to control the embeds, you’ll need to create a Player object.
    // You can pass either the `<div>` or the `<iframe>` created inside the div.
    const handstickPlayer = new Gotipath.Player('handstick');
    handstickPlayer.on('play', function() {
        console.log('played the handstick video!');
    });

    const playerTwoPlayer = new Gotipath.Player('playertwo');
    playerTwoPlayer.on('play', function() {
        console.log('played the player 2.0 video!');
    });
</script>
```

## Browser Support

The Player API library is supported in IE 11+, Chrome, Firefox, Safari, and
Opera.

## Migrate from Froogaloop

Using our old Froogaloop library? See the [migration doc](docs/migrate-from-froogaloop.md)
for details on how to update your code to use this library.

## Using with a module bundler

If you’re using a module bundler like [webpack](https://webpack.js.org) or
[rollup](http://rollupjs.org/), the exported object will be the Player
constructor (unlike the browser where it is attached to `window.Gotipath`):

```js
import Player from '@gotipath/player';

const player = new Player('handstick', {
    id: 19231868,
    width: 640
});

player.on('play', function() {
    console.log('played the video!');
});
```

Similarly, if you’re using [RequireJS](http://www.requirejs.org) in the browser,
it will also import the Player constructor directly:

```html
<iframe src="https://player.gotipath.com/video/76979871?h=8272103f6e" width="640" height="360" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>

<script>
    require(['https://player.gotipath.com/api/player.js'], function (Player) {
        const iframe = document.querySelector('iframe');
        const player = new Player(iframe);

        player.on('play', function() {
            console.log('played the video!');
        });
    });
</script>
```
