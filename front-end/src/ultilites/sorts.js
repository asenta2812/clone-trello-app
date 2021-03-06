/**
 * Sort array based on another array
 * @param {Array} array: Array input
 * @param {Array} orderArray : Array order
 * @param {string} key : The key of the item in the array is used as a sort value
 * @returns {Array}: sorted array
 */
export default function mapOrder(array, orderArray, key = 'id') {
  if (!array || array.length === 0) { return [] }
  if (!orderArray || orderArray.length === 0) { return array }
  return array.sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))
}