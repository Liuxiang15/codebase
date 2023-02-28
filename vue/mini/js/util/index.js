/**
 * Define a property.
 */
export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}