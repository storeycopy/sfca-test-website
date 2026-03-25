import { client } from '../tina/__generated__/client'
import HomeClient from './home-client'

export default async function Home() {
  const result = await client.queries.page({ relativePath: 'home.json' })

  return (
    <HomeClient
      initialData={result.data}
      query={result.query}
      variables={result.variables}
    />
  )
}
