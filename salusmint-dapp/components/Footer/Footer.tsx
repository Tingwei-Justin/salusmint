import { FC } from 'react'

interface Props {
  className?: string
  children?: any
}

const Footer: FC<Props> = ({ className }) => {
  return (
    <footer className="w-full bg-[#101010] text-white ">
      <div className="flex flex-col items-center justify-center gap-4 py-4 text-sm">
        <span className="tracking-widest">
          &copy;2023 ETH denver | #BUIDL FOR FUTURE
        </span>

        {/* <div className="flex items-center justify-center gap-2 tracking-wide opacity-60">
          <nav className="flex flex-row gap-3"></nav>
        </div> */}
      </div>
    </footer>
  )
}

export default Footer
