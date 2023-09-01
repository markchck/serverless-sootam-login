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
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`)
    }
    return response
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    }
  }
}
