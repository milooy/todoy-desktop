import React, { ReactNode } from 'react';
import { getQueryStringObject } from '../utils';
import Modal from './Modal';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const QS = getQueryStringObject(window.location.href);
  // console.log(QS);
  if (QS.isModal) {
    return <Modal />;
  }
  return <>{children}</>;
}
