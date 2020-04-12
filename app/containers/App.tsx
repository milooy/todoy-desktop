import React, { ReactNode } from 'react';
import { getParameterByName } from '../utils';
import Modal from './Modal';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const isModal = getParameterByName('isModal');
  if (isModal) {
    return <Modal />;
  }
  return <>{children}</>;
}
