import React from 'react';

import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';

const Markdown = props => {
  const md = new Remarkable();

  md.renderer = new RemarkableReactRenderer();

  return <div className={props.className}>{md.render(props.text)}</div>;
};

export default Markdown;
