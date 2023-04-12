import jwt from "jsonwebtoken";
import db from "../db.js";
import cloudinary from "cloudinary";

export const getUser = (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res
            .status(401)
            .json({ success: false, data: "Please Log in to use more..." });
    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err)
            return res
                .status(401)
                .json({ success: false, data: "Token Is Expired" });

        let q = `SELECT * FROM users WHERE userId=?`;

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json({ success: false, err });

            return res.status(200).json({ success: true, data: data });
        });
    });
};

// Update User Details
export const updateUser = async (req, res) => {
    const { firstName, lastName, location, occupation, picturePath } = req.body;

    const token = req.cookies.token;
    if (!token)
        return res
            .status(401)
            .json({ success: false, data: "Please Log in to use more..." });
    jwt.verify(token, "secretKey", async (err, userInfo) => {
        if (err)
            return res
                .status(401)
                .json({ success: false, data: "Token Is Expired" });

        const q = "SELECT public_url FROM users WHERE userId=?";

        if (picturePath.length > 0) {
            db.query(q, [userInfo.id], async (err, data) => {
                await cloudinary.v2.uploader.destroy(data.data.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(
                    picturePath[0],
                    {
                        folder: "TwikTik",
                    }
                );
                req.body.public_url = myCloud.public_id;
                req.body.picturePath = myCloud.secure_url;
            });
        }

        if (userId) {
            const q =
                "UPDATE users SET (`firstName`,`lastName`,`location`,`occupation`,`picturePath`,`public_url`) values (?,?,?,?,?,?)";
            db.query(q, values, (err, data) => {});
            if (err) return res.status(500).json({ success: false, data: err });
            else return res.status(200).json({ success: true, data: data });
        } else {
            return res.status(200).json({
                success: false,
                message: "Please Enter valid userName.",
            });
        }
    });
};
