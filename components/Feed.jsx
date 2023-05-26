'use client';
import {useState, useEffect} from 'react';

import PromptCard from './PromptCard';

const PromptcardList = ({ data, handleTagClick }) => {
  return(
    <div className='mt-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-16'>
      {data.map((post)=> (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [ searchText, setSearchText ] = useState('');
  const [ posts, setPosts ] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);



  const handleSearchChange = (e) => {
    const inputText = e.target.value.toLowerCase();
    setSearchText(inputText);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  };

  // Fetch our own API
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data); // Set initial filtered posts to all posts
    }
    fetchPosts()
  }, []);

  // Search bar filter
    const filtered = posts.filter((post) => {
    const postText = post.prompt.toLowerCase();
    const userText = post.creator.username.toLowerCase();
    const tagText = post.tag.toLowerCase();
    const searchTextLower = searchText.toLowerCase();

    return (
      postText.includes(searchTextLower) ||
      userText.includes(searchTextLower) ||
      tagText.includes(searchTextLower)
    );
  });


  return (
    <section className='w-full'>
      <form className='mt-10'>
        <input 
        type="text" 
        placeholder='Search for a tag or a user...'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>
      {searchText ? (
        <PromptcardList
          data={filtered}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptcardList data={filtered} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
