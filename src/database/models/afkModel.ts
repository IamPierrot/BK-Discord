import { Document, model, Schema } from "mongoose";

interface IAfkSchema extends Document {
    userId: string
    notification: string
    timeStarted: number
}

const afkSchema = new Schema<IAfkSchema>({
    userId: String,
    notification: String,
    timeStarted: Number,
});

const afkModel = model('afk', afkSchema);

export default afkModel;