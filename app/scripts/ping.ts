import fetch from 'node-fetch'

const pingServer = async () => {
  try {
    const response = await fetch('https://monde-numerique.onrender.com/footprintapi/ping')
    const data = await response.json()
    console.log('Ping successful:', data)
  } catch (error) {
    console.error('Ping failed:', error)
  }
}

// Ping every 14 minutes
setInterval(pingServer, 14 * 60 * 1000)

// Initial ping
pingServer()

