import sql from "../configs/db.js"

export const getUserCreations = async (req, res) => {
    try {
        // If your auth middleware already attaches userId & plan:
        let { userId, plan } = req;

        // If not, fall back to Clerk's req.auth()
        if (!userId) {
            const authData = req.auth?.();
            userId = authData?.userId;
        }

        // Query recent creations for this user
        const creations = await sql`
      SELECT * FROM creations 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

        // Fallback plan value
        plan = plan || 'free';

        res.json({ success: true, creations, plan });
    } catch (error) {
        console.error("Error in getUserCreations:", error);
        res.json({ success: false, message: error.message });
    }
};



export const getPublishCreations = async (req, res) => {
    try {
        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`

        res.json({ success: true, creations })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const toggleLikeCreations = async (req, res) => {
    try {
        const { userId } = req.auth()
        const { id } = req.body

        const [creations] = await sql`SELECT * FROM creations WHERE id = ${id}`

        if (!creations) {
            return res.json({ success: false, message: "creation not found" })
        }
        const currentLikes = creations.likes;
        const userIdStr = userId.toString()
        let updateLikes;
        let message;

        if (currentLikes.includes(userIdStr)) {
            updateLikes = currentLikes.filter((user) => user !== userIdStr);
            message = 'Creation Unliked'
        } else {
            updateLikes = [...currentLikes, userIdStr]
            message = 'Creation Liked'
        }

        const formattedArray = `{${updateLikes.join(',')}}`

        await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`;


        res.json({ success: true, message })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}