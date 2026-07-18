import mongoose from "mongoose";


const instructorAssignmentSchema = new mongoose.Schema({
    AssignmentName: {
        type: String,
        required: true},
            Date: {
                type: Date,
                required: true},
                maxMarks: {
                    type: Number,
                    required: true}


})

const assignment =  mongoose.model("InstructorAssignment", instructorAssignmentSchema);

export default assignment;