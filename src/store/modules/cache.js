import { getObject, setObject } from '@/store/localStorage'
import { defineStore } from 'pinia'
import { pinia } from '@/store'
import { getCascadeChinaZones } from '@/api-js/zone/cascade-china-zones'

const keyZone = 'CHINA_ZONE'

const _useCacheStore = defineStore('cache', {
  state: () => {
    return {
      chinaZones: getObject(keyZone)
    }
  },
  actions: {
    async getChinaZones() {
      if (!this.chinaZones) {
        this.chinaZones = await getCascadeChinaZones()
        setObject(keyZone, this.chinaZones)
      }
      return this.chinaZones
    }
  }
})

export function useCacheStore() {
  return _useCacheStore(pinia)
}
