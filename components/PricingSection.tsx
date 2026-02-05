'use client';

export function PricingSection() {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
      <p className="text-gray-600 mb-8">Start free, upgrade when you grow</p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Free</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
            <p className="text-gray-500 mb-6">Perfect for getting started</p>
            
            <ul className="text-left space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                3 invoices per month
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                PDF download
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Basic templates
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Email support
              </li>
            </ul>
            
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Current Plan
            </button>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="bg-white border-2 border-blue-500 rounded-lg p-6 shadow-lg relative">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </span>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">$9</div>
            <p className="text-gray-500 mb-6">per month</p>
            
            <ul className="text-left space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Unlimited invoices
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Custom branding
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Multiple templates
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Payment tracking
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Priority support
              </li>
            </ul>
            
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>

        {/* Business Plan */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-md">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Business</h3>
            <div className="text-3xl font-bold text-gray-900 mb-1">$29</div>
            <p className="text-gray-500 mb-6">per month</p>
            
            <ul className="text-left space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Everything in Pro
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Multi-user access
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                API access
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                Advanced reporting
              </li>
              <li className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                White-label options
              </li>
            </ul>
            
            <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-500 mt-6">
        All plans include SSL security and 99.9% uptime guarantee
      </p>
    </div>
  );
}