import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'

export default function Home() {
  return <div className="text-blue-600">This is main</div>
}

Home.Layout = Layout
