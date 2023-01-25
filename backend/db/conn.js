const mongoose=require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("succefully connected to the backend");
})
.catch((err)=>{
    console.log(`here is some preoblem in connection ofdatabase ${err}`);
});