import Link from 'next/link'

interface NavProps {
  onMenuOpen: () => void
}

export default function Nav({ onMenuOpen }: NavProps) {
  return (
    <nav className="flex justify-between items-center px-6 py-4">
      <Link href="/" className="text-base text-[#1C1C1C] hover:text-[#888] transition-colors">
        Nick Hallam
      </Link>
      <button
        onClick={onMenuOpen}
        className="text-base text-[#1C1C1C] hover:text-[#888] transition-colors cursor-pointer"
      >
        Menu
      </button>
    </nav>
  )
}
