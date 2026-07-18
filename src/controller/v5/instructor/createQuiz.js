import Course from "../../../model/course.schema.js";
import Quiz from "../../../model/quiz.schema.js";

const createQuiz = async (req, res) => {
  try {
    const { courseId, title, description, timeLimit, questions } = req.body;

    if (!courseId || !title || !questions || questions.length === 0) {
      return res.status(400).json({ success: false, message: "courseId, title, and questions are required" });
    }

    const course = await Course.findOne({ _id: courseId, instructor: req.user.id });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found or unauthorized" });
    }

    const quiz = await Quiz.create({
      courseId,
      title,
      description,
      timeLimit,
      questions,
    });

    return res.status(201).json({ success: true, message: "Quiz created successfully", data: quiz });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating quiz", error: error.message });
  }
};

export default createQuiz;
