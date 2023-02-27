import { FC } from 'react'

interface Props {
  className?: string
  children?: any
}

const Footer: FC<Props> = ({ className }) => {
  return (
    <footer className="w-full bg-[#1c1c1c] text-white">
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-sm">
        <span className="tracking-widest">&copy;2023 ETH denver</span>

        <div className="flex items-center justify-center gap-2 tracking-wide opacity-60">
          <nav className="flex flex-row gap-3">#BUIDL FOR FUTURE</nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
