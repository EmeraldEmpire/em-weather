export async function getClientLocation() {
  try {
    const res = await fetch('https://ipapi.co/json/')
    if (!res.ok) throw new Error('Failed Fetching Data')
    const data = await res.json()

    return {
      latitude: data.latitude,
      longitude: data.longitude,
      country: data.country_name,
      admin1: data.city,
    }
  } catch (err) {
    console.error(err)
    throw err
  }
}
