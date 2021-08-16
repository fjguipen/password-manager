import React from 'react';

type Props = {
  step: number;
  steps: React.ReactElement[];
};

function StepsTracker({ step, steps }: Props) {
  return (
    <div className="steps-tracker">
      {steps.map((child, i) => {
        return (
          <React.Fragment key={child.key}>
            <div
              className={
                'steps-tracker__step-wrapper ' + (i === step ? 'current' : '')
              }
            >
              <div
                className={
                  'steps-tracker__step ' +
                  (i < step ? 'active' : '') +
                  (i === step ? 'current' : '')
                }
              >
                {i + 1}
              </div>
              <div className="mark"></div>
            </div>
            {i + 1 < steps.length && (
              <span
                className={'steps-tracker__line ' + (i < step ? 'active' : '')}
              ></span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default StepsTracker;
