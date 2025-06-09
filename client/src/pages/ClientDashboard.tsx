import React from 'react';

const ClientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Client Dashboard</h1>
        
        {/* Appointments Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Your Appointments</h2>
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-white font-medium">Haircut</h3>
                  <p className="text-gray-400">March 15, 2024 - 2:30 PM</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600">
                    Reschedule
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <button className="mt-4 w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600">
            Book New Appointment
          </button>
        </div>
        
        {/* Profile Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Your Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                value="John Doe"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                value="john@example.com"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                value="+1 234 567 890"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Preferred Service</label>
              <input
                type="text"
                className="w-full bg-gray-700 text-white rounded-md px-3 py-2"
                value="Haircut"
                readOnly
              />
            </div>
          </div>
          
          <button className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard; 