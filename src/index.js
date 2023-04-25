import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { AWSIoTProvider }from "@aws-amplify/pubsub";
import config from './aws-exports';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'; // Import global styles

Amplify.configure(config);
Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: config.aws_project_region, // Specify the region where your IoT core is located
  aws_pubsub_endpoint: config.aws_iot_endpoint, // Specify the IoT endpoint
}));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
