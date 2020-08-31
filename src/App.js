import React, {useEffect, useState,useRef} from 'react';
import './App.css';
import Person from './Person';
import Species from './Species';
import Starships from './Starships';
import Films from './Films';

const App = () =>{

  const firstInit = useRef(true);

  const [people, setPeople] = useState(()=>{return []});
  const [species, setSpecies] = useState(()=>{return []});
  const [speciesQ, setSpeciesQ] = useState(()=>{return []});
  const [starshipsQ, setStarshipsQ] = useState(()=>{return []});
  const [starships, setStarships] = useState(()=>{return []});
  const [filmsQ, setFilmsQ] = useState(()=>{return []});
  const [films, setFilms] = useState(()=>{return []});
  const [showSpButton, setShowSpButton] = useState(()=>{return false});
  const [showShipButton, setShowShipButton] = useState(()=>{return false});
  const [showFilmButton, setShowFilmButton] = useState(()=>{return false});
  

  const [search, setSearch] = useState(() => {
    console.log("Run function search");
    return '';
  });

  const getObject = async (type, url) => {
    
    const response = await fetch(url);
    const data = await response.json();

    switch(type){
      case 'people':
        setPeople(data.results);
        setSpeciesQ(data.results[0].species);
        setFilmsQ(data.results[0].films);
        setStarshipsQ(data.results[0].starships);
        setShowSpButton(true);
        setShowShipButton(true);
        setShowFilmButton(true);
        break;
      case 'species':
        setSpecies(data);
        break;
      case 'starships':
        setStarships(previous => [...previous,data ]);
        break;
      case 'films':
        setFilms(previous => [...previous,data ]);
        break;
    }
    return {data}
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
    getObject('people','https://swapi.dev/api/people/?search=' + search);
    setSearch('');
  }

  const showSpecies = () =>{
    setShowSpButton(false);
    getObject('species',speciesQ);
  }

  const showShips = () =>{
    setShowShipButton(false);
    for(let i = 0; i < starshipsQ.length; i++){
      getObject('starships', starshipsQ[i]);
    }
  }

  const showFilms = () =>{
    setShowFilmButton(false);
    for(let i = 0; i < filmsQ.length; i++){
      getObject('films',filmsQ[i]);
    }
  }

  const extraContent = <div>
  <span>{starshipsQ}</span> <br/>
  <span>{filmsQ}</span> <br/>
  </div>

  const showSpeciesSpace = showSpButton?'Show species':null;
  const showShipsSpace = showShipButton?'Show ships':null;
  const showFilmsSpace = showFilmButton?'Show Films':null;
  //const showFilmsSpace = showButton?'Show films':null;

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
          />
        ))}

        <a onClick = {showSpecies}>{showSpeciesSpace}</a><br/><br/><br/>
        {
          species.length > 0?
          [species].map(s => (
            <Species 
            key = {s.url} 
            name = {s.name}
            />
          ))
          :null
        }
        
        <a onClick = {showShips}>{showShipsSpace}</a><br/><br/><br/>
        {
          starships.length > 0?
          starships.map(sh => (
            <Starships 
            key = {sh.url} 
            name = {sh.name}
            />
          ))
          :null
        }

        <a onClick = {showFilms}>{showFilmsSpace}</a>
        {
          films.length > 0?
          films.map(f => (
            <Films 
            key = {f.url} 
            title = {f.title}
            />
          ))
          :null
        }

    </div>
  );
};

export default App;