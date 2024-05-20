import { useQuery } from '@tanstack/react-query'

interface useFetchDataProps {
  url: string
  key: string
  itemId?: string | number
}

export default function useQueryFetchData({ url, key, ...props }: useFetchDataProps) {
  const fetchListData = async () => {
    try {
      const response = await fetch(url);
      return await response.json();
      // https://jotai.org/docs/guides/performance#heavy-computation
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  return useQuery({
    queryKey: [key, props.itemId],
    queryFn: fetchListData,
  })
}
