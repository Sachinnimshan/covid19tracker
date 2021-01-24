import {useState, useEffect} from 'react';
import './App.css';
import {Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import InfoBox from './components/InfoBox/InfoBox';
import TableInfo from './components/Tables/TableInfo';
import {SortData} from './utils';
import LineGraph from './components/Graphs/LineGraph';

function App() {

  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('worldwide');
  const [countryInfo, setcountryInfo] = useState({});
  const [tabledata, settabledata]  = useState([]);

  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response)=> response.json())
    .then((data)=>{
      setcountryInfo(data);
    });
  },[]);

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
          const sortedData = SortData(data);
          settabledata(sortedData);
          setcountries(countries);
      });
    };
    getCountriesData();
  },[]);

  const oncountrychange = async(e)=>{
    const countrycode = e.target.value;
    const url = countrycode === "worldwide" ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countrycode}`;
    await fetch(url)
    .then((response)=> response.json())
    .then((data)=>{
      setcountry(countrycode);
      setcountryInfo(data);
    })
  };

  return (
    <div className="main-app-container">
      <div className='app-left-container'>
        <div className='app-left-top'>
          <div><h1>COVID 19 TRACKER</h1></div>
          <div><FormControl className='app-left-top-country-dropdown'>
            <Select variant='outlined' onChange={oncountrychange} value={country}>
              <MenuItem value='worldwide'>WorldWide</MenuItem>
              {countries.map((country)=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
            </FormControl></div>
        </div>

        <div className='app-left-middle'>
          <div className='infobox-card-cases'>
          <InfoBox Title='Corona Virus Cases'
          Cases={countryInfo.todayCases} 
          Total={countryInfo.cases}/>
          </div>

          <div className='infobox-card-recovered'>
          <InfoBox Title='Recovered' 
          Cases={countryInfo.todayRecovered} 
          Total={countryInfo.recovered}/>
          </div>

          <div className='infobox-card-deaths'>
          <InfoBox Title='Deaths'
           Cases={countryInfo.todayDeaths} 
           Total={countryInfo.deaths}/>
          </div>

        </div>

        <div className='app-left-bottom'>
          
        </div>

      </div>

      <div className='app-right-container'>
        <div>
          <Card className='tableinfo-card'>
            <CardContent>
              <TableInfo countries={tabledata}/>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className='linegraph-card'>
            <CardContent>
              <LineGraph/>
            </CardContent>
          </Card>
        </div>
      </div >

    </div>
  );
}

export default App;
