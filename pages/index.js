import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Link href="/contacts">
        Go to contacts
      </Link>
    </div>
  )
}
