import { PackagesIndexed } from './App'
import { Couriers, Packages, STATUES } from './data'
import { CourierWithIndexedCount, TableList } from './Shipment'

export function makeAssignament() {
  const couriers: CourierWithIndexedCount[] = Couriers.map(
    (courier, index) => ({
      ...courier,
      count: 0,
      id: index
    })
  )
  const indexPackages: PackagesIndexed[] = Packages.map((pack, index) => ({
    id: index,
    name: pack.name,
    status: pack.status
  }))

  let packageIndex = 0
  const assignament: TableList = []
  for (const courier of couriers) {
    const items = indexPackages.slice(
      packageIndex,
      packageIndex + courier.maxPackages
    )
    packageIndex += courier.maxPackages
    assignament.push({
      courier: courier,
      packages: items
    })
  }
  const noTakenPackages = indexPackages.slice(packageIndex)
  noTakenPackages.forEach(pack => (pack.status = STATUES[0]))

  return { assignament, noTakenPackages }
}
