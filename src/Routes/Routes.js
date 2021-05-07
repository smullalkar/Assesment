import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Components/Home/Home'
import NotFound from '../Components/Common/NotFound/NotFound'
import MovieDetails from '../Components/MovieDetails/MovieDetails'


export default function Routes() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route exact path='/:id' component={MovieDetails}/>
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}
