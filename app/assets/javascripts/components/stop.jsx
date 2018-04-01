class Stop extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            buses: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        if (this.state.buses.count > 0){
            this.setState({buses: []})
        } else {
            this.getBuses()
        }
    }

    getBuses(){
        console.log(this.props)
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
            <li class="uk-button uk-button-primary uk-width-1-1 .uk-margin-small" onClick={this.handleClick}>{this.props.stop.name}</li>
        )
    }
}