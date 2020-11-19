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
        this.srcRef = React.createRef()
        this.desRef = React.createRef()
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

    imgLoad = ()=>{
        const srcRef = this.srcRef.current
        let desRef = this.desRef.current
        /*global cv*/
        let mat = cv.imread(this.srcRef.current)
        let dst = new cv.Mat();
        cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);
        // cv.equalizeHist(mat.data,dst)
        // cv.imwrite('res.png')
        cv.imshow(desRef, mat);
        console.log(dst)
        console.log(mat)
        // console.log(equ)
    }

    render () { 
        const { img, cropDisabled } = this.state
        return(  
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.handleChange} />
                </div>
                <Cropper src={img} disabled={cropDisabled}/>
                <img id='src' ref={this.srcRef} src={this.state.img} onLoad={this.imgLoad} />
                <canvas id='dst' ref={this.desRef} />
                <button onClick={this.handleCrop}>Cortar</button>
            </div>)
    };
}

export default App;
