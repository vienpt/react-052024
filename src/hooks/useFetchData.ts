interface useFetchDataProps {
  url: string
}

export async function useFetchData({ url }: useFetchDataProps) {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
