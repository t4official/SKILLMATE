import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Assessment() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [student, setStudent] = useState({
    name: "",
    age: "",
    college: "",
      year: "",
    studentId: "",
    stream: "",

    firstYearMarks: "",
    secondYearMarks: "",

    interests: [],
    skills: [],

    workStyle: "",
    goal: ""
  });

  const updateField = (field, value) => {
    setStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleArrayValue = (field, value) => {
    setStudent(prev => {
      const current = prev[field];

      return {
        ...prev,
        [field]: current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value]
      };
    });
  };

  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      localStorage.setItem(
        "skillmateStudent",
        JSON.stringify(student)
      );

      navigate("/result");
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="assessment-page">

      <div className="assessment-header">

        <div className="logo">
          <div className="logo-mark">C</div>

          <div>
            <h2>skillmate</h2>
            <span>Your Future. Our Guidance.</span>
          </div>
        </div>

        <div className="step-counter">
          Step {step} of 5
        </div>

      </div>


      <div className="assessment-progress">

        <div
          className="assessment-progress-fill"
          style={{
            width: `${(step / 5) * 100}%`
          }}
        />

      </div>


      <main className="assessment-container">

        {step === 1 && (
          <ProfileStep
            student={student}
            updateField={updateField}
          />
        )}

        {step === 2 && (
          <AcademicStep
            student={student}
            updateField={updateField}
          />
        )}

        {step === 3 && (
          <InterestStep
            student={student}
            toggleArrayValue={toggleArrayValue}
          />
        )}

        {step === 4 && (
          <SkillStep
            student={student}
            toggleArrayValue={toggleArrayValue}
          />
        )}

        {step === 5 && (
          <PreferenceStep
            student={student}
            updateField={updateField}
          />
        )}


        <div className="assessment-navigation">

          {step > 1 ? (
            <button
              className="secondary-btn"
              onClick={previousStep}
            >
              ← Back
            </button>
          ) : (
            <div />
          )}


          <button
            className="primary-btn"
            onClick={nextStep}
          >
            {step === 5
              ? "Analyze My Career →"
              : "Continue →"}
          </button>

        </div>

      </main>

    </div>
  );
}


/* ================= PROFILE ================= */

