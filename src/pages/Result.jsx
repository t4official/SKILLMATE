import { useState } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import careers from "../data/careers";

function CareerRadarChart({ scores }) {
  const values = [
    scores.academic,
    scores.skills,
    scores.interests,
    scores.goal,
    scores.workStyle,
  ];

  const labels = [
    "Academics",
    "Skills",
    "Interests",
    "Goals",
    "Work Style",
  ];

  return (
    <div className="radar-chart">
      {labels.map((label, index) => (
        <div className="radar-value" key={label}>
          <span>{label}</span>
          <strong>{values[index]}%</strong>
        </div>
      ))}
    </div>
  );
}

function Result() {
  const navigate = useNavigate();

  const student =
    JSON.parse(localStorage.getItem("SkillMateStudent")) || {};

  const firstYear = Number(student.firstYearMarks) || 0;
  const secondYear = Number(student.secondYearMarks) || 0;

  const averageMarks =
    firstYear > 0 && secondYear > 0
      ? (firstYear + secondYear) / 2
      : firstYear || secondYear;

  const selectedInterests = student.interests || [];
  const selectedSkills = student.skills || [];

  function calculateScore(career) {
    let score = 0;

    if (
      student.stream &&
      career.streams.includes(student.stream)
    ) {
      score += 20;
    }

    career.interests.forEach((interest) => {
      if (selectedInterests.includes(interest)) {
        score += 12;
      }
    });

    career.skills.forEach((skill) => {
      if (selectedSkills.includes(skill)) {
        score += 10;
      }
    });

    if (
      student.workStyle &&
      career.workStyles.includes(student.workStyle)
    ) {
      score += 12;
    }

    if (
      student.goal &&
      career.goals.includes(student.goal)
    ) {
      score += 10;
    }

    if (averageMarks >= 90) {
      score += 8;
    } else if (averageMarks >= 75) {
      score += 6;
    } else if (averageMarks >= 60) {
      score += 4;
    } else if (averageMarks >= 40) {
      score += 2;
    }

    return Math.min(score, 100);
  }

  const rankedCareers = careers
    .map((career) => ({
      ...career,
      score: calculateScore(career),
    }))
    .sort((a, b) => b.score - a.score);

  const bestCareer = rankedCareers[0] || careers[0];
  const otherCareers = rankedCareers.slice(1, 4);
  const comparisonCareers = rankedCareers.slice(0, 3);

  const academicScore =
    averageMarks >= 90
      ? 95
      : averageMarks >= 80
      ? 88
      : averageMarks >= 70
      ? 78
      : averageMarks >= 60
      ? 68
      : averageMarks >= 50
      ? 58
      : 45;

  const skillMatches = bestCareer.skills.filter((skill) =>
    selectedSkills.includes(skill)
  ).length;

  const interestMatches = bestCareer.interests.filter((interest) =>
    selectedInterests.includes(interest)
  ).length;

  const skillScore =
    bestCareer.skills.length > 0
      ? Math.min(
          100,
          Math.round(
            (skillMatches / bestCareer.skills.length) * 100
          )
        )
      : 50;

  const interestScore =
    bestCareer.interests.length > 0
      ? Math.min(
          100,
          Math.round(
            (interestMatches / bestCareer.interests.length) * 100
          )
        )
      : 50;

  const goalScore =
    bestCareer.goals.includes(student.goal) ? 100 : 50;

  const workStyleScore =
    bestCareer.workStyles.includes(student.workStyle) ? 100 : 50;

  // PDF download is intentionally placed here, after bestCareer exists.
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("skillmate", 20, 25);

    doc.setFontSize(16);
    doc.text("Career Recommendation Report", 20, 40);

    doc.setFontSize(12);
    doc.text(`Student: ${student.name || "Student"}`, 20, 55);
    doc.text(`Intermediate Stream: ${student.stream || "Not provided"}`, 20, 65);
    doc.text(`Intermediate Year: ${student.year || "Not provided"}`, 20, 75);
    doc.text(`Recommended Career: ${bestCareer.name}`, 20, 90);
    doc.text(`Career Fit Score: ${bestCareer.score}%`, 20, 100);
    doc.text(`Category: ${bestCareer.category}`, 20, 110);

    doc.text("Recommended Degrees:", 20, 130);

    bestCareer.degrees.slice(0, 5).forEach((degree, index) => {
      doc.text(`${index + 1}. ${degree}`, 25, 140 + index * 8);
    });

    doc.save("skillmate-Career-Report.pdf");
  };

  return (
    <div className="result-page">
      <nav className="result-navbar">
        <div className="logo">
          <div className="logo-mark">C</div>
          <div>
            <h2>SKILLMATE</h2>
            <span>Your Future. Our Guidance.</span>
          </div>
        </div>

        <button
          className="back-home"
          onClick={() => navigate("/")}
        >
          ← Home
        </button>
      </nav>

      <main className="result-container">
        <section className="result-welcome">
          <span>PERSONALIZED CAREER ANALYSIS</span>

          <h1>
            {student.name
              ? `Hi ${student.name}!`
              : "Your Career Analysis"}
          </h1>

          <p>
            We analyzed your academic performance, interests, skills,
            work style and career goals to guide you toward suitable
            career paths after Intermediate.
          </p>
        </section>

        {/* STUDENT PROFILE */}
        <section className="student-profile-section">
          <div className="section-mini-heading">
            <span>STUDENT PROFILE</span>
            <h2>👤 Your Profile</h2>
            <p>
              Your Intermediate details used for personalized career guidance.
            </p>
          </div>

          <div className="student-profile-card">
            <div className="profile-avatar">
              {student.name
                ? student.name.charAt(0).toUpperCase()
                : "S"}
            </div>

            <div className="profile-details">
              <h3>{student.name || "Student"}</h3>

              <div className="profile-info-grid">
                <div>
                  <span>College</span>
                  <strong>{student.college || "Not provided"}</strong>
                </div>

                <div>
                  <span>Stream</span>
                  <strong>{student.stream || "Not provided"}</strong>
                </div>

                <div>
                  <span>Intermediate Year</span>
                  <strong>{student.year || "Not provided"}</strong>
                </div>

                <div>
                  <span>Student ID</span>
                  <strong>{student.studentId || "Not provided"}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BEST CAREER */}
        <section className="result-main-card">
          <div className="result-career-icon">
            {bestCareer.icon}
          </div>

          <div className="result-career-info">
            <small>YOUR BEST CAREER MATCH</small>
            <h2>{bestCareer.name}</h2>
            <p>{bestCareer.description}</p>
          </div>

          <div className="result-percentage">
            <strong>{bestCareer.score}%</strong>
            <span>Career Match</span>
          </div>
        </section>

        {/* PROFILE ANALYSIS */}
        <section className="analysis-grid">
          <AnalysisCard title="Academic Fit" score={academicScore} />
          <AnalysisCard title="Skill Fit" score={skillScore} />
          <AnalysisCard title="Interest Fit" score={interestScore} />
          <AnalysisCard title="Goal Fit" score={goalScore} />
        </section>

        {/* WHY THIS CAREER */}
        <section className="recommendation-section">
          <div className="recommendation-card">
            <h2>🎯 Why this career?</h2>

            <p>
              Your profile shows a strong connection with{" "}
              <strong>{bestCareer.name}</strong>. Your selected interests,
              skills, preferred work style and goals were compared with
              career requirements.
            </p>

            <div className="result-mini-stats">
              <div>
                <strong>{skillMatches}</strong>
                <span>Skills Matched</span>
              </div>

              <div>
                <strong>{interestMatches}</strong>
                <span>Interests Matched</span>
              </div>

              <div>
                <strong>{workStyleScore}%</strong>
                <span>Work Fit</span>
              </div>
            </div>
          </div>

          <div className="recommendation-card">
            <h2>🚀 Skills to Build</h2>

            <div className="skill-list">
              {bestCareer.skillsToLearn.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </section>

        {/* COURSES */}
        <section className="career-detail-section">
          <div className="section-mini-heading">
            <span>PERSONALIZED LEARNING</span>
            <h2>📚 Recommended Courses</h2>
          </div>

          <div className="course-grid">
            {bestCareer.courses?.map((course, index) => (
              <div className="course-card" key={course.name}>
                <div className="course-number">0{index + 1}</div>

                <div className="course-content">
                  <h3>{course.name}</h3>
                  <p>⏱️ {course.duration}</p>

                  <div className="course-skills">
                    {course.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>

                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noreferrer"
                      className="course-link"
                    >
                      View Course ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SALARY + JOB ROLES */}
        <section className="career-info-grid">
          <div className="salary-card">
            <span>💰 EXPECTED SALARY RANGE</span>

            <h2>{bestCareer.salary?.entry}</h2>

            <p>Typical early-career range</p>

            <div className="salary-growth">
              <div>
                <strong>{bestCareer.salary?.entry}</strong>
                <span>Entry Level</span>
              </div>

              <div>
                <strong>{bestCareer.salary?.experienced}</strong>
                <span>With Experience</span>
              </div>
            </div>

            <small>
              Salary is an approximate range and can vary by location,
              company, skills, experience and role.
            </small>
          </div>

          <div className="jobs-card">
            <span>💼 POSSIBLE JOB ROLES</span>

            <h2>Where can you work?</h2>

            <div className="job-list">
              {bestCareer.jobRoles?.map((job) => (
                <div className="job-item" key={job}>
                  <span>✓</span>
                  {job}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEGREE OPTIONS */}
        <section className="degree-section">
          <div className="section-mini-heading">
            <span>AFTER INTERMEDIATE</span>

            <h2>🎓 Suitable Degree Options</h2>

            <p>
              These are the education paths you can consider after completing
              Intermediate for your recommended career.
            </p>
          </div>

          <div className="degree-grid">
            {bestCareer.degrees.map((degree) => (
              <div className="degree-card" key={degree}>
                🎓 {degree}
              </div>
            ))}
          </div>
        </section>

        {/* ROADMAP */}
        <section className="roadmap-card">
          <span>YOUR PERSONALIZED ROADMAP</span>

          <h2>
            Intermediate → {bestCareer.name}
          </h2>

          <div className="roadmap">
            {bestCareer.roadmap?.map((step, index) => (
              <RoadmapStep
                key={step}
                number={String(index + 1).padStart(2, "0")}
                title={`Step ${index + 1}`}
                text={step}
              />
            ))}
          </div>
        </section>

        {/* CAREER COMPARISON */}
        <section className="career-comparison-section">
          <div className="section-mini-heading">
            <span>COMPARE YOUR TOP MATCHES</span>

            <h2>🎯 Career Comparison</h2>

            <p>
              Compare your top career matches and see which option fits
              your profile best.
            </p>
          </div>

          <div className="career-comparison-grid">
            {comparisonCareers.map((career) => {
              const matchedSkills = career.skills.filter((skill) =>
                selectedSkills.includes(skill)
              ).length;

              const matchedInterests = career.interests.filter((interest) =>
                selectedInterests.includes(interest)
              ).length;

              const isBest = career.id === bestCareer.id;

              return (
                <div
                  className={`comparison-card ${
                    isBest ? "comparison-best" : ""
                  }`}
                  key={career.id}
                >
                  {isBest && (
                    <div className="comparison-badge">
                      🏆 BEST MATCH
                    </div>
                  )}

                  <div className="comparison-icon">
                    {career.icon}
                  </div>

                  <h3>{career.name}</h3>

                  <span className="comparison-category">
                    {career.category}
                  </span>

                  <div className="comparison-score">
                    <strong>{career.score}%</strong>
                    <span>Career Fit</span>
                  </div>

                  <div className="comparison-divider" />

                  <div className="comparison-stats">
                    <div>
                      <strong>{matchedSkills}</strong>
                      <span>Skills Matched</span>
                    </div>

                    <div>
                      <strong>{matchedInterests}</strong>
                      <span>Interests Matched</span>
                    </div>
                  </div>

                  <div className="comparison-details">
                    <div>
                      <span>🎓 Degree</span>
                      <p>{career.degrees?.[0]}</p>
                    </div>

                    <div>
                      <span>💼 Career Role</span>
                      <p>{career.jobRoles?.[0]}</p>
                    </div>

                    <div>
                      <span>💰 Starting Salary</span>
                      <p>{career.salary?.entry}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SCORE EXPLANATION */}
        <section className="score-explanation-section">
          <div className="section-mini-heading">
            <span>SCORE BREAKDOWN</span>

            <h2>🧠 Why You Got This Score</h2>

            <p>
              Here is how your profile contributed to your{" "}
              {bestCareer.name} career match.
            </p>
          </div>

          <div className="score-explanation-grid">
            <ScoreReason
              icon="🎓"
              title="Academic Stream"
              matched={
                student.stream &&
                bestCareer.streams.includes(student.stream)
              }
              text={
                student.stream
                  ? `Your ${student.stream} stream ${
                      bestCareer.streams.includes(student.stream)
                        ? "matches"
                        : "does not directly match"
                    } this career.`
                  : "No academic stream was provided."
              }
            />

            <ScoreReason
              icon="❤️"
              title="Interests"
              matched={interestMatches > 0}
              text={
                interestMatches > 0
                  ? `You matched ${interestMatches} ${
                      interestMatches === 1 ? "interest" : "interests"
                    } required for this career.`
                  : "Your selected interests have limited overlap with this career."
              }
            />

            <ScoreReason
              icon="🛠️"
              title="Skills"
              matched={skillMatches > 0}
              text={
                skillMatches > 0
                  ? `You already have ${skillMatches} ${
                      skillMatches === 1 ? "skill" : "skills"
                    } that are relevant to this career.`
                  : "You currently have no directly matching skills."
              }
            />

            <ScoreReason
              icon="💼"
              title="Work Style"
              matched={
                student.workStyle &&
                bestCareer.workStyles.includes(student.workStyle)
              }
              text={
                student.workStyle
                  ? bestCareer.workStyles.includes(student.workStyle)
                    ? "Your preferred work style matches this career."
                    : "Your preferred work style is different from the typical style for this career."
                  : "No work style was provided."
              }
            />

            <ScoreReason
              icon="🚀"
              title="Career Goal"
              matched={
                student.goal &&
                bestCareer.goals.includes(student.goal)
              }
              text={
                student.goal
                  ? bestCareer.goals.includes(student.goal)
                    ? "Your career goal aligns with this career."
                    : "Your selected career goal has limited alignment with this career."
                  : "No career goal was provided."
              }
            />

            <ScoreReason
              icon="📚"
              title="Academic Performance"
              matched={averageMarks >= 60}
              text={
                averageMarks > 0
                  ? `Your average academic score is ${Math.round(
                      averageMarks
                    )}%, which contributes to your overall career compatibility.`
                  : "Academic marks were not provided."
              }
            />
          </div>

          <div className="score-summary-card">
            <div>
              <span>OVERALL CAREER FIT</span>
              <h3>{bestCareer.name}</h3>
            </div>

            <div className="score-summary-number">
              <strong>{bestCareer.score}%</strong>
              <span>Match Score</span>
            </div>
          </div>
        </section>

        {/* RADAR */}
        <section className="radar-section">
          <div className="section-mini-heading">
            <span>CAREER FIT</span>

            <h2>📊 Career Fit Analysis</h2>

            <p>
              See how well your profile matches your recommended career.
            </p>
          </div>

          <div className="radar-card">
            <h3>{bestCareer.name}</h3>

            <CareerRadarChart
              scores={{
                academic: academicScore,
                skills: skillScore,
                interests: interestScore,
                goal: goalScore,
                workStyle: workStyleScore,
              }}
            />
          </div>
        </section>

        {/* OTHER CAREERS */}
        <section className="other-careers">
          <div className="section-mini-heading">
            <span>MORE OPTIONS</span>

            <h2>Other Careers You May Like</h2>
          </div>

          <div className="other-career-grid">
            {otherCareers.map((career) => (
              <div
                className="other-career-card"
                key={career.id}
                onClick={() => navigate(`/career/${career.id}`)}
              >
                <div className="other-career-icon">
                  {career.icon}
                </div>

                <div>
                  <h3>{career.name}</h3>
                  <p>{career.score}% match</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL MESSAGE */}
        <section className="result-final-card">
          <div>
            <span>YOUR NEXT MOVE</span>

            <h2>
              Ready to start your career journey?
            </h2>

            <p>
              Use your recommended degree, course and roadmap as a starting
              point. Build skills, create projects and gain experience.
            </p>
          </div>

          <div className="result-final-icon">🚀</div>
        </section>

        {/* BUTTONS */}
        <div className="result-actions">
          <button
            className="primary-btn"
            onClick={() => navigate("/assessment")}
          >
            Retake Assessment
          </button>

          <button
            className="outline-dark-btn"
            onClick={() => navigate("/")}
          >
            Back Home
          </button>

          <button
            className="primary-btn"
            onClick={() => {
              localStorage.setItem(
                "skillmateSavedResult",
                JSON.stringify({
                  career: bestCareer.name,
                  score: bestCareer.score,
                })
              );

              alert("Career report saved successfully!");
            }}
          >
            ❤️ Save Career Report
          </button>



<button
  className="career-details-btn"
  onClick={() => navigate(`/career/${bestCareer.id}`)}
>
  Explore Career Details →
</button>












          <button
            className="outline-dark-btn"
            onClick={downloadPDF}
          >
            📥 Download Career Report
          </button>
        </div>
      </main>
    </div>
  );
}

function AnalysisCard({ title, score }) {
  return (
    <div className="analysis-card">
      <div className="analysis-top">
        <h3>{title}</h3>
        <strong>{score}%</strong>
      </div>

      <div className="analysis-bar">
        <div style={{ width: `${score}%` }} />
      </div>

      <p>
        Your profile shows a {score}% compatibility in this area.
      </p>
    </div>
  );
}

function RoadmapStep({ number, title, text }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`roadmap-step ${
        open ? "roadmap-step-open" : ""
      }`}
    >
      <button
        type="button"
        className="roadmap-step-button"
        onClick={() => setOpen(!open)}
      >
        <span className="roadmap-number">{number}</span>

        <span className="roadmap-step-content">
          <strong>{title}</strong>

          {open && (
            <span className="roadmap-step-description">
              {text}
            </span>
          )}
        </span>

        <span className="roadmap-toggle">
          {open ? "−" : "+"}
        </span>
      </button>
    </div>
  );
}

function ScoreReason({
  icon,
  title,
  matched,
  text,
}) {
  return (
    <div
      className={`score-reason-card ${
        matched
          ? "score-reason-positive"
          : "score-reason-neutral"
      }`}
    >
      <div className="score-reason-icon">{icon}</div>

      <div className="score-reason-content">
        <div className="score-reason-heading">
          <h3>{title}</h3>

          <span>
            {matched ? "✓ Match" : "— Partial"}
          </span>
        </div>

        <p>{text}</p>
      </div>
    </div>
  );
}

export default Result;
