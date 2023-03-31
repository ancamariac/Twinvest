const TwitterCardSchema = require("../models/TweetModel")

exports.addTweet = async (req, res) => {
    const {name, username, description, date, /*profile,*/ url, tags}  = req.body

    //const userid = req.user["_id"];

    //console.log('User ID:', userid);
    console.log('Tweet:', {name, username, description, date, /*profile,*/ url, tags});

    const tweet = TwitterCardSchema({
        name, 
        username, 
        description, 
        date, 
        /*profile,*/ 
        url, 
        tags
    })

    try {
        //validations
        if(!name || !username || !description || !date || !url || !tags){
            return res.status(400).json({message: 'All fields are required!'})
        }
        await tweet.save()
        res.status(200).json({message: 'Tweet Added'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }

    console.log(tweet)
}

exports.getTweets = async (req, res) =>{
    const userId = req.user["_id"];
    try {
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

/*exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) =>{
            res.status(200).json({message: 'Expense Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}*/