Project structure.

This document is an attempt to create a reference to different pages we can expect to have on the project and the main functionalities of those pages. 

This is non-exhaustive list.

### Home page
* /
* Plays the  role of the landing page of the application.
* Provides link to login
* For authenticated user provide action menu
  * Action menu contain links to those pages (account/search/queue)


### Account page
* /account
* Provides functionalities so the authenticated user can
  * manage credential password
  * manage personal information (email - name)
  * manage API key
* Provides statistic about the resources utilization.
  * how much api call they have made and their remaining balance



### Search page(s)
* /search && /search-all
* Allows the authenticated user to perform news search through the search manager
  * The search manager is the component holding the user search interaction it handles
    * allowing the user to define their search parameter
    * send the request to our server
    * showing the results with button for the next interaction (add to queue/or edit)
* Allows the user to modify a search result
* Allows the user to add a post to the queue


### Queue page
* /queue
* Allows the user to manage the selected articles so the user can
  * publish 
  * edit
  * delete from  queue
  * the publication system (this is a mini system in itself)

