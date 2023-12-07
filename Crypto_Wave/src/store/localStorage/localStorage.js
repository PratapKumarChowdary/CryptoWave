export const getToken = () => {
  try {
    const serializedState = localStorage.getItem("authToken")
    console.log("🚀 ~ file: localStorage.js:4 ~ getToken ~ serializedState:", serializedState)
    if (!serializedState) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveToken = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("authToken", serializedState)
  } catch (err) {}
}

export const deleteToken = () => {
  try {
    localStorage.removeItem("authToken")
  } catch (e) {}
}
