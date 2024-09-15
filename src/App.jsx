import { useEffect, useState } from "react";

import Description from "./components/Description";
import Options from "./components/Options";
import Feedback from "./components/Feedback";
import Notification from "./components/Notification";

const defaultFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const FEEDBACK_LS_KEY = "FEEDBACKS";

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    try {
      const data = window.localStorage.getItem(FEEDBACK_LS_KEY);
      if (data === null) return { ...defaultFeedback };
      const parsedData = JSON.parse(data);
      const normalizedData = {};
      for (const key of Object.keys(defaultFeedback)) {
        normalizedData[key] =
          typeof parsedData[key] === "number"
            ? parsedData[key]
            : defaultFeedback[key];
      }
      return normalizedData;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return { ...defaultFeedback };
    }
  });

  const { bad, good, neutral } = feedback;
  const totalFeedback = good + neutral + bad;
  const positiveFeedback = Math.round((good / totalFeedback) * 100);

  const options =
    totalFeedback > 0
      ? [...Object.keys(feedback), "reset"]
      : Object.keys(feedback);

  useEffect(() => {
    window.localStorage.setItem(FEEDBACK_LS_KEY, JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    if (feedbackType === "reset") {
      setFeedback({ ...defaultFeedback });
    } else {
      setFeedback((prev) => ({
        ...prev,
        [feedbackType]: prev[feedbackType] + 1,
      }));
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Description />

      <Options options={options} updateFeedback={updateFeedback} />

      {totalFeedback > 0 ? (
        <Feedback
          bad={bad}
          good={good}
          neutral={neutral}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
