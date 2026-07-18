import Quiz from "../../../model/quiz.schema.js";

const takeQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    let score = 0;
    const results = quiz.questions.map((q, idx) => {
      const studentAns = answers[idx];
      const correctAns = q.correctAnswerIndex;
      const isCorrect = studentAns === correctAns;
      if (isCorrect) score += 1;
      return {
        questionText: q.questionText,
        selectedAnswer: studentAns !== undefined ? q.options[studentAns] : null,
        correctAnswer: q.options[correctAns],
        isCorrect,
      };
    });

    const maxMarks = quiz.timeLimit ? 10 : 100; // default max marks logic helper
    const marksObtained = Math.round((score / quiz.questions.length) * maxMarks);

    return res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
      data: {
        score,
        totalQuestions: quiz.questions.length,
        maxMarks,
        marksObtained,
        results,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error taking quiz", error: error.message });
  }
};

export default takeQuiz;
