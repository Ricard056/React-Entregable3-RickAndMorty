import { useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import useFetchAllLocations from './hooks/useFetchAllLocations'
import getRandomLocation from './utils/getRandomLocation'
import Header from './components/Header'
import MainContent from './components/MainContent'
import MainContentHasError from './components/mainContentHasError'

const App = () => {

  const [inputValue, setInputValue] = useState(getRandomLocation());
  const [invalidInput, setInvalidInput] = useState(false); //Por si mando null

  // const url = `https://rickandmortyapi.com/api/location/${getRandomLocation()}` //pase al useState
  const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
  const [location, hasError] = useFetch(url);
  console.log(location); //


  //! Para las sugerencias
  const [allLocations] = useFetchAllLocations();
  // console.log(allLocations) //



  //! RENDER & evitar problema con null en app__form
  const inputLocation = useRef()

  const handleSubmit = event => {
    event.preventDefault()
    // console.log(inputLocation.current.value)

    // setinputValue(inputLocation.current.value)
    const newInputValue = inputLocation.current.value;
    if (!newInputValue || newInputValue < 0 || newInputValue > 126) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
      setInputValue(newInputValue);  // Renderizara nueva id=${newInputValue} en useFetch(url)
    }
  }


  //! app__search
  const searchInput = useRef();
  const [suggestions, setSuggestions] = useState([]);
  const handleSearch = (e) => {
    const searchValue = searchInput.current.value.toLowerCase();

    if (searchValue === '') {
      setSuggestions([]); //Necesario si no quiero mostrar los 126 lugares
    } else {

      const filteredSuggestions = allLocations
        .filter((location) => location.toLowerCase().includes(searchValue))
        .slice(0, 13); //No me convence tanto...
      setSuggestions(filteredSuggestions);
    }

  };
  //Tengo un error/bug si es que dejo que me muestre demasiadas sugerencias ... Use slice 


  //! app__searchSuggestionsShow
  const handleSuggestionClick = (selectedLocation) => {
    searchInput.current.value = selectedLocation;
    setSuggestions([]);
  };

  //! app__searchInput
  const handleSearchButtonClick = () => {
    const selectedLocation = searchInput.current.value;
    const locationIndex = allLocations.indexOf(selectedLocation);
    const locationId = locationIndex + 1; //array de 0 a 125 (date: 2023 abr 17)
    setInputValue(locationId);  //Renderizara nueva id=${locationId} en useFetch(url)
  };




  return (
    <div className='app'>
      {/* <h1 className='app__title'>Rick & Morty API</h1> */}
      < Header />
      
      <form className='app__form' onSubmit={handleSubmit}>
        <input className='app__input' ref={inputLocation} type='text' placeholder='Elige del 1 al 126' />
        <button className='app__btn'>Busqueda</button>
      </form>

      <div className='app__search' onChange={handleSearch}>
        <input className='app__searchInput' ref={searchInput} type='text' placeholder='Escribe una ubicacion' />
        <button className='app__btnSearch' onClick={handleSearchButtonClick}>Busqueda</button>

        <ul className='app__searchSuggestions'>
          {suggestions.map((suggestion, index) => (
            <li className='app__searchSuggestionsShow' key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}</li>
          ))}
        </ul>
      </div>
      {
        hasError || invalidInput
          ? < MainContentHasError />
          : < MainContent location={location} />
      }
    </div>
  )
}

export default App