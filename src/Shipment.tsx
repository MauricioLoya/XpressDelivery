import React from 'react'
import { PackagesIndexed } from './App'
import { Couriers, STATUES } from './data'

type Props = {
  list: TableList
  onCompleted: (id: number) => void
  onDelayed: (id: number) => void
  onOpenResults: () => void
}

export type CourierWithIndexedCount = {
  id: number
  name: string
  maxPackages: number
  count: number
}

export type TableList = {
  courier: CourierWithIndexedCount
  packages: PackagesIndexed[]
}[]

const Shipments: React.FC<Props> = ({
  list,
  onCompleted,
  onDelayed,
  onOpenResults
}) => {
  const [isOpen, setOpen] = React.useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setOpen(true)
          onOpenResults()
        }}
      >
        Assing
      </button>
    )
  }

  return (
    <>
      <h2 className="text-2xl font-semibold">Today</h2>
      <div className="relative flex flex-col w-full h-full ">
        <table className="w-full text-left table-auto min-w-max border-2 border-black">
          <thead>
            <tr>
              <th>Delivery Man</th>
              <th>Max</th>
              <th>Packages</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td>{item.courier.name}</td>
                <td>{item.courier.maxPackages}</td>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>Package</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.packages.map((pack, index) => {
                        if (pack.status === STATUES[0]) return null
                        return (
                          <tr
                            key={index}
                            className={
                              pack.status === STATUES[1]
                                ? 'completed'
                                : 'on-way'
                            }
                          >
                            <td>{pack.name}</td>
                            <td>{pack.status}</td>
                            <td className="grid gap-2">
                              <button onClick={() => onCompleted(pack.id)}>
                                Complete
                              </button>
                              <button onClick={() => onDelayed(pack.id)}>
                                Delay
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Shipments
