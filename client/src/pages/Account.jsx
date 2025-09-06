import { UserProfile } from '@clerk/clerk-react'

export default function Account() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-slate-900">
      <UserProfile
        appearance={{
          elements: {
            rootBox: 'w-full h-full flex justify-center items-center',
            card: 'w-full max-w-3xl bg-transparent text-white p-6',
            headerTitle: 'text-3xl font-bold',
            headerSubtitle: 'text-sm text-gray-400',
            profileSection: 'rounded-xl p-4', // ✅ no background, no border
            profileSectionTitle: 'text-lg text-slate-300 font-semibold',
            formButtonPrimary:
              'bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg px-4 py-2 transition',
          },
        }}
      />
    </div>
  )
}
