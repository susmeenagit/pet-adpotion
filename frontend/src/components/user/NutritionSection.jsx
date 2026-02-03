import { useState } from 'react'

const NutritionSection = ({ pet }) => {
  const [showRecipes, setShowRecipes] = useState(true)
  const [showFoodJournal, setShowFoodJournal] = useState(false)
  const [selectedFoodType, setSelectedFoodType] = useState('kibble')

  const recipes = [
    {
      id: 1,
      title: 'Doggy Meatloaf with Vegetables',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Peanut Butter and Banana Biscuits',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Blueberry Cream Cupcake',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300&h=200&fit=crop',
    },
  ]

  const scheduledMeals = [
    { name: 'Breakfast', time: '10:00', enabled: true },
    { name: 'Dinner', time: '20:00', enabled: true },
  ]

  const learnNext = [
    { title: 'Lay Down', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=150&fit=crop' },
    { title: 'Fetch', difficulty: 'Intermediate', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=150&fit=crop' },
    { title: 'Roll Over', difficulty: 'Advanced', image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=200&h=150&fit=crop' },
  ]

  return (
    <div className="space-y-6">
      {/* Food Type Selection */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedFoodType('kibble')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedFoodType === 'kibble'
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-4xl mb-2">🍽️</div>
            <p className="font-semibold text-gray-800">Kibble / Dry</p>
          </button>
          <button
            onClick={() => setSelectedFoodType('homecooked')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedFoodType === 'homecooked'
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-4xl mb-2">🍲</div>
            <p className="font-semibold text-gray-800">Home cooked</p>
          </button>
        </div>
      </div>

      {/* Recipes */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🐾</span>
            <h3 className="text-lg font-bold text-gray-800">Recipes</h3>
          </div>
          <button
            onClick={() => setShowRecipes(!showRecipes)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showRecipes ? '−' : '+'}
          </button>
        </div>

        {showRecipes && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3 bg-gray-50">
                    <p className="font-semibold text-sm text-gray-800">{recipe.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
              + Add new recipes
            </button>
          </div>
        )}
      </div>

      {/* Food Journal */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🥫</span>
            <h3 className="text-lg font-bold text-gray-800">Food Journal</h3>
          </div>
          <button
            onClick={() => setShowFoodJournal(!showFoodJournal)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showFoodJournal ? '−' : '+'}
          </button>
        </div>
        {showFoodJournal && (
          <div className="text-gray-600 text-sm">Food journal entries will appear here...</div>
        )}
      </div>

      {/* Scheduled Meals */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Scheduled Meals</h3>
        <div className="space-y-4">
          {scheduledMeals.map((meal, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📅</span>
                <div>
                  <p className="font-semibold text-gray-800">{meal.name}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>everyday</span>
                    <span className="text-xl">•</span>
                    <span>🕐 {meal.time}</span>
                  </div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={meal.enabled}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Learn Next */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Learn next</h3>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700">See all →</a>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {learnNext.map((item, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="text-white text-2xl">▶</span>
              </div>
              <div className="p-2 bg-gray-50">
                <p className="font-semibold text-xs text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-600">{item.difficulty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NutritionSection

