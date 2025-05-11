import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center space-x-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo w-20 h-20" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react w-20 h-20" alt="React logo" />
        </a>
      </div>
      <h1 className="text-center text-4xl font-bold text-blue-600">Vite + fewfewReact</h1>
      <div className="card p-8 mt-4 border rounded-lg shadow-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          count is {count}
        </button>
        <p className="text-gray-600 mt-4">
          Edit <code className="text-blue-500">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-center text-gray-700 mt-4">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
