class Stop extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            buses: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        if (this.state.buses.length > 0){
            this.setState({buses: []})
        } else {
            this.getBuses()
        }
    }

    getBuses(){
        fetch('api/stops/buses?stop_id=' + this.props.stop.id)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        buses: result
                    })
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    render(){
        return(
            <div>
                <li className="btn btn-secondary btn-lg btn-block mt-1" onClick={this.handleClick}>{this.props.stop.name}</li>
                <ul className="list-group list-group-flush">
                { this.state.buses.map((bus, idx) => 
                    <li className="list-group-item p-1 text-truncate" key={idx}>
                        <span className="badge badge-primary mr-2">{bus.line}</span>
                        {bus.destination}
                        <small className="float-right text-muted">{bus.distance} / {bus.status}</small>
                    </li>
                ) }
                </ul>
            </div>
        )
    }
}