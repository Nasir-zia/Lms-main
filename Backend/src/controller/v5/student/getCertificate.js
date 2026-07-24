import Student from "../../../model/User_Management/Student.schema.js";
import Course from "../../../model/course.schema.js";
import Certificate from "../../../model/certificate.schema.js";

const getCertificate = async (req, res) => {
  try {
    const { courseId } = req.params;
    const student = await Student.findOne({ userId: req.user.id });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student profile not found" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const courseProgress = student.progress.find(p => p.courseId.toString() === courseId);
    if (!courseProgress) {
      return res.status(400).json({ success: false, message: "Not enrolled in this course" });
    }

    const totalLessons = course.lessons.length;
    const completedCount = courseProgress.completedLessons.length;
    const percentComplete = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    if (percentComplete < 100) {
      return res.status(400).json({
        success: false,
        message: `Course not completed yet. Your progress is ${percentComplete}%. Complete 100% of the lessons to download certificate.`,
      });
    }

    let certificate = await Certificate.findOne({ studentId: req.user.id, courseId });
    if (!certificate) {
      const certUrl = `https://lms-cert-server.com/certificates/verify?student=${req.user.id}&course=${courseId}`;
      certificate = await Certificate.create({
        studentId: req.user.id,
        courseId,
        certificateUrl: certUrl,
      });

      student.certificate = certificate._id;
      await student.save();
    }

    return res.status(200).json({ success: true, message: "Certificate details retrieved", data: certificate });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error retrieving certificate", error: error.message });
  }
};

export default getCertificate;
