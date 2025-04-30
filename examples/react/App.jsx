import React from 'react'
import { Frame } from '@plutoxyz/react-frame'
import '../styles/styles.css'
import { pseudoBankScript } from '../../script'

const App = () => {
  const handleProof = (proof) => {
    console.log('Proof received:', proof.data)
  }

  const handleError = (error) => {
    console.log('Error code:', error.code)
    console.log('Display message:', error.display_message)
    console.log('Error message:', error.message)
  }

  return (
    <div className="container">
      <h1>Pluto Frame - React Demo</h1>
      <p>This is a simple example of using the Pluto Frame in a React application.</p>

      <Frame
        script={pseudoBankScript.script}
        onProof={handleProof}
        onError={handleError}
        brand={{
          logo: 'https://raw.githubusercontent.com/pluto/.github/main/profile/assets/assets_ios_Pluto-1024%401x.png',
          name: 'Plutoxyz'
        }}
      />
    </div>
  )
}

export default App
