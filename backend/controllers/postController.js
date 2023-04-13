import jwt from "jsonwebtoken";
import db from "../db.js";
import cloudinary from "cloudinary";
// Create new Post
export const createPost = async (req, res) => {
    const { description, image = null } = req.body;
    if (image) {
        const data = await cloudinary.v2.uploader.upload(image, {
            folder: "TwikTik",
        });
        req.body.public_url = data.public_id;
        req.body.post_img = data.secure_url;
    }
    console.log("Post Img added to clodinary", req.body.post_img);
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
            "INSERT INTO posts (`description`,`post_img`,`userId`,`public_url`) VALUES (?,?,?,?)";
        const values = [
            description,
            req.body.post_img,
            userInfo.id,
            req.body.public_url,
        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json({ success: false, data: err });
            return res
                .status(200)
                .json({ success: true, data: "Post has been Creaed." });
        });
    });
};

// Get all timelink posts of user
export const timelinePosts = async (req, res) => {
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

        let q = `SELECT DISTINCT p.*,u.userId as userId,firstName,lastName,picturePath FROM posts AS p JOIN users AS u ON (u.userId=p.userId)  LEFT JOIN relationships AS r ON (p.userId=r.followedUserId ) WHERE r.followerUserId=? OR p.userId = ? ORDER BY p.createdAt DESC `;

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json({ success: false, err });
            return res.status(200).json({ success: true, data: data });
        });
    });
};

// Get Post by postId
export const getPost =
    ("/post/:postId",
    (req, res) => {
        const { postId } = req.params;

        const q = `SELECT * FROM posts WHERE postId=${postId}`;

        makeQuery(q, res);
    });

// Get Posts of User
export const getUserPosts = (req, res) => {
    const userId = req.params.id;

    const q = `SELECT * FROM posts WHERE userId=${userId}`;

    makeQuery(q, res);
};

// Update Post Details
export const updatePost = (req, res) => {
    const postId = req.params.id;
    const { title, description, post_img } = req.body;

    if (description) {
        const q = `UPDATE posts SET description='${description}' WHERE postId='${postId}'`;

        db.query(q, (err, data) => {
            if (err)
                return res.status(500).json({ success: false, message: err });
        });
    }
    if (post_img) {
        const q = `UPDATE posts SET post_img='${post_img}' WHERE postId='${postId}'`;

        makeQuery(q, res);
    }
};

// Delete post by postId

export const deletePost = (req, res) => {
    const postId = req.params.postId;

    const q = `DELETE FROM posts WHERE postId='${postId}'`;

    makeQuery(q, res);
};
