import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from 'react-query'
import instance from 'axios-instance'

export default function New () {
  const router = useRouter()
  const { id } = router.query
  const queryClient = useQueryClient()
  const { data, error, isLoading } = useQuery(`/contacts/${id}`)
  if (error) {
    return JSON.stringify(error)
  }
  if (isLoading) {
    return 'Cargando...'
  }
  return (
    <div>
        <p>Nombre: {data.name}</p>
        <p>Apellido: {data.lastName}</p>
        <p>Email: {data.email}</p>
        <p>Teléfono: {data.phone}</p>
        <Link href={`/contacts/${id}/edit`}>Editar contacto</Link>
        <button onClick={async () => {
          await instance.delete(`/contacts/${id}`)
          queryClient.invalidateQueries('/contacts')
          router.push('/contacts')
        }}>Eliminar Contacto</button>
        <Link href="/contacts">Contactos</Link>
    </div>
  )
}
