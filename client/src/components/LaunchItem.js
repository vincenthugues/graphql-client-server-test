import React from 'react';

const LAUNCH_SUCCESS_STRING = {
  null: 'N/A',
  true: 'Success',
  false: 'Failure'
};

const LAUNCH_SUCCESS_COLOR = {
  null: 'black',
  true: 'green',
  false: 'red'
};

export default ({ launch: {flight_number, mission_name, launch_date_local, launch_success} }) => (
  <div>
    #{flight_number}{' '}
    <b>{mission_name}</b>{' '}
    - {new Date(launch_date_local).toLocaleString()}{' '}
    - {' '}
    <em style={{color: LAUNCH_SUCCESS_COLOR[launch_success]}}>
      {LAUNCH_SUCCESS_STRING[launch_success]}
    </em>
  </div>
);