function ProfileStep({ student, updateField }) {

  return (
    <div className="assessment-card">

      <div className="assessment-icon">
        👋
      </div>

      <h1>Let's get to know you</h1>

      <p className="assessment-description">
        Tell us a little about yourself so we can understand
        your interests and guide you toward the right path after Intermediate.
      </p>


      <div className="form-grid">

        <div className="form-group">

          <label>Your Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={student.name}
            onChange={e =>
              updateField("name", e.target.value)
            }
          />

        </div>


        <div className="form-group">

          <label>Age</label>

          <input
            type="number"
            placeholder="Enter your age"
            value={student.age}
            onChange={e =>
              updateField("age", e.target.value)
            }
          />

        </div>

      </div>


      <div className="form-grid">

        <div className="form-group">

          <label>College Name</label>

          <input
            type="text"
            placeholder="Enter your college name"
            value={student.college}
            onChange={e =>
              updateField("college", e.target.value)
            }
          />

        </div>


        <div className="form-group">

          <label>Intermediate Year</label>

          <select
            value={student.year}
            onChange={e =>
              updateField("year", e.target.value)
            }
          >
            <option value="">Select your year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
          </select>

        </div>

      </div>


      <div className="form-grid">

        <div className="form-group">

          <label>Student ID</label>

          <input
            type="text"
            placeholder="Enter your student ID"
            value={student.studentId}
            onChange={e =>
              updateField("studentId", e.target.value)
            }
          />

        </div>




      </div>


      <div className="form-group">

        <label>Intermediate Stream</label>

        <div className="option-grid">

          {[
            "MPC",
            "BiPC",
            "MEC",
            "CEC",
            "Arts / Humanities"
          ].map(stream => (

            <button
              key={stream}
              className={
                student.stream === stream
                  ? "option-card selected"
                  : "option-card"
              }
              onClick={() =>
                updateField("stream", stream)
              }
            >
              {stream}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}


/* ================= ACADEMIC ================= */

function AcademicStep({ student, updateField }) {

  return (
    <div className="assessment-card">

      <div className="assessment-icon">
        📊
      </div>

      <h1>Your Academic Performance</h1>

      <p className="assessment-description">
        Enter your total marks from both years of
        Intermediate.
      </p>


      <div className="marks-grid">

        <div className="form-group">

          <label>1st Year Total Marks</label>

          <input
            type="number"
            placeholder="Enter total marks"
            value={student.firstYearMarks}
            onChange={e =>
              updateField(
                "firstYearMarks",
                e.target.value
              )
            }
          />

        </div>


        <div className="form-group">

          <label>2nd Year Total Marks</label>

          <input
            type="number"
            placeholder="Enter total marks"
            value={student.secondYearMarks}
            onChange={e =>
              updateField(
                "secondYearMarks",
                e.target.value
              )
            }
          />

        </div>

      </div>


      <div className="info-box">
        💡 Marks are only one part of your career analysis.
        Your interests, skills and goals are also considered.
      </div>

    </div>
  );
}


/* ================= INTERESTS ================= */

function InterestStep({
  student,
  toggleArrayValue
}) {

  const interests = [
    "Technology",
    "Data & Analytics",
    "Business",
    "Finance",
    "Healthcare",
    "Research",
    "Design & Creativity",
    "Law",
    "Government",
    "Media"
  ];

  return (
    <div className="assessment-card">

      <div className="assessment-icon">
        ❤️
      </div>

      <h1>What are you interested in?</h1>

      <p className="assessment-description">
        Select all areas that genuinely interest you.
      </p>


      <div className="option-grid">

        {interests.map(interest => (

          <button
            key={interest}
            className={
              student.interests.includes(interest)
                ? "option-card selected"
                : "option-card"
            }
            onClick={() =>
              toggleArrayValue(
                "interests",
                interest
              )
            }
          >
            {interest}
          </button>

        ))}

      </div>

    </div>
  );
}


/* ================= SKILLS ================= */

function SkillStep({
  student,
  toggleArrayValue
}) {

  const skills = [
    "Technical Skills",
    "Problem Solving",
    "Analytical Thinking",
    "Creativity",
    "Communication",
    "Writing",
    "Research",
    "Business Thinking"
  ];

  return (
    <div className="assessment-card">

      <div className="assessment-icon">
        🧠
      </div>

      <h1>What are your strengths?</h1>

      <p className="assessment-description">
        Choose the skills you feel are your strongest.
      </p>


      <div className="option-grid">

        {skills.map(skill => (

          <button
            key={skill}
            className={
              student.skills.includes(skill)
                ? "option-card selected"
                : "option-card"
            }
            onClick={() =>
              toggleArrayValue(
                "skills",
                skill
              )
            }
          >
            {skill}
          </button>

        ))}

      </div>

    </div>
  );
}


/* ================= PREFERENCES ================= */

function PreferenceStep({
  student,
  updateField
}) {

  const workStyles = [
    "Computer / Desk Work",
    "Technical Work",
    "Creative Work",
    "People Oriented",
    "Research Oriented",
    "Business Oriented"
  ];

  const goals = [
    "High Growth Career",
    "Stable Career",
    "Government Career",
    "Creative Career",
    "Research"
  ];

  return (
    <div className="assessment-card">

      <div className="assessment-icon">
        🎯
      </div>

      <h1>What kind of future do you want?</h1>

      <p className="assessment-description">
        Your preferences help us find careers that fit
        your personality and goals.
      </p>


      <h3 className="question-title">
        Preferred Work Style
      </h3>

      <div className="option-grid">

        {workStyles.map(style => (

          <button
            key={style}
            className={
              student.workStyle === style
                ? "option-card selected"
                : "option-card"
            }
            onClick={() =>
              updateField("workStyle", style)
            }
          >
            {style}
          </button>

        ))}

      </div>


      <h3 className="question-title">
        Career Goal
      </h3>

      <div className="option-grid">

        {goals.map(goal => (

          <button
            key={goal}
            className={
              student.goal === goal
                ? "option-card selected"
                : "option-card"
            }
            onClick={() =>
              updateField("goal", goal)
            }
          >
            {goal}
          </button>

        ))}

      </div>

    </div>
  );
}


export default Assessment;