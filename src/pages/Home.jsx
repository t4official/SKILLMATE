import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      <nav className="home-navbar">

        <div className="logo">
          <div className="logo-mark">S</div>

          <div>
            <h2>SKILLMATE</h2>
            <span>Your Future. Our Guidance.</span>
          </div>
        </div>

        <button
          className="nav-assessment-btn"
          onClick={() => navigate("/assessment")}
        >
          Start Assessment
        </button>

      </nav>


      <main className="home-hero">

        <div className="hero-content">

          <span className="hero-badge">
            AI-STYLE CAREER GUIDANCE
          </span>

          <h1>
            Discover the right
            <br />
            <strong>career path for you.</strong>
          </h1>

          <p>
            A personalized career guidance platform for
            Intermediate students. We analyze your marks,
            skills, interests and goals to help you discover
            suitable career paths.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/assessment")}
            >
              Start Career Assessment →
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({
                    behavior: "smooth"
                  });
              }}
            >
              How It Works
            </button>

          </div>

        </div>


        <div className="hero-card">

          <div className="hero-card-top">
            <span>CAREER MATCH</span>
            <span>✦</span>
          </div>

          <div className="hero-career">

            <div className="hero-career-icon">
              📊
            </div>

            <div>
              <small>EXAMPLE MATCH</small>
              <h3>Data Analyst</h3>
            </div>

          </div>

          <div className="hero-match">

            <div
              className="match-circle"
            >
              91%
            </div>

            <div>
              <strong>Strong Match</strong>
              <p>
                Based on skills & interests
              </p>
            </div>

          </div>

          <div className="hero-tags">

            <span>Analytical</span>
            <span>Technology</span>
            <span>Problem Solving</span>

          </div>

        </div>

      </main>


      <section
        className="home-features"
        id="how-it-works"
      >

        <div className="section-heading">

          <span>HOW IT WORKS</span>

          <h2>
            Guidance based on
            <br />
            <strong>your complete profile.</strong>
          </h2>

        </div>


        <div className="feature-grid">

          <Feature
            icon="📊"
            number="01"
            title="Academic Profile"
            text="Your Intermediate first and second year total marks are considered."
          />

          <Feature
            icon="❤️"
            number="02"
            title="Interests"
            text="Tell us the subjects, fields and activities you genuinely enjoy."
          />

          <Feature
            icon="🧠"
            number="03"
            title="Skills"
            text="Identify your strengths and abilities."
          />

          <Feature
            icon="🎯"
            number="04"
            title="Career Goals"
            text="Tell us what kind of future and work environment you prefer."
          />

        </div>

      </section>


      <section className="home-cta">

        <div>

          <span>READY TO DISCOVER?</span>

          <h2>
            Your career journey
            <br />
            starts here.
          </h2>

        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/assessment")}
        >
          Take Free Assessment →
        </button>

      </section>


      <footer className="home-footer">

        <div className="logo">

          <div className="logo-mark">
            C
          </div>

          <div>
            <h2>SKILLMATE</h2>
            <span>
              Your Future. Our Guidance.
            </span>
          </div>

        </div>

        <p>
          © 2026 SKILLMATE. Built for students.
        </p>

      </footer>

    </div>
  );
}


function Feature({
  icon,
  number,
  title,
  text
}) {

  return (
    <div className="feature-card">

      <div className="feature-top">

        <div className="feature-icon">
          {icon}
        </div>

        <span>
          {number}
        </span>

      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

    </div>
  );
}


export default Home;