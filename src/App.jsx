import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './RegistartionForm'
import RegistrationForm from './RegistartionForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RegistrationForm></RegistrationForm>
    </>
  )
}

export default App
