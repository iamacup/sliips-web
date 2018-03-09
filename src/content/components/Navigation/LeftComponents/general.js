import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <ul className="nav navbar-nav">
    <li>
      <Link to="/about-us" href="/about-us">
        Team Sliips
      </Link>
    </li>
    <li>
      <Link to="/faq" href="/faq">
        FAQ
      </Link>
    </li>
    <li>
      <Link to="/privacy" href="/privacy">
        Privacy
      </Link>
    </li>
    <li>
      <Link to="/mobile" href="/mobile">
        Mobile
      </Link>
    </li>
    <li>
      <a href="https://blogs.sliips.com/">Blog</a>
    </li>
  </ul>
);
