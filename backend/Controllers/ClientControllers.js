import Client from "../Models/Client.js";

export const createClient = async (req, res) => {
    try {
        const { name, email, phone, address, note } = req.body;

        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: "Client already exists" });
        }

        const newClient = new Client({
            name,
            email,
            phone,
            address,
            note
        });

        await newClient.save();

        res.status(201).json({
            message: "Client created successfully",
            client: newClient
        });
        } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
}
};


export const updateClient = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true });

        res.status(200).json({
            message: "Client updated successfully",
            client: updatedClient
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteClient = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Only admin can delete clients" });
    }

        const client = await Client.findById(req.params.id);

        if (!client) {
            return res.status(404).json({ message: "Client not found" });}
        await client.deleteOne();
        res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });}
};


export const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: clients.length,
            clients});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
}
};