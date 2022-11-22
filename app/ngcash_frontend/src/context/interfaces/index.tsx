import { ReactNode, Dispatch, SetStateAction } from 'react';

export interface Props {
  children: ReactNode,
};

export interface Target {
  name: string,
  value: string,
};

export interface ComponentState {
  username: string,
  password: string,
};

export interface authContextType {
  infoUser: ComponentState,
  setInfoUser: Dispatch<SetStateAction<ComponentState>>,
  onChange: (event: { target: Target },
    state: ComponentState,
    setState: Dispatch<SetStateAction<ComponentState>>) => void,
  error: string,
  setError: Dispatch<SetStateAction<string>>
  // onSubmit: () => void,
};
