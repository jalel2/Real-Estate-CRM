import Property from "../Models/Property.js";
import User from "../Models/User.js";

/**
 * @desc    Add new property
 * @route   POST /api/properties
 * @access  Agent only
 */
export const addProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            location,
            propertyType,
            purpose,
            status,
            images
        } = req.body;

        // fetch agent name from user id in token
        const agent = await User.findById(req.user.id);
        if (!agent) return res.status(404).json({ message: "Agent not found" });

        const newProperty = new Property({
            title,
            description,
            price,
            location,
            propertyType,
            purpose,
            status,
            images,
            createdbyagent: agent.name
        });
        await newProperty.save();
        res.status(201).json({
            message: "Property added successfully",
            property: newProperty
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }};


export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        const agent = await User.findById(req.user.id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });}


        if (req.user.role === "agent" && property.createdbyagent !== agent.name) {
            return res.status(403).json({ message: "Not authorized" });}

        const updatedProperty = await Property.findByIdAndUpdate(req.params.id,req.body,{ new: true });

        res.status(200).json({message: "Property updated successfully",property: updatedProperty});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        const agent = await User.findById(req.user.id);

        if (!property) {return res.status(404).json({ message: "Property not found" });}

    
        if (req.user.role === "agent" && property.createdbyagent !== agent.name) {
            return res.status(403).json({ message: "Not authorized" });}

        await property.deleteOne();

        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find();
        res.status(200).json({ properties });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json({ property });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



