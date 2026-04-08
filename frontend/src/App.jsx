import React, { useState } from 'react';
import { MapPin, Truck, AlertCircle, ShoppingCart } from 'lucide-react';
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
    <div className="min-h-screen p-6 max-w-lg mx-auto" style={{ fontFamily: 'Outfit, sans-serif', backgroundColor: '#f8fafc' }}>
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
            style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          >
            <h2 className="text-xl font-bold mb-4">Request Fuel Delivery</h2>
            
            <div className="flex gap-2 mb-6">
              {['Petrol', 'Diesel'].map(type => (
                <button
                  key={type}
                  onClick={() => setFuelType(type)}
                  style={{ 
                    flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid',
                    borderColor: fuelType === type ? '#f97316' : '#f1f5f9',
                    backgroundColor: fuelType === type ? '#fff7ed' : 'white',
                    color: fuelType === type ? '#f97316' : '#475569',
                    fontWeight: 'bold', transition: '0.2s'
                  }}
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
                style={{ width: '100%', accentColor: '#f97316' }}
              />
              <div className="text-center font-bold text-2xl mt-2 text-slate-800">{quantity} L</div>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px' }} className="mb-6 flex items-center gap-3">
                <MapPin className="text-orange-500" />
                <div className="text-sm">
                    <p className="font-semibold">Current Location Detected</p>
                    <p className="text-slate-500">M G Road, Bangalore, KA</p>
                </div>
            </div>

            <button 
                onClick={handleQuickFuel}
                style={{ 
                    width: '100%', background: 'linear-gradient(135deg, #ef4444, #b91c1c)', 
                    color: 'white', padding: '18px', borderRadius: '50px', 
                    fontWeight: 'bold', fontSize: '1.2rem', border: 'none',
                    boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)', cursor: 'pointer'
                }}
                className="flex items-center justify-center gap-3"
            >
                <AlertCircle /> QUICK FUEL
            </button>
          </motion.div>
        )}

        {orderStatus === 'ON_THE_WAY' && (
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             style={{ background: 'white', borderRadius: '24px', padding: '24px', textAlign: 'center', overflow: 'hidden' }}
           >
              <div style={{ background: '#dcfce7', color: '#166534', padding: '16px', margin: '-24px -24px 24px -24px', fontWeight: 'bold' }}>
                 <Truck className="inline-block mr-2" /> FUEL ON THE WAY
              </div>
              <p className="text-slate-500 mb-2">Delivery Partner: Manoj V</p>
              <h3 className="text-4xl font-black mb-4 text-slate-800">08:45</h3>
              <p className="text-slate-400 text-sm mb-6 uppercase tracking-widest">Minutes Away</p>
              
              <div style={{ background: '#e2e8f0', height: '180px', borderRadius: '16px', position: 'relative', marginBottom: '24px' }}>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{ position: 'absolute', top: '40%', left: '30%', width: '16px', height: '16px', background: '#f97316', borderRadius: '50%' }} 
                  />
              </div>

              <button onClick={() => setOrderStatus('IDLE')} className="text-slate-400 text-sm font-bold uppercase">Cancel Order</button>
           </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #e2e8f0', padding: '16px', display: 'flex', justifyContent: 'space-around', maxWidth: '512px', margin: '0 auto' }}>
        <ShoppingCart className="text-slate-300" />
        <MapPin className="text-orange-500" />
        <div style={{ background: '#fff7ed', padding: '12px', marginTop: '-40px', borderRadius: '16px', border: '5px solid white', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
           <AlertCircle className="text-red-500" strokeWidth={3} />
        </div>
        <Truck className="text-slate-300" />
        <div className="w-6 h-6 bg-slate-200 rounded-full" />
      </footer>
    </div>
  );
}

export default App;
