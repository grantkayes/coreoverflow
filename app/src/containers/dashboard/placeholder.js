import React from 'react';
import { Spinner } from '@procore/core-react'

const Placeholder = () => {
  return (
    <div className="placeholder">
      <Spinner className="my-class" loading={true} />
    </div>
  );
}

export default Placeholder;