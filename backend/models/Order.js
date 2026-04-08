const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
    fuelType: { type: String, enum: ['Petrol', 'Diesel'], required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    deliveryCharge: { type: Number, default: 50 },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String }
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Picked', 'OnTheWay', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    otp: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
