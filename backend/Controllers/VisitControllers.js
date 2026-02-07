import Visit from "../Models/Visit.js";

/**
 * @desc    Create a visit
 * @route   POST /api/visits
 * @access  Agent or Admin
 */
export const createVisit = async (req, res) => {
    try {
        const { lead, property, visitDate, status, feedback } = req.body;

        const visit = new Visit({
            lead,
            property,
            agent: req.user.id,
            visitDate,
            status,
            feedback
        });

        await visit.save();

        res.status(201).json({
            message: "Visit created successfully",
            visit
    });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
};

/**
 * @desc    Update visit
 * @route   PUT /api/visits/:id
 * @access  Agent (owner) or Admin
 */
export const updateVisit = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);

        if (!visit) {
            return res.status(404).json({ message: "Visit not found" });
    }

        if (
            req.user.role === "agent" &&
            visit.agent.toString() !== req.user.id
        ) {
            return res.status(403).json({ message: "Not authorized" });
    }

        const updatedVisit = await Visit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
    );

        res.status(200).json({
            message: "Visit updated successfully",
            visit: updatedVisit
    });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
};

/**
 * @desc    Delete visit
 * @route   DELETE /api/visits/:id
 * @access  Agent (owner) or Admin
 */
export const deleteVisit = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id);

        if (!visit) {
            return res.status(404).json({ message: "Visit not found" });
    }

        if (
            req.user.role === "agent" &&
            visit.agent.toString() !== req.user.id
    ) {
        return res.status(403).json({ message: "Not authorized" });
    }

        await visit.deleteOne();

        res.status(200).json({ message: "Visit deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
}
};

/**
 * @desc    Get all visits
 * @route   GET /api/visits
 * @access  Admin or Agent
 */
export const getAllVisits = async (req, res) => {
    try {
        let visits;

        if (req.user.role === "agent") {
            visits = await Visit.find({ agent: req.user.id })
            .populate("lead", "name email phone")
            .populate("property", "title location price")
            .populate("agent", "name")
            .sort({ visitDate: -1 });
        } else {
            visits = await Visit.find()
            .populate("lead", "name email phone")
            .populate("property", "title location price")
            .populate("agent", "name")
            .sort({ visitDate: -1 });
    }

        res.status(200).json({
            count: visits.length,
            visits
    });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
};

/**
 * @desc    Get visit by ID
 * @route   GET /api/visits/:id
 * @access  Agent (owner) or Admin
 */
export const getVisitById = async (req, res) => {
    try {
        const visit = await Visit.findById(req.params.id)
        .populate("lead", "name email phone")
        .populate("property", "title location price")
        .populate("agent", "name");

        if (!visit) {
            return res.status(404).json({ message: "Visit not found" });
    }

        if (
            req.user.role === "agent" &&
            visit.agent._id.toString() !== req.user.id
    ) {
        return res.status(403).json({ message: "Not authorized" });
    }

        res.status(200).json(visit);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};