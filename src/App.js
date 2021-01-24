import {useState, useEffect} from 'react';
import './App.css';
import {FormControl, MenuItem, Select} from '@material-ui/core';

function App() {

  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('WorldWide');

  useEffect(()=>{
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=> response.json())
      .then((data)=>{
        const countries = data.map((country)=>(
          {
            name: country.country,
          value: country.countryInfo.iso2
          }));
          setcountries(countries);
      });
    };
    getCountriesData();
  },[]);

  const oncountrychange = async(e)=>{
    const countrycode = e.target.value;
  
    setcountry(countrycode);

  }

  return (
    <div className="main-app-container">
      <div className='app-left-container'>
        <div className='app-left-top'>
          <div><h1>COVID 19 TRACKER</h1></div>
          <div><FormControl className='app-left-top-country-dropdown'>
            <Select variant='outlined' onChange={oncountrychange} value={country}>
              <MenuItem value='WorldWide'>WorldWide</MenuItem>
              {countries.map((country)=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

            </Select>
            </FormControl></div>
        </div>

        <div className='app-left-middle'>
          
        </div>

        <div className='app-left-bottom'>
          
        </div>

      </div>

      <div className='app-right-container'>

      </div >

    </div>
  );
}

export default App;
