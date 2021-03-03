/**
 * Use:
 * class MyModel extends Model {
 *   id = Number; // property1
 *   property2 = String;
 *   property3 = OtherModel
 *   property4 = val => [1, 2].includes(val) // custom validator
 *   ...
 * }
 *
 * const my_model = (new MyModel())._loadData({
 *   id: 1,
 *   property2: "other string",
 *   property3: {
 *     otherParam1: 2
 *     ...
 *   },
 *   property4: 1,
 *   ...
 * });
 *
 * Or
 * const my_model = (new MyModel())._loadData({
 *   id: 1,
 *   property2: "other string",
 *   property3: (new OtherModel())._loadData({
 *     otherParam1: 2
 *     ...
 *   }),
 *   property4: 5, // Error
 *   ...
 * });
 */
class Model {
  constructor() {
    loadFromType.bind(this)
    loadValidate.bind(this)
  }

  _loadData(data = {}) {
    Object.keys(data).forEach(prop => {
      if (typeof this[prop] == 'undefined') {
        // Cannot define type property
        throw new Error(
          `property ${this.constructor.name}.${prop} not defined`
        )
      } else if (typeof this[prop] == 'function') {
        if (isConstructor(this[prop])) {
          this[prop] = loadFromType(data[prop], this[prop], this, prop)
        } else {
          this[prop] = loadValidate(data[prop], this[prop], this, prop)
        }
      } else if(Array.isArray(this[prop]) && this[prop]._elementConstructor){
          this[prop] =loadFromType(data[prop], this[prop]._elementConstructor, this, prop)
      } else if (this[prop].constructor) {
        this[prop] = loadFromType(data[prop], this[prop].constructor, this, prop)
      } else {
        this[prop] = data[prop]
      }
    })

    return this
  }
}

export default Model

// private methods
function loadFromType(data, type, obj, prop, index = null) {
  if (Array.isArray(data)) {
    const result = data.map((item, indx) => (loadFromType(item, type, obj, prop, indx)))
    result._elementConstructor = type
    return result
  } else if (isSimpleType(type)) {
    const typeName = getType(type)
    if (typeof data !== typeName.toLowerCase()) {
      throw new Error(
        `Incorrect type property ${obj.constructor.name}.${prop}` + (index !==null ? `, index ${index}` : '')
      )
    }

    return data
  }else if(data instanceof type){
    return data
  }else {
    return new type()._loadData(data)
  }
}

function loadValidate(data, validator, obj, prop, index = null) {
  if (Array.isArray(data)) {
    return data.map((item, indx) => (loadValidate(item, validator, obj, prop, indx)))
  } else if (validator(data)) {
    return data
  } else {
    throw new Error(
      `Not valid property ` + (index !== null ? `(index ${index}) ` : '') +
      `${
        obj.constructor.name
      }.${prop}=${JSON.stringify(data, null, '  ')}`
    )
  }
}

// helpers
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType(fn) {
  const match = fn && fn.toString().match(/^\s*function\s+(\w+)/)
  return match ? match[1] : ''
}

function isSimpleType(fn) {
  return ['String', 'Number', 'Boolean', 'Function', 'Symbol'].includes(
    getType(fn)
  )
}

/**
 @ see https://stackoverflow.com/questions/40922531/how-to-check-if-a-javascript-function-is-a-constructor
 */
function isConstructor(func) {
  return (func && typeof func === "function" && func.prototype && func.prototype.constructor) === func;
}