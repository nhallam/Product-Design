import Link from 'next/link'

interface NavProps {
  onMenuOpen: () => void
}

export default function Nav({ onMenuOpen }: NavProps) {
  return (
    <nav className="flex justify-between items-center px-6 py-4">
      <Link href="/" className="text-sm text-[#888] hover:text-[#111] transition-colors">
        Home
      </Link>
      <button
        onClick={onMenuOpen}
        className="text-sm text-[#888] hover:text-[#111] transition-colors cursor-pointer"
      >
        Menu
      </button>
    </nav>
  )
}
