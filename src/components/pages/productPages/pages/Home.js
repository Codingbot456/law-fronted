import React from 'react';
import Featured from '../timeline/Featured';
import Discounted from '../timeline/Discounted';
import NewArrival from '../timeline/NewArrival';

function Home() {
  return (
    <div>
      <Featured />
      <Discounted />
      <NewArrival />
    </div>
  );
}

export default Home;
