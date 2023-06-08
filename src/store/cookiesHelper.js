import Cookies from 'js-cookie'

export const cookiesHelper = {
  setObject: function(name, obj, expiresSeconds = null) {
    if (expiresSeconds) {
      const expireTime = new Date(new Date().getTime() + expiresSeconds * 1000)
      Cookies.set(name, obj, {
        expires: expireTime
      })
    } else {
      Cookies.set(name, JSON.stringify(obj))
    }
  },

  getObject: function(name) {
    try {
      return JSON.parse(Cookies.get(name))
    } catch (error) {
      return null
    }
  }
}
