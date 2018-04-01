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
            <div className="uk-margin-bottom-small">
                <li className="uk-button uk-button-primary uk-width-1-1" onClick={this.handleClick}>{this.props.stop.name}</li>
                <ul className="uk-list uk-list-divider uk-margin-small">
                { this.state.buses.map((bus, idx) => 
                    <li key={idx}>
                    <span className="uk-badge uk-margin-right">{bus.line}</span>
                    {bus.destination}
                    <small className="uk-align-right">{bus.distance} / {bus.status}</small>
                    </li>
                ) }
                </ul>
            </div>
        )
    }
}