import instance from 'axios-instance'
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/globals.css'

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await instance.get(queryKey[0])
  return data;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

function MyApp({ Component, pageProps }) {
  return(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
