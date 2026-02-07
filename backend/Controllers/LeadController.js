import Lead from "../Models/Lead.js";
import User from "../Models/User.js";
import Client from "../Models/Client.js";

export const createLead = async (req, res) => {
    try {
        const { name, email, phone, leadSource,note,typeofProperty,budget,location } = req.body;
        const agent = await User.findById(req.user.id);

        const existingLead = await Lead.findOne({ email });
        if (existingLead) {
            return res.status(400).json({ message: "Lead already exists" });
        }
        
        const newLead = new Lead({
            name,
            email,
            phone,
            leadSource,
            note,
            typeofProperty,
            budget,
            location,
            createdByAgent: agent._id
        });
        await newLead.save();
        res.status(201).json({
            message: "Lead created successfully",
            lead: newLead
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        const agent = await User.findById(req.user.id);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        if (req.user.role === "agent" && lead.createdByAgent.toString() !== agent._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            message: "Lead updated successfully",
            lead: updatedLead
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        const agent = await User.findById(req.user.id);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        if (req.user.role === "agent" && lead.createdByAgent.toString() !== agent._id.toString()) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await lead.deleteOne();

        res.status(200).json({ message: "Lead deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getLeads = async (req, res) => {
    try {
        let leads;
        if (req.user.role === "admin") {
            leads = await Lead.find().populate("createdByAgent", "name email");
        } else if (req.user.role === "agent") {
            leads = await Lead.find({ createdByAgent: req.user.id }).populate("createdByAgent", "name email");
        } else {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.status(200).json({ leads });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id).populate("createdByAgent", "name email");
        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        if (req.user.role === "agent" && lead.createdByAgent._id.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        res.status(200).json({ lead });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * @desc    Convert lead to client
 * @route   POST /api/leads/:id/convert
 * @access  Agent or Admin
 */
export const convertLeadToClient = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });}

    // check if already converted
        const existingClient = await Client.findOne({ email: lead.email });
        if (existingClient) {
            return res.status(400).json({ message: "Lead already converted" });
    }

        const newClient = new Client({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            address: lead.address || "",
            note: "Converted from lead"
    });

        await newClient.save();

    // optional: mark lead as converted
        lead.status = "converted";
        await lead.save();

        res.status(201).json({
            message: "Lead converted to client successfully",
            client: newClient
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};