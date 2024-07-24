export const responseHandler = async response => {
  if (response.ok) {
    return response.json()
  } else {
    return {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    }
  }
}
