import { Fragment } from 'react';
import React from 'react';
import '../src/css/App.css';
// import ReactDOM from 'react-dom/client';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { publicRouter } from './routes/index';
import { Default } from './components/layouts/index';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {publicRouter.map((route, index) => {
              const Page = route.component;

              let Layout = Default;

              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
