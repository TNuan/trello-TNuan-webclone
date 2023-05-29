/**
 * Created by NTNuan's author on 06/08/2022
*/

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  console.log('removedIndex is :', removedIndex)
  console.log('addedIndex is :', addedIndex)
  console.log('payload is :', payload)
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  console.log('result is : ', result)

  return result
}
