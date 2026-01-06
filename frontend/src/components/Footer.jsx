const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">PetAdopt</h3>
            <p className="text-gray-600 text-sm">
              Connecting loving families with pets in need of a home.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Browse Pets</li>
              <li>Adoption Process</li>
              <li>Care Tips</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <p className="text-gray-600 text-sm">Email: info@petadopt.com</p>
            <p className="text-gray-600 text-sm">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>&copy; 2024 PetAdopt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
