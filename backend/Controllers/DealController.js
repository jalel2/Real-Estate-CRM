import Deal from "../Models/Deal.js";
import Property from "../Models/Property.js";

/**
 * @desc    Create deal & calculate commission
 * @route   POST /api/deals
 * @access  Agent or Admin
 */
export const createDeal = async (req, res) => {
    try {
        const {
            property,
            client,
            dealPrice,
            commissionRate,
            dealType
        } = req.body;

        // validate required fields
        if (!property || !client || (dealPrice === undefined) || !dealType) {
            return res.status(400).json({ message: "property, client, dealPrice and dealType are required" });
        }

        // coerce numeric values
        const parsedDealPrice = Number(dealPrice);
        const parsedCommissionRate = commissionRate !== undefined ? Number(commissionRate) : 3;

        // calculate commission
        const commissionAmount = (parsedDealPrice * (parsedCommissionRate || 3)) / 100;

        const deal = new Deal({
            property,
            client,
            agent: req.user.id,
            dealDate: new Date(),
            dealPrice: parsedDealPrice,
            commissionRate: parsedCommissionRate,
            commissionAmount,
            dealType,
            status: "closed"
        });

        await deal.save();

    // update property status
        await Property.findByIdAndUpdate(property, {
            status: dealType === "sale" ? "sold" : "rented"
    });

        res.status(201).json({
            message: "Deal closed successfully",
            deal
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};