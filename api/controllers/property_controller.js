import Property from "../model/propertModel.js";

export const createProperty = async (req, res) => {
  const { title, description, address, type_property, parking, bedrooms, bathrooms } = req.body;

  // If you're using multer, remember that the 'file' field is in req.file
  const file = req.file ? req.file.filename : null;

  try {
    const newProperty = new Property({
      title,
      description,
      address,
      type_property,
      parking: parking === 'true', // Convert string to boolean
      bedrooms,
      bathrooms,
      file,  // Store the filename
    });

    await newProperty.save();
    return res.status(201).json(newProperty);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error creating property' });
  }
};


export const getPropertyList = async(req,res) => {
    try {
        const properties = await Property.find();
        res.status(201).json(properties);
    } catch (error) {
        res.json(error);
        console.log(error);
    }
}

export const updateProperty = async (req, res) => {
    const { id } = req.params;

    // Destructure fields from req.body
    const { title, description, address, type_property, parking, bedrooms, bathrooms } = req.body;

    // If you're using multer, remember that the 'file' field is in req.file
    const file = req.file ? req.file.filename : null;
    console.log(file);

    // Construct the update data object
    const updateData = {
        title,
        description,
        address,
        type_property,
        parking: parking === 'true', // Convert string to boolean
        bedrooms,
        bathrooms,
        ...(file && { file }) // Include file only if it exists
    };

    try {
        const updatedProperty = await Property.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        return res.status(200).json(updatedProperty);
    } catch (error) {
        console.error("Error updating property:", error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
};


export const deleteProperty = async (req, res) => {
    const { id } = req.params; // Extract property ID from the route parameters

    try {
        // Find the property by ID and delete it
        const deletedProperty = await Property.findByIdAndDelete(id);

        if (!deletedProperty) {
            return res.status(404).json({ message: "Property not found" });
        }

        return res.status(201).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting property", error });
        console.log(error);
    }
}

export const getPropertyById = async(req,res) => {
    const {id} = req.params;

    try {
    const property = await Property.findById(id);
    
    if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
      
      res.status(200).json(property);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching property', error });
    }
}