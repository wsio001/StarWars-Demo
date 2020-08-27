import React, {useEffect, useState,useRef} from 'react';
import './App.css';
import Character from './Character';

const App = () =>{

  const id = 0;
  const firstInit = useRef(true);
  const [characters, setCharacters] = useState([]);

  const [search, setSearch] = useState(() => {
    console.log("Run function search");
    return '';
  });

  const [query, setQuery] = useState(() => {
    console.log("Run function query");
    return '';
  });

  useEffect(() =>{
    if(!firstInit.current){
      console.log("use effect run");
      console.log(`https://swapi.dev/api/people/?search=${query}`);
      getCharacter();
    }
    firstInit.current = false
  },[query]);


  const getCharacter = async () => {
    const response = await fetch(`https://swapi.dev/api/people/?search=${query}`);
    const data = await response.json();
    setCharacters(data.results);
    console.log(data.results);
  };

  const updateSearch = e => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    //console.log("evalue", searchTerm);
    //console.log("search that i just typed in", search);
  }

  const getSearch = e =>{
    e.preventDefault(); //after hitting submit the page refresh, this prevent the page from refre
    console.log("search term: ", search);
    setQuery(search);
    setSearch('');
  }

  return(
    <div className = "App">
      <form onSubmit = {getSearch} className = "search-form">
        <input className = "search-bar" type = 'text' value = {search} onChange={updateSearch}/>
        <button className = "search-button" type = 'submit'>
          Search
        </button>
      </form>
        {characters.map(character => (
          <Character 
          key = {character.url} 
          name = {character.name}
          height = {character.height}
          weight = {character.mass}
          hairColor = {character.hair_color}
          dateOfBirth = {character.birth_year}
          speciesInfo = {character.species}
          />
        ))} 
    </div>
  );
};

export default App;
