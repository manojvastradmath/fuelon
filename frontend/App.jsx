import React, { useState } from 'react';
import { ShoppingCart, MapPin, Truck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [orderStatus, setOrderStatus] = useState('IDLE'); // IDLE, ORDERED, ON_THE_WAY
  const [fuelType, setFuelType] = useState('Petrol');
  const [quantity, setQuantity] = useState(5);

  const handleQuickFuel = () => {
    setOrderStatus('ORDERED');
    setTimeout(() => setOrderStatus('ON_THE_WAY'), 2000);
  };

  return (
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
           <img src="/logo.png" alt="FuelNow Logo" className="w-12 h-12 object-contain" />
           <h1 className="text-3xl font-extrabold text-orange-600">FuelNow</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
           <img src="https://ui-avatars.com/api/?name=Manoj+V&background=f97316&color=fff" alt="User" />
        </div>
      </header>

      {/* Main Order Card */}
      <AnimatePresence mode='wait'>
        {orderStatus === 'IDLE' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card"
          >
            <h2 className="text-xl font-bold mb-4">Request Fuel Delivery</h2>
            
            <div className="flex gap-2 mb-6">
              {['Petrol', 'Diesel'].map(type => (
                <button
                  key={type}
                  onClick={() => setFuelType(type)}
                  className={`flex-1 py-3 rounded-xl border-2 transition ${fuelType === type ? 'border-orange-500 bg-orange-50' : 'border-slate-100'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-sm text-slate-500 mb-2">Quantity (Liters)</label>
              <input 
                type="range" min="1" max="50" step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full accent-orange-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center font-bold text-2xl mt-2 text-slate-800">{quantity} L</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl mb-6 flex items-center gap-3">
                <MapPin className="text-orange-500" />
                <div className="text-sm">
                    <p className="font-semibold">Current Location Detected</p>
                    <p className="text-slate-500">M G Road, Bangalore, KA</p>
                </div>
            </div>

            <button 
                onClick={handleQuickFuel}
                className="emergency-btn w-full flex items-center justify-center gap-3"
            >
                <AlertCircle /> QUICK FUEL
            </button>
          </motion.div>
        )}

        {orderStatus === 'ON_THE_WAY' && (
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="card text-center overflow-hidden"
           >
              <div className="bg-green-100 p-6 -m-6 mb-8 text-green-700 flex justify-center items-center gap-2 font-bold">
                 <Truck className="animate-bounce" /> FUEL ON THE WAY
              </div>
              <p className="text-slate-500 mb-2">Delivery Partner: Manoj V</p>
              <h3 className="text-3xl font-bold mb-4">ETA: 08:45 mins</h3>
              
              {/* Dummy Map Visual */}
              <div className="w-full h-48 bg-slate-200 rounded-xl relative overflow-hidden mb-4">
                  <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-orange-600 rounded-full shadow-lg pulse" />
                  <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-blue-600 rounded-full shadow-lg" />
              </div>

              <button className="text-orange-600 font-bold">CANCEL ORDER</button>
           </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-around max-w-lg mx-auto">
        <ShoppingCart className="text-slate-400" />
        <MapPin className="text-orange-600" />
        <motion.div whileHover={{ scale: 1.2 }} className="bg-orange-100 p-2 rounded-lg -mt-10 border-4 border-white shadow-xl">
           <AlertCircle className="text-red-600" />
        </motion.div>
        <Truck className="text-slate-400" />
        <div className="w-6 h-6 bg-slate-200 rounded-full" />
      </footer>
    </div>
  );
}

export default App;
