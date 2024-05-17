import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface RouterProviderWrapperProps {
  children: ReactNode;
}

// create context
const RouterContext = createContext<string | undefined>(undefined)

// provider
export default function RouterProviderWrapper({
  children,
}: RouterProviderWrapperProps) {
  const [globalData, setGlobalData] = useState<string>()

  useEffect(() => {
    const modeLocal = localStorage.getItem('mode') as 'light' | 'dark'
    console.log(modeLocal)
    if (modeLocal === 'dark') {
      setGlobalData('light')
    }
  }, [])

  // const updateSomeData = (newData: unknown) => {
  //   setGlobalData(newData as unknown as never);
  // };

  // const contextValue = { globalData, updateSomeData };
  return (
    <RouterContext.Provider value={globalData}>
      {children}
    </RouterContext.Provider>
  )
}

// validate use router context
export function useRouterContext() {
  const router = useContext(RouterContext)
  console.log('useRouterContext', router)
  if (router === undefined) {
    throw new Error('useRouterContext must be used within RouterProvider')
  }

  return router
}
