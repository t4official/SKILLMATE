import { useNavigate, useParams } from "react-router-dom";
import careers from "./data/careers";
import "./App.css";

function CareerDetails() {
  const { careerId } = useParams();
  const navigate = useNavigate();

  const career = careers.find((item) => item.id === careerId);

  if (!career) {
    return (
      <div className="career-details-page">
        <div className="career-not-found">
          <h1>Career Not Found</h1>
          <p>Sorry, we couldn't find the career you're looking for.</p>

          <button onClick={() => navigate("/result")}>
            ← Back to Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="career-details-page">

      {/* TOP BAR */}
      <div className="career-details-topbar">
        <button
          className="back-button"
          onClick={() => navigate("/result")}
        >
          ← Back to Results
        </button>

        <div className="career-details-brand">
          <span>Career</span>Pilot
        </div>
      </div>

      {/* HERO */}
      <section className="career-details-hero">

        <div className="career-details-hero-content">

          <div className="career-details-icon">
            {career.icon}
          </div>

          <div>
            <span className="career-details-category">
              {career.category}
            </span>

            <h1>{career.name}</h1>

            <p>{career.description}</p>
          </div>

        </div>

        <div className="career-details-hero-badge">
          <span>CAREER PATH</span>
          <strong>After Intermediate</strong>
        </div>

      </section>

      {/* QUICK INFO */}
      <section className="career-quick-info">

        <div className="career-info-box">
          <span>🎓</span>
          <div>
            <small>Education</small>
            <strong>{career.degrees?.length || 0}+ Options</strong>
          </div>
        </div>

        <div className="career-info-box">
          <span>💼</span>
          <div>
            <small>Job Roles</small>
            <strong>{career.jobRoles?.length || 0}+ Roles</strong>
          </div>
        </div>

        <div className="career-info-box">
          <span>💰</span>
          <div>
            <small>Salary</small>
            <strong>{career.salary?.entry || "Varies"}</strong>
          </div>
        </div>

        <div className="career-info-box">
          <span>🚀</span>
          <div>
            <small>Career Growth</small>
            <strong>High Potential</strong>
          </div>
        </div>

      </section>

      {/* MAIN CONTENT */}
      <main className="career-details-content">

        {/* WHY THIS CAREER */}
        <section className="career-detail-section">

          <div className="career-section-heading">
            <span>01</span>
            <div>
              <small>UNDERSTAND THE CAREER</small>
              <h2>Why Consider This Career?</h2>
            </div>
          </div>

          <div className="career-description-card">
            <p>{career.description}</p>

            <p>
              This career can be a strong option for students who are
              interested in the related subjects, skills and work styles.
              Your skillmate assessment can help you understand how well
              your profile matches this career.
            </p>
          </div>

        </section>

        {/* DEGREE OPTIONS */}
        <section className="career-detail-section">

          <div className="career-section-heading">
            <span>02</span>
            <div>
              <small>AFTER INTERMEDIATE</small>
              <h2>🎓 Degree Options</h2>
            </div>
          </div>

          <div className="career-detail-grid">

            {career.degrees?.map((degree, index) => (
              <div className="career-detail-card" key={index}>
                <div className="detail-card-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3>{degree}</h3>
                  <p>
                    A possible education path to build your foundation
                    for this career.
                  </p>
                </div>
              </div>
            ))}

          </div>

        </section>

        {/* SKILLS */}
        <section className="career-detail-section">

          <div className="career-section-heading">
            <span>03</span>
            <div>
              <small>BUILD YOUR ABILITIES</small>
              <h2>🧠 Skills To Learn</h2>
            </div>
          </div>

          <div className="skills-detail-container">

            {career.skillsToLearn?.map((skill, index) => (
              <div className="skill-detail-item" key={index}>
                <span>✓</span>
                {skill}
              </div>
            ))}

          </div>

        </section>

        {/* COURSES */}
        <section className="career-detail-section">

          <div className="career-section-heading">
            <span>04</span>
            <div>
              <small>START LEARNING</small>
              <h2>📚 Recommended Courses</h2>
            </div>
          </div>

          <div className="career-courses-grid">

            {career.courses?.map((course, index) => (
              <div className="career-course-card" key={index}>

                <div className="course-number">
                  {index + 1}
                </div>

                <div className="course-content">
                  <h3>{course.name}</h3>

                  {course.provider && (
                    <p>{course.provider}</p>
                  )}

                  {course.url && (
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="course-link"
                    >
                      Explore Course ↗
                    </a>
                  )}
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* JOB ROLES */}
        <section className="career-detail-section">

          <div className="career-section-heading">
            <span>05</span>
            <div>
              <small>FUTURE OPPORTUNITIES</small>
              <h2>💼 Possible Job Roles</h2>
            </div>
          </div>

          <div className="job-roles-container">

            {career.jobRoles?.map((role, index) => (
              <div className="job-role-item" key={index}>
                <span>→</span>
                <strong>{role}</strong>
              </div>
            ))}

          </div>

        </section>

        {/* SALARY */}
        <section className="career-detail-section">

          <div className="career-section-heading">
            <span>06</span>
            <div>
              <small>CAREER OUTLOOK</small>
              <h2>💰 Salary Potential</h2>
            </div>
          </div>

          <div className="salary-detail-card">

            <div className="salary-block">
              <span>Entry Level</span>
              <strong>
                {career.salary?.entry || "Varies"}
              </strong>
            </div>

            <div className="salary-divider"></div>

            <div className="salary-block">
              <span>Experienced</span>
              <strong>
                {career.salary?.experienced || "Varies"}
              </strong>
            </div>

          </div>

          <p className="salary-note">
            Salary can vary depending on skills, experience,
            organisation, location and role.
          </p>

        </section>

        {/* ROADMAP */}
        <section className="career-detail-section">

          <div className="career-section-heading">
            <span>07</span>
            <div>
              <small>YOUR JOURNEY</small>
              <h2>🗺️ Career Roadmap</h2>
            </div>
          </div>

          <div className="career-details-roadmap">

            {career.roadmap?.map((step, index) => (
              <div className="career-roadmap-item" key={index}>

                <div className="roadmap-number">
                  {index + 1}
                </div>

                <div className="roadmap-line"></div>

                <div className="roadmap-content">
                  <span>STEP {index + 1}</span>
                  <h3>{step}</h3>
                </div>

              </div>
            ))}

          </div>

        </section>

        {/* FINAL CTA */}
        <section className="career-details-final">

          <div>
            <span>SKILLMATE</span>

            <h2>
              Ready to explore your future?
            </h2>

            <p>
              Go back to your results and compare this career
              with your other recommended options.
            </p>
          </div>

          <button
            onClick={() => navigate("/result")}
          >
            View My Results →
          </button>

        </section>

      </main>

    </div>
  );
}

export default CareerDetails;