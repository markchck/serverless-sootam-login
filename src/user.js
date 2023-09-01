import { register, login } from "../lib/firebase.js"
export const signUp = async (event) => {
  // console.log(event)
  try {
    const body = JSON.parse(event.body.toString("utf-8"))
    const { userEmail = "", password = "" } = body
    const response = await register(userEmail, password)
    return {
      statusCode: 201,
      body: response,
    }
  } catch (error) {
    throw error
  }
}

export const signIn = async (event) => {
  // console.log(event)
  const body = JSON.parse(event.body.toString("utf-8"))
  const { userEmail = "", password = "" } = body
  const user = await login(userEmail, password)

  return {
    statusCode: 200,
    body: user,
  }
}
