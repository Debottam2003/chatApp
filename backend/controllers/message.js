export const message = async (req, res) => {
    console.log(req.user_id);
    res.json({
        message: "Message delivered."
    });
}