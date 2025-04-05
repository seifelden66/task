'use client'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../store'
import { RootState } from '../store'

export default function Navbar() {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.currentUser)

  const handleLogout = async () => {
    if (!window.confirm('Are you sure you want to logout?')) {
      return
    }

    try {
      const res = await fetch('/api/logout', {
        method: 'POST'
      })
      
      if (res.ok) {
        dispatch(clearUser())
        router.push('/login')
      } else {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      alert('Failed to logout. Please try again.')
    }
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Steel Sheet Calculator</h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-600">
                {user?.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 