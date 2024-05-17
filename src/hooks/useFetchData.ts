import { useQuery } from '@tanstack/react-query'

interface useFetchDataProps {
  url: string
}

export default function useFetchData({ url }: useFetchDataProps) {
  const fetchData = async () => {
    const response = await fetch(url)
    return await response.json()
  }

  const fetchDataQuery = useQuery({
    queryKey: ['fetchedData'],
    queryFn: fetchData,
  })
}
