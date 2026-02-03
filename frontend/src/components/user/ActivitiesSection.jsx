import { useState } from 'react'

const ActivitiesSection = ({ pet, isSidebar = false }) => {
  const [showWalks, setShowWalks] = useState(true)
  const [showTricks, setShowTricks] = useState(false)
  const [showOtherActivities, setShowOtherActivities] = useState(false)

  const walks = [
    { date: '09.06.2023', time: '09:30', title: 'Morning Walk', type: 'walk' },
  ]

  const upcomingEvents = [
    { date: '12.06.2023', time: '09:30', title: 'Morning Walk', icon: '🌿', type: 'walk' },
    { date: '12.06.2023', time: '11:00', title: 'Flea Medication', icon: '💊', type: 'medication' },
    { date: '16.06.2023', time: '16:00', title: 'Shinny Fur Saloon', icon: '✂️', type: 'grooming' },
    { date: '21.06.2023', time: '16:00', title: 'Vet Checkup', icon: '🏥', type: 'vet' },
  ]

  if (isSidebar) {
    return (
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search product"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Walks */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌿</span>
              <h3 className="text-lg font-bold text-gray-800">Walks</h3>
            </div>
            <button
              onClick={() => setShowWalks(!showWalks)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showWalks ? '−' : '+'}
            </button>
          </div>

          {showWalks && (
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl mb-2 block">🗺️</span>
                  <p className="text-sm text-gray-600">Map view</p>
                </div>
              </div>
              {walks.map((walk, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl">🐾</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600">{walk.date} | {walk.time}</p>
                    <p className="font-semibold text-gray-800">{walk.title}</p>
                  </div>
                  <span className="text-sm text-gray-500">2</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tricks */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🦴</span>
              <h3 className="text-lg font-bold text-gray-800">Tricks</h3>
            </div>
            <button
              onClick={() => setShowTricks(!showTricks)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showTricks ? '−' : '+'}
            </button>
          </div>
          {showTricks && (
            <div className="text-gray-600 text-sm">Tricks will appear here...</div>
          )}
        </div>

        {/* Other Activities */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🐾</span>
              <h3 className="text-lg font-bold text-gray-800">Other Activities</h3>
            </div>
            <button
              onClick={() => setShowOtherActivities(!showOtherActivities)}
              className="text-gray-500 hover:text-gray-700"
            >
              {showOtherActivities ? '−' : '+'}
            </button>
          </div>
          {showOtherActivities && (
            <div className="text-gray-600 text-sm">Other activities will appear here...</div>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming events</h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xl">{event.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">{event.date} | {event.time}</p>
                  <p className="font-semibold text-sm text-gray-800">{event.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Activities</h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Recent Walks</h4>
          <div className="space-y-3">
            {walks.map((walk, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">🌿</span>
                <div>
                  <p className="font-semibold text-gray-800">{walk.title}</p>
                  <p className="text-sm text-gray-600">{walk.date} | {walk.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Tricks Learned</h4>
          <p className="text-gray-600 text-sm">No tricks recorded yet.</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Other Activities</h4>
          <p className="text-gray-600 text-sm">No other activities recorded yet.</p>
        </div>
      </div>
    </div>
  )
}

export default ActivitiesSection

