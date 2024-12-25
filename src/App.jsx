import { useState , useEffect } from 'react'
import Description from './components/Description/Description';
import Feedback from './components/Feedback/Feedback';
import Options from './components/Options/Options';
import Notification from "./components/Notification/Notification";


const App = () => {
  const [feedback, setFeedback] = useState (
    () =>
   JSON.parse(localStorage.getItem("feedback")) || {
    good: 0,
    neutral: 0,
    bad: 0,
  }
  );

const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
const positiveFeedback =  totalFeedback === 0 ? 0 : Math.round((feedback.good / totalFeedback) * 100);

useEffect (() => {
  localStorage.setItem("feedback", JSON.stringify(feedback));
}, [feedback]
);

const updateFeedback = (feedbackType) => {
  setFeedback((prev) => ({
    ...prev,
    [feedbackType]: prev[feedbackType] + 1
  })
);
};

const resetFeedback = () => {
  setFeedback({ good: 0, neutral: 0, bad: 0 });
};

return (
 <div>
  <Description />
  <Options 
  onLeaveFeedback={updateFeedback}
  onReset={resetFeedback}
  totalFeedback={totalFeedback}
  />
  {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      )
      : (
        <Notification message="No feedback given" />
      )}
    </div>
  );
};


export default App
