export type ValidateStepFunc<S> = (state: S) => boolean | Promise<boolean>;

export interface StepsViewState {
  busy?: boolean;
}

// Props
export type Props<S, D> = {
  state: S;
  dispatch: D;
  children: StepComponent<S> | StepComponent<S>[];
  reseteable?: boolean;
  onReset?: (state: S) => void;
};

export interface StepProps<T> {
  validateStep?: ValidateStepFunc<T>;
}

// Components
export type StepComponent<S> = React.ReactElement<StepProps<S>>;

// Hooks
export interface StepsContextI<S, D> {
  state: S;
  dispatch: D;
  reset: () => void;
}

export interface useStepsI<S, D> extends StepsContextI<S, D> {}
