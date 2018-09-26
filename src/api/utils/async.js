export const async = (func) => async (request, response) => {
  try {
    let result = await func(request, response)
    return response.status(200).send(result)
  } catch (e) {
    return response.status(500).send(e)
  }
}