import React,{Component} from 'react';
import './App.css';
import Cropper from './components/Cropper'; 

class App extends Component {
    constructor(){
        super();
        this.state = {
            value: "",
            img: "https://www.am570.com.br/images/posts/1119/1119.jpg",
            cropDisabled: true
        }
    }

    handleChange = (event) =>{
        this.setState({img: URL.createObjectURL(event.target.files[0])})
        console.log(event.target)
    }

    handleSubmit = (event) => {
        console.log(this.state.img)
    }

    handleCrop = () =>{
        this.setState({cropDisabled: false})
    }

    render () { 
        const { img, cropDisabled } = this.state
        return(  
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.handleChange} />
                </div>
                <Cropper src={img} disabled={cropDisabled}/>
                <button onClick={this.handleCrop}>Cortar</button>
            </div>)
    };
}

export default App;
