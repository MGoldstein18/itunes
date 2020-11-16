//import React from relevent component from reactstrap
import React from 'react'
import {Jumbotron} from 'reactstrap'

//use a functional component to create and export a jumbotron as the header
export default function Heading(){
    return(
        <div id="jumbo-div">
            <Jumbotron id="jumbotron">
                <h1>Search Itunes</h1>

            </Jumbotron>
        </div>
    )
}
