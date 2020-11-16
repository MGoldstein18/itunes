//import React and relevent component from reactstrap
import React from 'react'
import { Jumbotron } from 'reactstrap'

//use a class componene to display a jumbotron as the footer
class Footer extends React.Component{
    render(){
        return(
            <Jumbotron id="footer">
                ItunesSearch &copy; 2020
            </Jumbotron>
        )
    }
}

export default Footer