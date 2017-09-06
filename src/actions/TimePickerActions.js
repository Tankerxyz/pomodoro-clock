import { VALUE_UPDATED } from '../constants/TimePicker'

export function changeTime(key, value) {
  return (dispatch) => {
    dispatch({
      type: VALUE_UPDATED,
      payload: value,
      key
    })
  }
}