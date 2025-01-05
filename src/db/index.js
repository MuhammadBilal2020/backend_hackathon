import mongoose from "mongoose";

let connectDB = async () => {

    try {
        let connectionInstance  = await mongoose.connect(
           `${process.env.MONGO_URI}Backend_Hackathon`
        )
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);        

    }

    catch (error) {
        console.log(`monogo db connection failed ${error}` );
        process.exit(1);

    }

}

export default connectDB


//102030