// plugins/persistPlugin.js
export function persistPlugin ({ store }: { store: any }) {
  store.$subscribe((mutation: any, state: any) => {
    localStorage.setItem(store.$id, JSON.stringify(state))
  })

  const savedState = localStorage.getItem(store.$id)
  if (savedState) {
    store.$patch(JSON.parse(savedState))
  }
}
