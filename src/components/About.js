import React from 'react';
import './About.css';
import { useEffect } from 'react';
import { Auth } from 'aws-amplify';

const About = () => {

  useEffect(() => {
    Auth.currentCredentials()
      .then((data) => {
        console.log('Cognito Identity ID:', data.identityId);
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="about-container">
      <h1 className="about-title">Team Titan</h1>
      <img
        className="about-image"
        src={`${process.env.PUBLIC_URL}/group.png`}
        alt="conquer"
        width="1280"
        height="720"
      />
      <p className="about-text">
        The Heatmap Monitoring and Alert Project is a system designed to monitor and alert users in
        real-time of changes in heatmap data. This system will be used to monitor areas with high
        traffic and congestion, allowing users to respond promptly to potential safety hazards and
        take appropriate action.
      </p>
      <div className="about-image-container">
        <img
          className="about-image"
          src={`${process.env.PUBLIC_URL}/heatmap1.png`}
          alt="kobe-1"
          width="580"
          height="420"
        />
        <img
          className="about-image"
          src={`${process.env.PUBLIC_URL}/heatmap2.png`}
          alt="kobe-1"
          width="580"
          height="220"
        />
      </div>
      <p className="about-text">
        Members of Team Titans are: Shan Thang, Kedrick, Chris, and Nick.
      </p>
    </div>
  );
};

export default About;
