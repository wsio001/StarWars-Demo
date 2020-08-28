import React, {useEffect, useState,useRef} from 'react';
import './App.css';
import Person from './Person';

const App = () =>{

  const firstInit = useRef(true);

  const [people, setPeople] = useState([]);
  const [species, setSpecies] = useState([]);
  const [starships, setStarships] = useState([]);
  const [films, setFilms] = useState([]);

  const [search, setSearch] = useState(() => {
    console.log("Run function search");
    return '';
  });

  const [query, setQuery] = useState(() => {
    console.log("Run function query");
    return '';
  });

  useEffect(() =>{
    if(!firstInit.current){ // if firstInit is false, then run getCharacter. this is to prevent the search happen on the first 
      getObject('people');
    }
    firstInit.current = false
  },[query]);


  const getObject = async (type) => {
    const response = await fetch(`https://swapi.dev/api/${type}/${query}`);
    const data = await response.json();
    if(type === 'people'){
      setPeople(data.results);
    }
    else if(type === 'species'){
      setSpecies(data.results);
    }
    else if(type === 'starships'){
      setStarships(data.results);
    }
    else if(type === 'starships'){
      setFilms(data.results);
    }
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
    setQuery('?search=' + search);
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
        {people.map(person => (
          <Person 
          key = {person.url} 
          name = {person.name}
          height = {person.height}
          weight = {person.mass}
          hairColor = {person.hair_color}
          dateOfBirth = {person.birth_year}
          speciesInfo = {person.species}
          />
        ))} 
    </div>
  );
};

export default App;
