import Link from 'next/link'

interface NavProps {
  menuOpen: boolean
  onToggle: () => void
}

export default function Nav({ menuOpen, onToggle }: NavProps) {
  return (
    <nav className="relative z-[51] flex justify-between items-center px-6 pt-6 pb-4">
      <Link href="/" onClick={() => { if (menuOpen) onToggle() }} className="group relative text-base text-[#1C1C1C] transition-colors">
        <span className="block transition-opacity duration-200 group-hover:opacity-0">Nick Hallam</span>
        <span className="absolute inset-0 flex items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-[#888]">nhallam.design</span>
      </Link>
      <button
        onClick={onToggle}
        className="relative text-base text-[#1C1C1C] hover:text-[#888] transition-colors cursor-pointer"
      >
        <span className={`block transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}>
          Menu
        </span>
        <span className={`absolute inset-0 flex items-center justify-end transition-opacity duration-200 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}>
          Close
        </span>
      </button>
    </nav>
  )
}
