import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function App() {
  const linkBase = 'px-3 py-2 rounded-lg hover:bg-white/60 transition-colors'
  const active = 'bg-white/70 text-blue-700 shadow-sm'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-900 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100 flex flex-col">
      <header className="bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm dark:bg-slate-900/70 dark:supports-[backdrop-filter]:bg-slate-900/60">
        <nav className="container-narrow flex items-center justify-between py-4">
          <div className="text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            University Clubs — Event Portal
          </div>
          <div className="flex items-center gap-2">
            <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>
              Home
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>
              Registration
            </NavLink>
            <NavLink to="/attendees" className={({ isActive }) => `${linkBase} ${isActive ? active : ''}`}>
              Attendees
            </NavLink>
            <button
              aria-label="Toggle dark mode"
              className="ml-2 inline-flex items-center rounded-md border border-slate-200 bg-white/70 px-2.5 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-800"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            >
              {theme === 'dark' ? '🌞' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      <main className="container-narrow py-8 flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200/70 mt-10 py-6 text-sm text-center text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © {new Date().getFullYear()} University Clubs
      </footer>
    </div>
  )
}
