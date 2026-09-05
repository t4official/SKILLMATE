import { useState } from "react";
import careers from "../data/careers";

function CareerAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm skillmate AI. Ask me anything about your career, skills, courses, salary or roadmap.",
    },
  ]);

  const student =
    JSON.parse(localStorage.getItem("skillmateStudent")) || {};

  const savedCareer =
    JSON.parse(localStorage.getItem("skillmateSavedResult")) || {};

  const currentCareer = careers.find(
    (career) => career.name === savedCareer.career
  );

  const generateReply = (question) => {
    const career = currentCareer || {};

    const careerName = career.name || "your recommended career";

    const skills = career.skillsToLearn || [];
    const degrees = career.degrees || [];
    const courses = career.courses || [];
    const jobRoles = career.jobRoles || [];
    const roadmap = career.roadmap || [];
    const salary = career.salary || {};

    const lowerQuestion = question.toLowerCase().trim();

    if (
      lowerQuestion.includes("hello") ||
      lowerQuestion.includes("hi") ||
      lowerQuestion.includes("hey")
    ) {
      return `Hi ${student.name || "there"}! 👋 I'm skillmate AI. Your recommended career is ${careerName}. What would you like to know?`;
    }

    if (
      lowerQuestion.includes("skill") ||
      lowerQuestion.includes("skills") ||
      lowerQuestion.includes("learn")
    ) {
      if (skills.length === 0) {
        return `Currently, skill information is not available for ${careerName}.`;
      }

      return `${careerName} ki important skills: ${skills.join(", ")}.`;
    }

    if (
      lowerQuestion.includes("degree") ||
      lowerQuestion.includes("study") ||
      lowerQuestion.includes("education")
    ) {
      if (degrees.length === 0) {
        return `Currently, degree information is not available for ${careerName}.`;
      }

      return `${careerName} kosam recommended degrees: ${degrees.join(", ")}.`;
    }

    if (
      lowerQuestion.includes("salary") ||
      lowerQuestion.includes("package") ||
      lowerQuestion.includes("earn")
    ) {
      const entrySalary = salary.entry || "Not available";
      const experiencedSalary =
        salary.experienced || "Not available";

      return `${careerName} lo entry-level salary ${entrySalary}. Experienced level lo ${experiencedSalary} varaku undachu.`;
    }

    if (
      lowerQuestion.includes("job") ||
      lowerQuestion.includes("jobs") ||
      lowerQuestion.includes("role") ||
      lowerQuestion.includes("roles")
    ) {
      if (jobRoles.length === 0) {
        return `Currently, job role information is not available for ${careerName}.`;
      }

      return `${careerName} lo possible job roles: ${jobRoles.join(", ")}.`;
    }

    if (
      lowerQuestion.includes("course") ||
      lowerQuestion.includes("courses")
    ) {
      if (courses.length === 0) {
        return `Currently, courses information is not available for ${careerName}.`;
      }

      return `${careerName} ki recommended courses: ${courses
        .map(
          (course) =>
            `${course.name}${course.duration ? ` (${course.duration})` : ""}`
        )
        .join(", ")}.`;
    }

    if (
      lowerQuestion.includes("roadmap") ||
      lowerQuestion.includes("path") ||
      lowerQuestion.includes("steps") ||
      lowerQuestion.includes("journey")
    ) {
      if (roadmap.length === 0) {
        return `Currently, roadmap information is not available for ${careerName}.`;
      }

      return `${careerName} roadmap: ${roadmap
        .map((step, index) => `${index + 1}. ${step}`)
        .join(" → ")}`;
    }

    if (
      lowerQuestion.includes("why") ||
      lowerQuestion.includes("recommend") ||
      lowerQuestion.includes("suitable") ||
      lowerQuestion.includes("best career")
    ) {
      if (currentCareer) {
        return `${careerName} is your recommended career based on your assessment results, including your interests, skills, goals and academic profile.`;
      }

      return "Complete the career assessment first, and I'll explain why a career is recommended for you.";
    }

    if (
      lowerQuestion.includes("first") ||
      lowerQuestion.includes("start") ||
      lowerQuestion.includes("begin")
    ) {
      if (skills.length > 0) {
        const nextSkills = skills.slice(1, 4);

        return `To start your ${careerName} journey, first focus on ${skills[0]}.${
          nextSkills.length > 0
            ? ` After that, build ${nextSkills.join(", ")}.`
            : ""
        }`;
      }

      return `Start by learning the fundamentals required for ${careerName}.`;
    }

    if (
      lowerQuestion.includes("my career") ||
      lowerQuestion.includes("recommended career") ||
      lowerQuestion === "career"
    ) {
      if (currentCareer) {
        return `Your recommended career is ${careerName}. Your current skillmate score is ${
          savedCareer.score || 0
        }%.`;
      }

      return "You haven't completed a career assessment yet.";
    }

    if (
      lowerQuestion.includes("score") ||
      lowerQuestion.includes("result") ||
      lowerQuestion.includes("match")
    ) {
      if (savedCareer.career) {
        return `Your skillmate result is ${careerName} with a career fit score of ${
          savedCareer.score || 0
        }%.`;
      }

      return "I couldn't find a saved career assessment result. Please complete the assessment first.";
    }

    return `I can help you with ${careerName}. You can ask me about skills, degrees, courses, salary, job roles, roadmap, career fit, or what you should learn first.`;
  };

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    const userMessage = {
      sender: "user",
      text: trimmedMessage,
    };

    const aiMessage = {
      sender: "ai",
      text: generateReply(trimmedMessage),
    };

    setMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      aiMessage,
    ]);

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="career-ai-floating-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open skillmate AI"
        >
          🤖
        </button>
      )}

      {isOpen && (
        <div className="career-ai-panel">
          <div className="career-ai-header">
            <div>
              <strong>skillmate AI</strong>
              <span>Your Career Assistant</span>
            </div>

            <button
              className="career-ai-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close skillmate AI"
            >
              ×
            </button>
          </div>

          <div className="career-ai-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`career-ai-message ${
                  item.sender === "user"
                    ? "career-ai-user"
                    : "career-ai-bot"
                }`}
              >
                {item.text}
              </div>
            ))}
          </div>

          <div className="career-ai-input-area">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your career..."
            />

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default CareerAssistant;