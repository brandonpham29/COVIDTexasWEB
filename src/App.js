import React, {useEffect, useState} from 'react';
import './App.css';
import County from './County';

const App = () => {

  const[name, setName] = useState("")
  const[cases, setCases] = useState(0)
  const[deaths, setDeaths] = useState(0)
  const[search, setSearch] = useState("")
  const[query, setQuery] = useState('')
  const[data, setData] = useState([])

  useEffect(() => {
    getData();
  },[query]);

  const getData = async () => {
    const response = await fetch(`https://us-central1-firestoretest-3538c.cloudfunctions.net/app/api/read/${query}`);
    const data = await response.json();
    console.log(data);
    setName(data.Name);
    setCases(data.Cases);
    setDeaths(data.Deaths);
    setData(data)
  };

  const defaultSearch = () => {
    if(query == "") {
      return(
        <>
        {data.map(county => (
          <County key={county.Name} 
          countyName={county.Name} 
          countyDeaths={county.Deaths} 
          countyCases={county.Cases}/>
        ))}
        </>
      )
    } else{
      return(
        <County countyName={name} countyDeaths={deaths} countyCases={cases}/>
      )
    }
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search Texas County
        </button> <button className="allButton" onClick={() => window.location.reload(false)}>All Texas Counties</button>
      </form>
      <div className="Counties">
        {defaultSearch()}
      </div>
      
    </div>
  )
}

export default App;
