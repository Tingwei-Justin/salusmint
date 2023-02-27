import cn from 'clsx'
import s from './Layout.module.css'
import dynamic from 'next/dynamic'
// import { Navbar, Footer } from '@components/common'
// import { LoadingDots } from '@components/ui'
// import { ProductUploadView } from '@components/product/ProductModal'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Footer from '../Footer'
import Navbar from '../Navbar'

// const Loading = () => (
//   <div className="flex h-80 w-80 items-center justify-center p-3 text-center">
//     <LoadingDots />
//   </div>
// )

// const dynamicProps = {
//   loading: Loading,
// }

interface Props {
  children: any
  pageProps: any
}

const Layout: React.FC<Props> = ({ children, pageProps }) => {
  const [showBanner, setShowBanner] = useState(true)
  const router = useRouter()
  return (
    <div className={cn(s.root)}>
      <Navbar />
      <main className="fit flex min-h-[80vh] w-screen justify-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
