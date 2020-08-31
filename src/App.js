import React, {useEffect, useState,useRef} from 'react';
import './App.css';
import './Info.css';
import Person from './Person';
import Species from './Species';
import Starships from './Starships';
import Films from './Films';

const App = () =>{

  const firstInit = useRef(true);
  let key = 0;

  const [people, setPeople] = useState(()=>{return []});
  const [speciesQ, setSpeciesQ] = useState(()=>{return []});
  const [species, setSpecies] = useState(()=>{return []});
  const [starshipsQ, setStarshipsQ] = useState(()=>{return []});
  const [starships, setStarships] = useState(()=>{return []});
  const [filmsQ, setFilmsQ] = useState(()=>{return []});
  const [films, setFilms] = useState(()=>{return []});
  const [showSpButton, setShowSpButton] = useState(()=>{return false});
  const [showShipButton, setShowShipButton] = useState(()=>{return false});
  const [showFilmButton, setShowFilmButton] = useState(()=>{return false});
  const [msg, setMsg] = useState(()=>{return ''});
  

  const [search, setSearch] = useState(() => {
    console.log("Run function search");
    return '';
  });

  const reset = () => {
    setShowSpButton(false);
    setShowShipButton(false);
    setShowFilmButton(false);
    setPeople([]);
    setFilms([]);
    setSpecies([])
    setStarships([]);
    setMsg('');
  }

  const getObject = async (type, url) => {

    const response = await fetch(url);
    const data = await response.json();

    
    if(data.count === 0){
      setMsg("Sorry, we cannot find what you are looking for. May the force still be with you!")
      return;
    }

    switch(type){
      case 'people':
        setPeople(data.results);
        setFilmsQ(data.results[0].films);
        setSpeciesQ(data.results[0].species)
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
  };

  const updateSearch = e => {

    const searchTerm = e.target.value;
    setSearch(searchTerm);
    //console.log("evalue", searchTerm);
    //console.log("search that i just typed in", search);
  }
  

  const getSearch = e =>{
    e.preventDefault(); //after hitting submit the page refresh, this prevent the page from refre
    if (search === ''){
      setMsg("Sorry, you will need to enter a name");
      return;
    }
    getObject('people','https://swapi.dev/api/people/?search=' + search);
    reset();
    setSearch('');
  }

  const showSpecies = () =>{
    setShowSpButton(false);
    if(speciesQ.length !=0){
      getObject('species',speciesQ);
    }else{
      key = key + 1;
      setSpecies({key: key, name:'N\A'});
    }
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


  const showSpeciesSpace = showSpButton?'Show species':null;
  const showShipsSpace = showShipButton?'Show ships':null;
  const showFilmsSpace = showFilmButton?'Show Films':null;

  const extraContent = <div>
  <span>{starshipsQ}</span> <br/>
  <span>{filmsQ}</span> <br/>
  </div>

  return(
    <div className = "App">
      <h1 className = 'Title' ><b>StarWars API Demo</b></h1>
      <form onSubmit = {getSearch} className = "search-form">
        <input className = "search-bar" type="text" placeholder="Enter Character" value = {search} onChange={updateSearch} />
        <button className = "search-button" type = 'submit' size = 'sm'>
          Search
        </button>
      </form>
      <br/> 


      <div className = "boxModel">
        <div className = "Info">
        {
          msg.length>0?
          msg:
          null
        }
        </div>
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

        <p className = 'readMore' onClick = {showSpecies}>{showSpeciesSpace}</p>
        {
          Object.keys(species).length?
          [species].map(s => (
            <Species 
            key = {s.url} 
            name = {s.name}
            />
          ))
          :null
        }
        
        <p className = 'readMore' onClick = {showShips}>{showShipsSpace}</p>
        {
          starshipsQ.length > 0?
          starships.map(sh => (
            <Starships 
            key = {sh.url} 
            name = {sh.name}
            />
          ))
          :null
        }

        <p className = 'readMore' onClick = {showFilms}>{showFilmsSpace}</p>
        {
          filmsQ.length >0?
          films.map(f => (
            <Films 
            key = {f.url} 
            title = {f.title}
            />
          ))
          :null
        }
      </div>
    </div>
  );
};

export default App;