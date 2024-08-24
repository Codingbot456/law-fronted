import React from 'react';
import BlogList from '../../blogs/BlogList';
import PopularPosts from './PopularPosts';


const Home = () => {
  return (
    <div >
      <div >
        <BlogList />
        <PopularPosts />
        
      
      </div>
    </div>
  );
};

export default Home;
