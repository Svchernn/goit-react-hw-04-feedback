import { useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = mark => {
    setFeedback(prevState => {
      const value = prevState[mark];

      return { ...prevState, [mark]: value + 1 };
    });
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    const total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = propName => {
    const total = countTotalFeedback();
    if (!total) {
      return 0;
    }

    const value = feedback[propName];
    const result = ((value / total) * 100).toFixed();
    return Number(result);
  };

  const { good, neutral, bad } = feedback;
  const total = countTotalFeedback();
  const goodPercent = countPositiveFeedbackPercentage('good');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#010101',
      }}
    >
      <Section title="Please leave your feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      {countTotalFeedback() !== 0 ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={goodPercent}
          />
        </Section>
      ) : (
        <Notification text="There is no feedback" />
      )}
    </div>
  );
};
