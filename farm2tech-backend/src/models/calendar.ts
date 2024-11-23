import mongoose from "mongoose";

const schema = new mongoose.Schema(
     {
          // Define an array field to store dates
          dates: [
               {
                    type: Date,
                    required: true
               },
          ],
     },
     {
          timestamps: true
     },
);

export const Calender = mongoose.model("Calendar", schema);
