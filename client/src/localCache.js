export const themeIds = {
  DARK: 'DARK',
  LIGHT: 'LIGHT'
}

export const messageTypes = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO'
}

export const initCache = cache => {

  let theme = localStorage.getItem('theme')

  if (theme === null) {
    theme = themeIds.DARK
    localStorage.setItem('theme', theme)
  }

  cache.writeData({
    data: {
      theme: theme,
      notification: {
        type: null,
        message: null,
        timeOut: null
      }
    }
  })
}

const resetNotification = (client) => () => {
  client.writeData({
    data: {
      notification: {
        type: null,
        message: null,
        timeOut: null
      }
    }
  })
}

export const setNotification = (client, type, message, duration) => {
  client.writeData({
    data: {
      notification: {
        type: type,
        message: message,
        timeOut: setTimeout(resetNotification(client), duration)
      }
    }
  })
}

export const setTheme = (client, theme) => {

  localStorage.setItem('theme', theme)

  client.writeData({
    data: {
      theme: theme
    }
  })
}
