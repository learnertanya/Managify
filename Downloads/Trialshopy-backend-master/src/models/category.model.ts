import { Model, model, Schema, Document } from "mongoose";

export enum CategoryStatus {
  ACTIVE = "active",
  INACTIVE = "inactive"
}

export interface ICategory extends Document {
  name: string;
  description: string;
  detailedDescription?: string;
  subDescriptions?: string[];
  parent?: string | null;
  image: {
    filename?: string;
    url?: string;
  };
  featured: boolean;
}

const categorySchema: Schema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: false },
  subDescriptions: [{ type: String, required: false }],
  parent: { type: String, required: false, default: null },
  image: {
    filename: { type: String, required: false },
    url: { type: String, required: false }
  },
  featured: { type: Boolean, default: false }
});

const Category: Model<ICategory> = model<ICategory>("Category", categorySchema);
export default Category;
