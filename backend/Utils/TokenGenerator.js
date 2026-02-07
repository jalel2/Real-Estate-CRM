import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    try{
        const token = jwt.sign({id: userId,role:userId.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        return null;
    }
};

export default generateToken;