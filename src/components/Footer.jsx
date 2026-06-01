import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
      <footer className="border-t border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <p> © {new Date().getFullYear()} Ravin Ghimire. All rights reserved.</p>
              <div className="flex gap-4">
                  <Link to="/login" className="transition hover:text-white">Login</Link>
                  <Link to="/register" className="transition hover:text-white">Register</Link>
              </div>
          </div>
      </footer>
  )
}

export default Footer
