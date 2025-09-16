import { useState } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl font-bold text-red-500">Hello Tailwind + React!</h1>
      <div className="mt-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Count is {count}
        </button>

        <h1 className='text-red-600'>kaksaks</h1>
      </div>
    </>
  )
}

export default App
