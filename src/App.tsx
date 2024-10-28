import React, { useMemo } from 'react'

import FutureShipments from './FutureShipments'
import Shipments from './Shipment'
import { STATUES } from './data'

import { makeAssignament } from './utils'

export type PackagesIndexed = {
  id: number
  name: string
  status: string
}

function App() {
  const restult = makeAssignament()
  const [assignament, setAssignament] = React.useState(restult.assignament)
  const [showFuture, setShowFuture] = React.useState(false)

  const onDelayed = (id: number) => {
    setAssignament(prev =>
      prev.map(item => ({
        courier: item.courier,
        packages: item.packages.map(pack =>
          pack.id === id
            ? {
                ...pack,
                status: STATUES[0]
              }
            : pack
        )
      }))
    )
  }
  const onCompleted = (id: number) => {
    setAssignament(prev =>
      prev.map(item => ({
        courier: item.courier,
        packages: item.packages.map(pack =>
          pack.id === id
            ? {
                ...pack,
                status: STATUES[1]
              }
            : pack
        )
      }))
    )
  }

  const onDelayedPackages = useMemo(() => {
    return assignament
      .map(item => item.packages)
      .flat()
      .filter(pack => pack.status === STATUES[0])
  }, [assignament])

  return (
    <main className="mx-auto p-10">
      <h1 className="text-2xl font-bold underline">Xpress App</h1>

      <Shipments
        onDelayed={onDelayed}
        onCompleted={onCompleted}
        list={assignament}
        onOpenResults={() => {
          setShowFuture(true)
        }}
      />
      {showFuture ? (
        <FutureShipments
          list={[...onDelayedPackages, ...restult.noTakenPackages]}
        />
      ) : null}
    </main>
  )
}

export default App
