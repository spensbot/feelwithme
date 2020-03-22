let alertTimeout = null

export const themeIds = {
  DARK: 'DARK',
  LIGHT: 'LIGHT'
}

export const alertTypes = {
  error: 'error',
  warning: 'warning',
  info: 'info',
  success: 'success'
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
      alertType: alertTypes.success,
      alert: null
    }
  })
}

export const removeAlert = client => {
  if (alertTimeout) clearTimeout(alertTimeout)

  client.writeData({
    data: {
      alert: null
    }
  })
}

export const setAlert = (client, type, alert, duration) => {
  removeAlert(client)
  
  client.writeData({
    data: {
      alertType: type,
      alert: alert
    }
  })

  if (duration) {
    alertTimeout = setTimeout( () => {
      alertTimeout = null
      removeAlert(client)
    }, duration)
  }
}

export const setTheme = (client, theme) => {
  localStorage.setItem('theme', theme)

  client.writeData({
    data: {
      theme: theme
    }
  })
}
