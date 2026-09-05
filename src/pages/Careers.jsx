import { useState } from "react";
import { useNavigate } from "react-router-dom";
import careers from "../data/careers";

function Careers() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(careers.map((career) => career.category))
  ];

  const filteredCareers = careers.filter((career) => {
    const matchesSearch =
      career.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      career.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      career.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="careers-page">

      <nav className="result-navbar">

        <div className="logo">
          <div className="logo-mark">C</div>

          <div>
            <h2>skillmate</h2>
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


      <main className="careers-container">

        <section className="careers-header">

          <span>CAREER EXPLORER</span>

          <h1>
            Explore careers that
            <br />
            <strong>could fit your future.</strong>
          </h1>

          <p>
            Explore different career paths, required degrees,
            important skills and possible next steps.
          </p>

        </section>


        <section className="career-controls">

          <input
            type="text"
            placeholder="🔎 Search careers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="category-buttons">

            {categories.map((item) => (

              <button
                key={item}
                className={
                  category === item
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => setCategory(item)}
              >
                {item}
              </button>

            ))}

          </div>

        </section>


        <section className="career-grid">

          {filteredCareers.map((career) => (

            <CareerCard
              key={career.id}
              career={career}
              onExplore={() =>
                navigate(`/careers/${career.id}`)
              }
            />

          ))}

        </section>


        {filteredCareers.length === 0 && (

          <div className="no-careers">

            <div>🔍</div>

            <h2>No careers found</h2>

            <p>
              Try searching with another career or category.
            </p>

          </div>

        )}


        <section className="career-bottom-cta">

          <div>

            <span>NOT SURE WHAT TO CHOOSE?</span>

            <h2>
              Let skillmate analyze
              <br />
              your profile.
            </h2>

          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/assessment")}
          >
            Start Assessment →
          </button>

        </section>

      </main>

    </div>
  );
}


function CareerCard({ career, onExplore }) {

  return (
    <div className="career-card">

      <div className="career-card-top">

        <div className="career-icon">
          {career.icon}
        </div>

        <span className="career-category">
          {career.category}
        </span>

      </div>


      <h2>
        {career.name}
      </h2>

      <p>
        {career.description}
      </p>


      <div className="career-info">

        <div>
          <small>STREAMS</small>

          <strong>
            {career.streams.join(", ")}
          </strong>
        </div>


        <div>
          <small>DEGREE</small>

          <strong>
            {career.degrees[0]}
          </strong>
        </div>

      </div>


      <div className="career-skills">

        {career.skillsToLearn
          .slice(0, 3)
          .map((skill) => (

            <span key={skill}>
              {skill}
            </span>

          ))}

      </div>


      <button
        className="career-explore-btn"
        onClick={onExplore}
      >
        Explore Career →
      </button>

    </div>
  );
}


export default Careers;