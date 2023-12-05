import mongooseDb from 'mongoose'

export const connectDB = async ()=>{
    try {
        await mongooseDb.connect('mongodb://0.0.0.0/storedb');        
        console.log('db is connected');
    } catch (error) {
        console.log(error);
    }
}
