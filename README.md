# Project Overview:

This project was a fun challenge that turned out to be more complex than I expected. The main goal was to assign packages to couriers, which seemed simple at first but became tricky when I needed to render updated information and handle status changes for packages already assigned to specific couriers.

## Code Highlights

To make package tracking faster, I added an id index to each package and courier. This helped streamline search and retrieval. In App.tsx, the makeAssignment function handles the initial package assignment:
    
```typescript 
    // utils.ts - makeAssignament function
export function makeAssignament() {
  // Assign couriers and indexed packages
  const couriers: CourierWithIndexedCount[] = Couriers.map((courier, index) => ({
    ...courier,
    count: 0,
    id: index
  }));
  const indexPackages: PackagesIndexed[] = Packages.map((pack, index) => ({
    id: index,
    name: pack.name,
    status: pack.status
  }));
  
  // Distribution of packages to couriers
  let packageIndex = 0;
  const assignament: TableList = couriers.map(courier => {
    const items = indexPackages.slice(packageIndex, packageIndex + courier.maxPackages);
    packageIndex += courier.maxPackages;
    return { courier, packages: items };
  });

  // Unassigned packages are marked as DELAYED
  const noTakenPackages = indexPackages.slice(packageIndex).map(pack => ({
    ...pack,
    status: STATUES[0]
  }));

  return { assignament, noTakenPackages };
}
```

## React Component Logic

In App.tsx, I also used useMemo to monitor real-time changes in package status, so the component would always get the most updated data without recalculating unnecessarily:

```typescript
  // App.tsx - onDelayedPackages useMemo hook
const onDelayedPackages = useMemo(() => {
  return assignament
    .map(item => item.packages)
    .flat()
    .filter(pack => pack.status === STATUES[0]);
}, [assignament]);
```

Updating a package’s status was much easier with the indexed approach. For instance, if a package is delayed or completed, it’s handled through onDelayed and onCompleted functions:
    
```typescript
// App.tsx - Status change functions
const onDelayed = (id: number) => {
  setAssignament(prev => prev.map(item => ({
    courier: item.courier,
    packages: item.packages.map(pack =>
      pack.id === id ? { ...pack, status: STATUES[0] } : pack
    )
  })));
};

const onCompleted = (id: number) => {
  setAssignament(prev => prev.map(item => ({
    courier: item.courier,
    packages: item.packages.map(pack =>
      pack.id === id ? { ...pack, status: STATUES[1] } : pack
    )
  })));
};
```

## Final Touches with Styling

Finally, I focused on styling, adding color codes for rows based on delivery status and improving button hover effects. Here’s how I implemented it in index.css:

```css
/* index.css - Custom styles for the app */
th, td {
  padding: 10px;
  ...
}

.on-way {
  background-color: yellow;
  color: #000;
}

.completed {
  background-color: green;
  color: #fff;
}
```