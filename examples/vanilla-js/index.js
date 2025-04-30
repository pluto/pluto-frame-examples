import Pluto from '@plutoxyz/frame-js'
import { pseudoBankScript } from '../../script'

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.container')

  if (!container) {
    console.error('Container element not found')
    return
  }

  // Add title and description
  const title = document.createElement('h1')
  title.textContent = 'Pluto Frame - Vanilla JavaScript Demo'
  container.appendChild(title)

  const description = document.createElement('p')
  description.textContent = 'This is a simple example of using the Pluto Frame in a vanilla JavaScript application.'
  container.appendChild(description)

  // Create pluto container
  const plutoContainer = document.createElement('div')
  plutoContainer.id = 'pluto-frame'
  container.appendChild(plutoContainer)

  // Define hooks - only console logging, no DOM manipulation
  const hooks = {
    onScriptLog: (log) => console.log('Log:', log),
    onSuccess: (data) => console.log('Success:', data),
    onError: (error) => console.error('Error:', error)
  }

  // Initialize Pluto
  try {
    const plutoSDK = await Pluto.initialize(hooks, {
      brand: {
        name: 'Plutoxyz',
        logo: 'https://raw.githubusercontent.com/pluto/.github/main/profile/assets/assets_ios_Pluto-1024%401x.png'
      }
    })

    // Connect and run verification script
    await plutoSDK.connect(pseudoBankScript.script)
  } catch (error) {
    console.error('Initialization error:', error)
  }
})
