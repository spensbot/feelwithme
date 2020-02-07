const logger = store => next => action => {
  console.log('Action called')
  console.log(action)
  const result = next(action)
  console.log('New State: ')
  console.log(store.getState())
  return result
}

export default logger