import React from 'react';
import Router from 'next/router';

const login = '/login?redirected=true';

const checkUserAuthentication = (req) => {
  if (!req ?.headers ?.cookie) {
    return false;
  }

  const match = req.headers.cookie
    .split(';')
    .find((item) => item.trim().startsWith('authenticated='));

  if (!match) {
    return false;
  }

  return Boolean(match.split('=')[1]);
};

export default WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const isAuthenticated = await checkUserAuthentication(context.res);

    if (!isAuthenticated) {
      if (context.res) {
        context.res.writeHead(303, { Location: login });
        context.res.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({ ...context, isAuthenticated });
      return { ...wrappedProps, isAuthenticated };
    }

    return { isAuthenticated };
  };

  return hocComponent;
};