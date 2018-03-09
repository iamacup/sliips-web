import React from 'react';

import Header from './header';
import Body from './body';
import Footer from './footer';

const components = (data, pathLocation) => ({
  header: Header,
  body: <Body data={data} pathLocation={pathLocation} />,
  footer: Footer,
});

export default components;
