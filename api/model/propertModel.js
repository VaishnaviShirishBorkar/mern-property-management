import mongoose from "mongoose";

const propertySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    type_property: {
      type: String,
      required: true,
    },

    parking: {
      type: Boolean,
    },

    bedrooms: {
      type: Number,
    },

    bathrooms: {
      type: Number,
    },

    file: {
      type: String,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
