import { Schema, model, Document } from "mongoose";

export interface IContactUs extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const contactUsSchema = new Schema<IContactUs>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ContactUs = model<IContactUs>("ContactUs", contactUsSchema);

export default ContactUs;
