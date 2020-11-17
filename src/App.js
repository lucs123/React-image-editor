import React,{Component} from 'react';
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            value: ""
        }
    }

    handleChange = (event) =>{
        this.setState({value: event.target.value})
    }

    handleSubmit = (event) => {
        console.log(this.state.value)
    }

    render () { 
        return(  
            <div className="App">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Send" />
                </form>        
            </div>)
    };
}

export default App;
