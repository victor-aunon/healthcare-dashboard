import type { StorageService } from 'application/ports'

export function storageService(): StorageService {
  const set = <T>(key: string, value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const get = <T>(key: string) => {
    const value = window.localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : null
  }

  const remove = (key: string) => {
    window.localStorage.removeItem(key)
  }

  return {
    set,
    get,
    remove,
  }
}
