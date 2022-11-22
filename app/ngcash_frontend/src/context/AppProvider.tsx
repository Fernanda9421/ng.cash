import { FunctionComponent, useState, ComponentState, Dispatch, SetStateAction } from 'react';
import { AppContext } from './AppContext';
import { Props, Target } from './interfaces';

const AppProvider: FunctionComponent<Props> = ({ children }) => {
  const [infoUser, setInfoUser] = useState({
    username: '',
    password: '',
  });

  const onChange = (
    event: { target: Target },
    state: ComponentState,
    setState: Dispatch<SetStateAction<ComponentState>>
  ) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    } as ComponentState);
  };

  const context = {
    infoUser,
    setInfoUser,
    onChange,
  };

  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
};

export default AppProvider;
