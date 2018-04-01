class StopList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            stops: [],
            error: false,
            loaded: false
        }
    }

    componentDidMount() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(pos => this.getStops(pos));
        } 
    }

    getStops(pos) {
        fetch('api/stops/nearby?lat=' + pos.coords.latitude + '&long=' + pos.coords.longitude)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        stops: result,
                        loaded: true
                    })
                },
                (error) => {
                    this.setState({
                      loaded: true,
                      error: true
                    })
                }
            )
    }

    componentDidCatch(error, info) {
        this.setState({ error: true });
      }
    

    render(){
        if (this.state.error){
            return <div>Something Went Wrong</div>
        }
        if (!this.state.loaded){
            return <div>Finding stops...</div>
        }
        return(
            this.state.stops.map((stop) =>
                <Stop key={stop.id} stop={stop}/>
            )
        )
    }
}