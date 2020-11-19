import React,{Component} from 'react';
import './App.css';
import Cropper from 'cropperjs'; 
import image from './1119.jpg'
import unequalized from './Unequalized_Hawkes_Bay_NZ.jpg'
import "cropperjs/dist/cropper.min.css";
  

class App extends Component {
    constructor(){
        super();
        this.state = {
            value: "",
            img: unequalized,
            cropDisabled: true
        }
        this.srcRef = React.createRef()
        this.desRef = React.createRef()
        this.orRef = React.createRef()
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

    componentDidMount(){
        const cropper = new Cropper(this.srcRef.current, {
        zoomable: false,
        // scalable: false,
        // aspectRatio: 1,
        crop(event) {
            // console.log(event.detail.x);
            // console.log(event.detail.y);
            // console.log(event.detail.width);
            // console.log(event.detail.height);
            // console.log(event.detail.rotate);
            // console.log(event.detail.scaleX);
            // console.log(event.detail.scaleY);
        },
        });
    }

    imgLoad = ()=>{
        const srcRef = this.srcRef.current
        const orRef = this.orRef.current
        let desRef = this.desRef.current

        // /*global cv*/
        // let mat = cv.imread(this.srcRef.current)
        // let dst = new cv.Mat();
        // // let dst = []
        // cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);
        // cv.equalizeHist(mat,dst)
        // // cv.imwrite('res.png')
        // cv.imshow(orRef, mat);
        // cv.imshow(desRef, dst);
        // console.log(dst)
        // console.log(mat)
        // // console.log(equ)
        
    }

                // <Cropper src={img} disabled={cropDisabled}/>
                //* <canvas id='dst' ref={this.orRef} /> */}
                //* <canvas id='dst' ref={this.desRef} /> */}
    render () { 
        const { img, cropDisabled } = this.state
        return(  
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.handleChange} />
                </div>
                <div className={"img-container"}>
                    <img id='src' ref={this.srcRef} src={this.state.img} onLoad={this.imgLoad} />
                </div>
                <button onClick={this.handleCrop}>Cortar</button>
            </div>)
    };
}

export default App;
