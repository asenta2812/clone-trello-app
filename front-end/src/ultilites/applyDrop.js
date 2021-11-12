
/**
 *
 * @param {Array} array
 * @param {{addedIndex: number, removedIndex: number, payload: object}} dropResult
 */
export default function applyDrop(array, dropResult) {
  const { addedIndex, removedIndex, payload } = dropResult
  if (removedIndex == null && addedIndex == null) return array

  const result = [...array]
  let itemAdd = payload
  if (removedIndex != null) {
    [itemAdd] = result.splice(removedIndex, 1)
  }
  if (addedIndex != null) {
    result.splice(addedIndex, 0, itemAdd)
  }
  return result

}