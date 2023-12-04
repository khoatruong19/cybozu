import React from "react";
import ModalProvider from "./ModalProvider";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "../stores";

type Props = {
  children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
      <ModalProvider>{children}</ModalProvider>
    </ReduxProvider>
  );
};

export default AppProviders;
