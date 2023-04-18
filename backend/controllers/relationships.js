import db from "../db.js";
import jwt from "jsonwebtoken";
export const getRelationships = (req, res) => {
    let q =
        "SELECT userId,firstName,lastName,location,picturePath FROM users as u JOIN (SELECT followerUserId FROM relationships WHERE followedUserId=?) as e ON u.userId=e.followerUserId;";

    db.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json({ success: false, data: err });
        return res.status(200).json({
            success: true,
            data: data,
        });
    });
};

export const addRelationships = async (req, res) => {
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
        let q =
            "SELECT  * FROM relationships WHERE `followedUserId`=? AND `followerUserId`=?";
        db.query(q, [req.body.userId, userInfo.id], (err, data) => {
            if (data.length) {
                return res.status(500).json("User already followed by you");
            }
            q =
                "INSERT INTO relationships (`followedUserId`,`followerUserId`) VALUES (?,?)";
            const values = [req.body.userId, userInfo.id];

            db.query(q, values, (err, data) => {
                if (err)
                    return res.status(500).json({ success: false, data: err });
                return res.status(200).json({
                    success: true,
                    data: "User has been followed.",
                });
            });
        });
    });
};

export const deleteRelationships = async (req, res) => {
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

        let q =
            "DELETE FROM relationships WHERE `followedUserId`=? AND `followerUserId`=?";
        const values = [req.query.userId, userInfo.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json({ success: false, data: err });
            return res
                .status(200)
                .json({ success: true, data: "User has been unfollowed." });
        });
    });
};
