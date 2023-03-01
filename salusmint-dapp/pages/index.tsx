import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <div className="flex w-full max-w-7xl flex-col justify-center">
      <div className="max-w-7xl text-5xl font-semibold">
        Empowering the TRUST for NFT Ecosystem
      </div>

      <div className="max-w-6xl pt-10 text-xl opacity-60">
        SalusMint protocol builds a transparent and secure vault that enables
        NFT holders and creators to build a strong foundation of trust by
        providing clear ownership and stable DeFi yield fostering long-term
        development.
      </div>

      <div className="flex gap-4 ">
        <Link
          href={'/new'}
          //   onClick={() => setLoading(true)}
          className="mt-6 flex w-60 items-center justify-center border border-black px-6 py-2 font-semibold text-black hover:scale-105 hover:cursor-pointer"
        >
          Create NFT Contract
        </Link>
        <Link
          href={'/project/demo'}
          //   onClick={() => setLoading(true)}
          className="mt-6 flex w-60 items-center justify-center border border-black px-6 py-2 font-semibold text-black hover:scale-105 hover:cursor-pointer"
        >
          Explore (DEMO)
        </Link>
      </div>
    </div>
  )
}

Home.Layout = Layout

// BUIDL THE SOLID Trust for NFT Ecosystem

// For Creators, Holders and whole community
