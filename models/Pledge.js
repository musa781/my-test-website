// models/Pledge.js
import mongoose from 'mongoose';

const PledgeSchema = new mongoose.Schema({
  shopifyOrderId: { type: String, required: true, unique: true },
  customerEmail: { type: String, required: true },
  productTitle: { type: String, required: true },
  depositPaid: { type: Number, default: 2.00 },
  invoiceUrl: { type: String, required: true },
  status: { type: String, default: 'Pending Balance' }, // Jab wo baqi pay kar dega toh isay 'Completed' kar denge
}, { timestamps: true });

// Next.js mein models bar bar compile hote hain, is liye hum check karte hain ke pehle se bana hai ya nahi
export default mongoose.models.Pledge || mongoose.model('Pledge', PledgeSchema);