import Student from "../../model/Student.schema.js";


//  Now we will create the controller of the student which will handle all the logic related to the student

const create_student = async (req, res) => {
    const { Profile_picture, degree, semester, Bio, course, certificate } = req.body;
    if(!Profile_picture ,degree , semester , Bio , course , certificate){
        alert ("Please fill all the fields ")
    }
    try {
        const student = new student ({
            
        })
        
    } catch (error) {
        
    }
}

export default  create_student;