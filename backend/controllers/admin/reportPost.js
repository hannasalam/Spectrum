const reportPost = async (req,res) =>
{
    try
    {
        const type = req.params.content;
        const id = req.params.id;
        const DB = require(`../../models/${type}`)
        const result = await DB.updateOne({_id:id},{$set:{"isReported":true}})
        res.status(200).send(result)
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({message: "Something went wrong"})
    }
}

module.exports = {reportPost};