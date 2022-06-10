/**
 *  Created by NTNuan's author on 06/10/2022
 */

export const saveContentAfterPressEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}

export const selectAllInLineText = (e) => {
  e.target.focus()
  e.target.select()
}
