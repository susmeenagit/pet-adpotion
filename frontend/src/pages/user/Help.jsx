import { useState } from 'react'
import UserSidebar from '../../components/UserSidebar'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const faqs = [
    {
      category: 'general',
      question: 'How do I add a new pet?',
      answer: 'You can add a new pet by clicking the "+" button in the "Your Pets" section of the sidebar, or by browsing available pets and submitting an adoption request.',
    },
    {
      category: 'nutrition',
      question: 'How do I schedule meals for my pet?',
      answer: 'Go to your pet\'s profile, click on the "Nutrition" tab, and use the "Scheduled Meals" section to set up meal times and frequencies.',
    },
    {
      category: 'health',
      question: 'How do I record a vet visit?',
      answer: 'Navigate to your pet\'s profile, click on the "Health Card" tab, and you can add vet visit records in the "Vet Visit History" section.',
    },
    {
      category: 'activities',
      question: 'How do I log a walk?',
      answer: 'In the Activities section of your pet\'s profile, you can add new walks and track your pet\'s exercise routine.',
    },
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <UserSidebar />
      
      <div className="flex-1 ml-72 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Help Center</h1>
          <p className="text-gray-600">Find answers to common questions</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            <span className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6">
          {['all', 'general', 'nutrition', 'health', 'activities'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-600">No results found. Try a different search term.</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Still need help?</h3>
          <p className="text-gray-600 mb-4">Contact our support team for assistance.</p>
          <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default Help

