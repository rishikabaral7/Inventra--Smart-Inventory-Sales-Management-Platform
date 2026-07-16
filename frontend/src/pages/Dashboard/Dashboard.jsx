import React from 'react'
import {useSelector} from 'react-redux'

const Dashboard = () => {
  const auth = useSelector((state)=>state.auth)
  return (
    <div>
      <h1>

      Dashboard
      </h1>
      <pre>
        {JSON.stringify(auth,null,2)}
      </pre>
    </div>
  )
}

export default Dashboard
