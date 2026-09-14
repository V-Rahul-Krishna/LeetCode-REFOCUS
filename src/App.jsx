import { useEffect, useState } from "react";

const focusProblem = {
  title: "Maximum Subarray",
  difficulty: "Medium",
  topic: "Arrays",
  reason:
    "You have been practicing array fundamentals. Today, strengthen your ability to recognize running-state patterns.",
  statement:
    "Given an integer array nums, find the subarray with the largest sum and return its sum.",
  exampleInput: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
  exampleOutput: "6",
  code: `class Solution {
    public int maxSubArray(int[] nums) {
        
    }
}`,
};

const revisionProblems = [
  {
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
  },
  {
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    difficulty: "Easy",
  },
];

const defaultActivity = [
  {
    title: "Longest Subarray Sum K",
    note: "Pattern identified",
    time: "Yesterday",
  },
  {
    title: "Two Sum",
    note: "Concept revised",
    time: "2 days ago",
  },
];

function App() {
  const [view, setView] = useState("dashboard");
  const [code, setCode] = useState(focusProblem.code);
  const [timer, setTimer] = useState(0);
  const [status, setStatus] = useState("");
  const [feeling, setFeeling] = useState("");
  const [learning, setLearning] = useState("");
  const [activity, setActivity] = useState(() => {
    try {
      const saved = localStorage.getItem("refocusActivity");
      return saved ? JSON.parse(saved) : defaultActivity;
    } catch {
      return defaultActivity;
    }
  });

  useEffect(() => {
    if (view !== "focus") return;

    const interval = setInterval(() => {
      setTimer((current) => current + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [view]);

  useEffect(() => {
    localStorage.setItem("refocusActivity", JSON.stringify(activity));
  }, [activity]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const startFocus = () => {
    setTimer(0);
    setStatus("");
    setCode(focusProblem.code);
    setView("focus");
  };

  const runCode = () => {
    setStatus("Code ran successfully — mock execution");
    setTimeout(() => setStatus(""), 2500);
  };

  const submitCode = () => {
    setStatus("");
    setView("reflection");
  };

  const saveReflection = () => {
    if (!feeling || !learning) return;

    const newActivity = {
      title: focusProblem.title,
      note: `${learning} • ${feeling}`,
      time: "Just now",
    };

    setActivity((current) => [newActivity, ...current].slice(0, 3));
    setFeeling("");
    setLearning("");
    setView("dashboard");
  };

  if (view === "focus") {
    return (
      <FocusView
        code={code}
        setCode={setCode}
        timer={formatTime(timer)}
        status={status}
        onRun={runCode}
        onSubmit={submitCode}
        onBack={() => setView("dashboard")}
      />
    );
  }

  if (view === "reflection") {
    return (
      <ReflectionView
        feeling={feeling}
        setFeeling={setFeeling}
        learning={learning}
        setLearning={setLearning}
        onSave={saveReflection}
      />
    );
  }

  return (
    <Dashboard
      activity={activity}
      onStart={startFocus}
      onRevision={() => setView("focus")}
    />
  );
}

function Header() {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark">R</span>
        <span>RE:FOCUS</span>
      </div>

      <div className="topbar-label">Practice with intention</div>
    </header>
  );
}

function Dashboard({ activity, onStart, onRevision }) {
  return (
    <div className="app-shell">
      <Header />

      <main className="dashboard">
        <section className="hero">
          <div>
            <p className="eyebrow">MONDAY · 14 SEPTEMBER</p>
            <h1>Good evening, Rahul.</h1>
            <p className="hero-subtitle">
              One focused problem is enough to move forward today.
            </p>
          </div>

          <div className="streak">
            <span className="streak-number">18</span>
            <span className="streak-label">day streak</span>
          </div>
        </section>

        <section className="stats-row">
          <div className="stat">
            <span className="stat-label">PROBLEMS SOLVED</span>
            <strong>127</strong>
          </div>

          <div className="stat">
            <span className="stat-label">CURRENT STREAK</span>
            <strong>18 days</strong>
          </div>

          <div className="stat">
            <span className="stat-label">THIS WEEK</span>
            <strong>6 / 7</strong>
          </div>
        </section>

        <section className="focus-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 · TODAY'S FOCUS</p>
              <h2>Practice one thing well.</h2>
            </div>

            <span className="focus-index">01</span>
          </div>

          <div className="focus-card">
            <div className="problem-main">
              <div className="problem-meta">
                <span className="topic-tag">ARRAYS</span>
                <span className="difficulty medium">MEDIUM</span>
              </div>

              <h3>{focusProblem.title}</h3>

              <p>{focusProblem.reason}</p>

              <button className="primary-button" onClick={onStart}>
                Start Focus
                <span>→</span>
              </button>
            </div>

            <div className="focus-side">
              <div className="side-label">SESSION</div>
              <div className="session-value">01</div>
              <div className="side-line" />
              <div className="side-label">EST. TIME</div>
              <div className="estimated-time">20 min</div>
            </div>
          </div>
        </section>

        <section className="lower-grid">
          <div className="revision-section">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">02 · REVISION</p>
                <h2>Keep the patterns fresh.</h2>
              </div>
            </div>

            <div className="revision-list">
              {revisionProblems.map((problem, index) => (
                <button
                  className="revision-item"
                  key={problem.title}
                  onClick={onRevision}
                >
                  <span className="revision-number">
                    0{index + 1}
                  </span>

                  <span className="revision-info">
                    <strong>{problem.title}</strong>
                    <small>
                      {problem.topic} · {problem.difficulty}
                    </small>
                  </span>

                  <span className="arrow">↗</span>
                </button>
              ))}
            </div>
          </div>

          <div className="activity-section">
            <div className="section-heading compact">
              <div>
                <p className="eyebrow">03 · RECENT ACTIVITY</p>
                <h2>What you learned.</h2>
              </div>
            </div>

            <div className="activity-list">
              {activity.map((item, index) => (
                <div className="activity-item" key={`${item.title}-${index}`}>
                  <div className="activity-dot" />

                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.note}</p>
                  </div>

                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FocusView({
  code,
  setCode,
  timer,
  status,
  onRun,
  onSubmit,
  onBack,
}) {
  return (
    <div className="focus-shell">
      <header className="focus-topbar">
        <button className="back-button" onClick={onBack}>
          ← Dashboard
        </button>

        <div className="focus-brand">
          <span className="brand-mark">R</span>
          RE:FOCUS
        </div>

        <div className="timer">
          <span className="timer-dot" />
          {timer}
        </div>
      </header>

      <main className="workspace">
        <section className="problem-panel">
          <div className="problem-header">
            <div>
              <p className="eyebrow">FOCUS SESSION</p>
              <h1>{focusProblem.title}</h1>
            </div>

            <div className="problem-badges">
              <span className="topic-tag">ARRAYS</span>
              <span className="difficulty medium">MEDIUM</span>
            </div>
          </div>

          <div className="problem-content">
            <h3>Problem</h3>
            <p>{focusProblem.statement}</p>

            <h3>Example</h3>

            <div className="example-box">
              <div>
                <span>Input</span>
                <code>{focusProblem.exampleInput}</code>
              </div>

              <div>
                <span>Output</span>
                <code>{focusProblem.exampleOutput}</code>
              </div>
            </div>

            <div className="focus-note">
              <span>FOCUS NOTE</span>
              <p>
                Don't rush to code. First identify the pattern and define
                what state you need to track.
              </p>
            </div>
          </div>
        </section>

        <section className="editor-panel">
          <div className="editor-header">
            <div className="file-name">
              <span className="java-dot" />
              Solution.java
            </div>

            <span className="language">Java</span>
          </div>

          <div className="editor">
            <div className="line-numbers">
              {code.split("\n").map((_, index) => (
                <span key={index}>{index + 1}</span>
              ))}
            </div>

            <textarea
              value={code}
              onChange={(event) => setCode(event.target.value)}
              spellCheck="false"
              aria-label="Java code editor"
            />
          </div>

          <div className="editor-footer">
            <div className="run-status">
              {status && <span>● {status}</span>}
            </div>

            <div className="editor-actions">
              <button className="secondary-button" onClick={onRun}>
                Run
              </button>

              <button className="primary-button submit-button" onClick={onSubmit}>
                Submit
                <span>→</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ReflectionView({
  feeling,
  setFeeling,
  learning,
  setLearning,
  onSave,
}) {
  const feelings = [
    "Easy",
    "Took some thinking",
    "Difficult",
    "Needed help",
  ];

  const learnings = ["Pattern", "Concept", "Mistake"];

  return (
    <div className="reflection-shell">
      <header className="focus-topbar">
        <div className="focus-brand">
          <span className="brand-mark">R</span>
          RE:FOCUS
        </div>

        <span className="reflection-step">REFLECTION · 03</span>
      </header>

      <main className="reflection-content">
        <div className="reflection-intro">
          <p className="eyebrow">SESSION COMPLETE</p>
          <h1>How did this problem feel?</h1>
          <p>
            Solving is only half the practice. Take a moment to understand
            what happened.
          </p>
        </div>

        <section className="reflection-block">
          <span className="question-number">01</span>

          <div className="reflection-question">
            <h2>How did this problem feel?</h2>

            <div className="option-grid">
              {feelings.map((option) => (
                <button
                  key={option}
                  className={`option ${
                    feeling === option ? "selected" : ""
                  }`}
                  onClick={() => setFeeling(option)}
                >
                  <span className="radio">
                    {feeling === option && "✓"}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="reflection-block">
          <span className="question-number">02</span>

          <div className="reflection-question">
            <h2>What did you learn?</h2>

            <div className="learning-options">
              {learnings.map((option) => (
                <button
                  key={option}
                  className={`learning-option ${
                    learning === option ? "selected" : ""
                  }`}
                  onClick={() => setLearning(option)}
                >
                  <span className="learning-icon">
                    {option === "Pattern"
                      ? "↗"
                      : option === "Concept"
                      ? "◇"
                      : "!"
                    }
                  </span>

                  <span>
                    <strong>{option}</strong>
                    <small>
                      {option === "Pattern"
                        ? "Recognized a reusable approach"
                        : option === "Concept"
                        ? "Understood something deeper"
                        : "Found something to avoid next time"}
                    </small>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="reflection-footer">
          <span>
            {feeling && learning
              ? "Ready to save your reflection."
              : "Select one option from each section."}
          </span>

          <button
            className="primary-button"
            disabled={!feeling || !learning}
            onClick={onSave}
          >
            Save Reflection
            <span>→</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;