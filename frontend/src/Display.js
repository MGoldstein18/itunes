//import React, the card components, the css and the relevent components from material ui
import React from "react";
import axios from "axios";
import DisplayCard from "./Card.js";
import { useState } from "react";
import "./display.css";
import { Button } from "reactstrap";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";

//create a function component and set it as the default export for this file
export default function Display(props) {
  //use react hooks to use state in the functional component
  const [results, setResults] = useState([]); //hold the results returned from the API call
  const [search, setSearch] = useState(""); //holds the sentence which the user types
  const [searchTerm, setSearchTerm] = useState([]); //holds the search term which is the sentence the user typed formatted in the correct way
  const [media, setMedia] = useState(""); //holds the type of media selected by the user
  const [favs, setFavs] = useState([]); //the array of favourites chosen by the user
  const [trySearch, setTrySearch] = useState(false); //variable to check if the user has tried to search for something
  const [loaded, setLoaded] = useState(false); //variable to chekc if results have loaded

  //function to make sure that state is the ultimate source for the input box
  //This function also changes the sentence entered by the user so that each word is an element in an array
  function onChange(e) {
    setSearchTerm(e.target.value.split(" "));
    setSearch(e.target.value);
  }

  //function to make sure that state is the ultimate source for the media radio inputs
  function mediaChange(e) {
    setMedia(e.target.value);
  }

  //function to add a favourite selected by the user to the favourite array
  function Favourite(e, id, artist, name) {
    //prevent reloading of page
    e.preventDefault();
    //create new array and set to favourite array stored in state
    let placeholderArray = [...favs];
    //create a new favourite object and pull in values passed as arguements
    const newFav = {
      id: id,
      arist: artist,
      name: name,
    };
    //push the new obect to the new array
    placeholderArray.push(newFav);
    //set the state favourite array to the new array
    setFavs(placeholderArray);
  }

  //function to search for the term entered by the user
  function Search(e) {
    //prevent reloading of the page
    e.preventDefault();
    //set the variable which indicates whether or not the user has tried searching to true
    setTrySearch(true);
    //use axios to call the backend express API and pass down the search term (each word joined with a "+") and the media type as params
    axios
      .put(`/${searchTerm.join("+")}/${media}`)
      .then((response) => {
        //set results to the state variable to hold it
        setResults(response.data);
        //change loaded variable to true which indicates that everything has loaded
        setLoaded(true);
      })
      //cacth any errors
      .catch((error) => console.log("Failed to find search results"));
  }

  // function to delete favourites
  function deleteFav(id) {
    //create new array and set it equal to the favourites raay
    let placeholderArray = [...favs];
    //get the index of the item which needs to be deleted
    let index = placeholderArray.findIndex((item) => item.id == id);
    //use the splice() method to remove the correct item from the array
    placeholderArray.splice(index, 1);
    //set the favs array to the placeholder array
    setFavs(placeholderArray);
  }

  /*return method display everything. This means that it displays the form which takes the users search and the displays the results. 
  It uses a ternary operator to check if something has been searched for (using the trySearch variable) and then checks if the results have loaded
  using the Loaded variable. It displays nothing if there has been no search, "Loading..." if there has been a search but no results yet and 
  the results if there are results. It also the calls and displays the favourite component. */
  return (
    <div id="displayComponent">
      <form onSubmit={(e) => Search(e)}>
        <Input
          id="input"
          placeholder="What would you like to search for...?"
          value={search}
          onChange={(e) => onChange(e)}
          inputProps={{ "aria-label": "description" }}
        />
        <br />
        <FormControl id="radioForm" component="fieldset">
          <RadioGroup
            aria-label="media"
            name="media1"
            value={media}
            onChange={(e) => mediaChange(e)}
            row
            aria-required
          >
            <FormControlLabel
              value="music"
              control={<Radio required={true} />}
              label="Music"
            />
            <FormControlLabel
              value="movie"
              control={<Radio required={true} />}
              label="Movie"
            />
            <FormControlLabel
              value="podcast"
              control={<Radio required={true} />}
              label="Podcast"
            />
            <FormControlLabel
              value="musicVideo"
              control={<Radio required={true} />}
              label="Music Video"
            />
            <FormControlLabel
              value="audioBook"
              control={<Radio required={true} />}
              label="Audio Book"
            />
            <FormControlLabel
              value="shortFilm"
              control={<Radio required={true} />}
              label="Short Film"
            />
            <FormControlLabel
              value="tvShow"
              control={<Radio required={true} />}
              label="TV Show"
            />
            <FormControlLabel
              value="software"
              control={<Radio required={true} />}
              label="Software"
            />
            <FormControlLabel
              value="ebook"
              control={<Radio required={true} />}
              label="E-Book"
            />
            <FormControlLabel value="all" control={<Radio />} label="All" />
          </RadioGroup>
        </FormControl>
        <br />
        <Button type="submit" color="info">
          Search
        </Button>
      </form>

      {trySearch ? (
        loaded ? (
          <div className="displayFlex">
            <div className="wrapper">
              {results.length === 0 ? (
                <h3>No results</h3>
              ) : (
                results.map((artist) => (
                  <DisplayCard
                    key={artist.trackId}
                    id={artist.trackId}
                    coverImage={artist.artworkUrl100}
                    trackName={artist.trackName}
                    artistName={artist.artistName}
                    artistViewURL={artist.artistViewUrl}
                    trackViewURL={artist.trackViewUrl}
                    favourite={Favourite}
                  />
                ))
              )}
            </div>
            <div className="favouriteWrapper">
              <h3>Favourites</h3>
              <hr />
              <ol>
                {favs.map((fav) => (
                  <li id={fav.id} key={fav.id} className="fav">
                    {fav.name}
                    <Button
                      onClick={() => deleteFav(fav.id)}
                      className="deleteButton"
                    >
                      X
                    </Button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <h3>Loading...</h3>
        )
      ) : (
        <p></p>
      )}
    </div>
  );
}
