import React from 'react'
import { PackagesIndexed } from './App'
type Props = {
  list: PackagesIndexed[]
}
const FutureShipments: React.FC<Props> = ({ list }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold">Tomorrow</h2>
      <table>
        <thead>
          <tr>
            <th>Package</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map(pack => (
            <tr key={pack.id}>
              <td>{pack.name}</td>
              <td>{pack.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default FutureShipments
