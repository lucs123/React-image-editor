import React,{Component} from 'react';
import './App.css';
import Cropper from './components/Cropper'; 
import image from './1119.jpg'

class App extends Component {
    constructor(){
        super();
        this.state = {
            value: "",
            img: image,
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

    imgLoad(){
        /*global cv*/
        let mat = cv.imread('img');
        console.log(mat)
    }

    render () { 
        const { img, cropDisabled } = this.state
        return(  
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.handleChange} />
                </div>
                <Cropper src={img} disabled={cropDisabled}/>
                <img id='img' src={this.state.img} onLoad={this.imgLoad} />
                <button onClick={this.handleCrop}>Cortar</button>
            </div>)
    };
}

export default App;
