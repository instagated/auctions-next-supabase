import { supabase } from '../lib/initSupabase'
import IconUserCircle from "./IconUserCircle"
import IconLogout from "./IconLogout"
import IconLock from "./IconLock"
import Link from 'next/link'
import { useEffect } from 'react'

const displayUserLinks = (loggedIn) => {
  const selector = loggedIn ? '[data-auth-not-required]' : '[data-auth-required]'
  const links = document.querySelectorAll(selector)
  links.forEach(link => link.classList.add('hidden'))
}

const LayoutUserNav = () => {
  const loggedIn = supabase.auth.user()

  useEffect(() => {
    displayUserLinks(loggedIn)
  })

  return (
    <div className="justify-end md:flex-1 lg:w-0 hidden sm:flex flex-auto items-center">
      <div className="gap-2 ml-3 relative flex items-center tracking-wider font-semibold text-sm">
        <Link href="/login">
          <a className="flex gap-1 items-center px-4 py-2 text-gray-500 hover:text-indigo-800" data-auth-not-required>
            <IconLock className="w-6 h-6" />
            Log In
          </a>
        </Link>

        <Link href="/register">
          <a className="flex gap-1 items-center px-6 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-full text-white" data-auth-not-required>
            <IconUserCircle className="w-6 h-6" />
            Sign Up
          </a>
        </Link>

        <Link href="/account">
          <a className="flex items-center px-4 py-2 text-gray-500 hover:text-indigo-800" data-auth-required>
            <IconUserCircle className="w-6 h-6" />
            Your Account
          </a>
        </Link>

        <Link href="/logout">
          <a className="flex items-center px-4 py-2 text-gray-500 hover:text-indigo-800" data-auth-required>
            <IconLogout className="w-6 h-6" />
            Logout
          </a>
        </Link>
      </div>
    </div>
  )
}

export default LayoutUserNav