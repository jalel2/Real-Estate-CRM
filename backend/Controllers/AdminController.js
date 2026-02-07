import User from "../Models/User.js";
import bcrypt from "bcryptjs";

/**
 * REGISTER AGENT
 * Only ADMIN can create agents
 */
export const registerAgent = async (req, res) => {
    try {
        // 1. Check role (from JWT middleware)
        console.log("REQ USER:", req.user);
        console.log("Role:", req.user.role);
        if (req.user.role !== "admin") {
            return res.status(403).json({
                
                message: "Access denied. Only admin can create agents."
            });
        }
        
        
        const { name, email, password, phone } = req.body;

    // 2. Check if agent already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                message: "Agent already exists"
            });
        }

    // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create agent
        const agent = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: "agent"
    });

        await agent.save();

    // 5. Response
        res.status(201).json({
            message: "Agent registered successfully",
            agent: {
            id: agent._id,
            name: agent.name,
            email: agent.email,
            phone: agent.phone,
            role: agent.role
        }
    });
    } catch (error) {
        res.status(500).json({
        message: "Server error",
        error: error.message
    });
}
};
export default{registerAgent};