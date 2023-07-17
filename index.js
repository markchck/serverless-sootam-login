import { signUp, signIn } from "./src/user.js"

export const handler = async (event) => {
  // console.log(event)
  let response
  try {
    switch (event.routeKey) {
      case "POST /signUp":
        response = await signUp(event)
        break
      case "POST /signIn":
        response = await signIn(event)
        break
      case "GET /socialLogin":
        response = await getUserBySocialLogin(event)
        break
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`)
    }
    return response
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    }
  }
}
