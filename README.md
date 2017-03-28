# NextBusNYC

### [Live](https://www.nextbus.nyc)

A mobile-friendly web app for the NYC Bus system.  Your location is used to find the nearest bus stops, which can then be tapped or clicked for information about incoming buses.

### Technical Details
* HTML5 Geolocation info is sent to server, which looks up nearest bus stops (using `geokit-rails`)
* Upon tapping a bus stop, rails server fetches realtime data for the stop from the MTA API and parses it.
