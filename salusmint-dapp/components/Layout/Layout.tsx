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
      {/* <div className="h-4 w-full border-b border-black" /> */}
      <main className="fit relative flex min-h-[100vh] w-screen justify-center bg-[#101010] font-content text-white">
        {/* <div className="absolute left-4 -top-4 h-4 border-r border-black" />
        <div className="absolute left-0 -top-4 h-4 w-4 bg-black" />
        <div className="absolute left-4 h-full border-l border-black" />

        <div className="absolute right-4 -top-4 h-4 border-l border-black" />
        <div className="absolute right-0 -top-4 h-4 w-4 bg-black" />
        <div className="absolute right-4 h-full border-l border-black" /> */}
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
