<a href='https://weathertoclimb.herokuapp.com/'>Live Page</a>

# Summary

This is a weather app that allows the user to compare forecasts at rock climbing areas side by side. The idea is an iteration of an old site, climbingweather.com, that became kind of popular but has been abandoned and never offered this type of side by side comparison functionality, which was something I have wanted to use.

The site was built with a React front end, TypeScript, and a Ruby on Rails back end. It uses the National Weather Service API to get point forecasts at the specific locations (and not just nearby cities), Google Maps API integration, emailsjs for a contact form, and react-beautiful-dnd for drag and drop functionality to better compare forecasts.

# Improvements

There are several features that could be added to this site, but I did not have time to finish. I would like to extract the save/unsave logic to a custom hook and ad the functionality to both the dropdown search menu and the modals in the map. I would also do the same for fetching the forecasts, and display a day or two of weather in the map modal windows. I might also add omni-authorization, and set the hourly weather to display by 3 hour increments with an option to see every hour.

The fetch forecast logic could probably be improved. I implemented conditional blocks to refetch when the NWS API call failed, but it just does not seem like great code. This could probably be refactored or replaced with a library that allows for re-fetching on failure.

The TypeScript could probably be improved. The modal window components could probably be refactored to a better design in which there is one modal window that renders its content as a child, instead of the multiple modal windows that are currently rendered and hidden.

The database also needs to have many more climbing areas added throughout the U.S.
