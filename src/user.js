import { register, login, socialLogin } from "../lib/firebase.js"
export const signUp = async (event) => {
  const body = JSON.parse(event.body.toString("utf-8"))
  const { userEmail = "", password = "" } = body
  const user = await register(userEmail, password)
  return {
    statusCode: 201,
    body: user,
  }
}

export const signIn = async (event) => {
  const body = JSON.parse(event.body.toString("utf-8"))
  const { userEmail = "", password = "" } = body
  const user = await login(userEmail, password)

  return {
    statusCode: 200,
    body: user,
  }
}

export const getUserBySocialLogin = async (event) => {
  const { user = "", token = "" } = await socialLogin()
  return {
    statusCode: 200,
    body: {
      user: user,
      token: token,
    },
  }
}
