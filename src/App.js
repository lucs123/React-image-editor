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
            cropDisabled: true,
            oldImages: []
        }
        this.srcRef = React.createRef()
        this.cnvRef = React.createRef()
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

    handleDownload = ()=>{
        const canvas = this.cnvRef.current
        const link = document.createElement('a');
        link.download = 'filename.png';
        link.href = canvas.toDataURL()
        link.click();
    }

    componentDidMount(){
        this.srcRef.current.src = unequalized
    }

    imgLoad = async ()=>{
        const image = this.srcRef.current
        console.log(image)
        const canvas = this.cnvRef.current
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image,0,0,image.width,image.height);
    }

    handleCrop = () =>{
        const canvas = this.cnvRef.current
        const cropper = new Cropper(canvas, {
            zoomable: false,
        // scalable: false,
        // aspectRatio: 1,
            // autoCrop: false,
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

    equalize = ()=>{
        /*global cv*/
        const image = this.srcRef.current
        const canvas = this.cnvRef.current
        let mat = cv.imread(image)
        let dst = new cv.Mat();
        cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);
        cv.equalizeHist(mat,dst)
        // cv.imwrite('res.png')
        cv.imshow(canvas, dst);
    }

    render () { 
        const { img, cropDisabled } = this.state
        return(  
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.handleChange} />
                </div>
                <div className={"img-container"}>
                    <canvas id='src' ref={this.cnvRef}  />
                    <img ref={this.srcRef} width='50%' style={{display:'none'}} onLoad={this.imgLoad}/>
                </div>
                <button onClick={this.handleCrop}>Cortar</button>
                <button onClick={this.equalize}>Equalizar</button>
                <button onClick={this.handleDownload}>Download</button>
            </div>)
    };
}

export default App;
