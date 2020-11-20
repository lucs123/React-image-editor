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
            oldImages: [],
            imageDestination: null
        }
        this.srcRef = React.createRef()
        this.cnvRef = React.createRef()
        this.desRef = React.createRef()
        this.orRef = React.createRef()
        this.cropper = null
    }

    handleChange = async (event) =>{
        this.clearCanvas()
        const newImage = URL.createObjectURL(event.target.files[0])
        this.srcRef.current.src = newImage
    }

    clearCanvas = ()=>{
        this.cropper.destroy()
        const canvas = this.cnvRef.current
        console.log(canvas)
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    handleDownload = ()=>{
        const canvas = this.cnvRef.current
        const link = document.createElement('a');
        link.download = 'new_image.png';
        link.href = canvas.toDataURL()
        link.click();
    }

    componentDidMount(){
        this.srcRef.current.src = unequalized
    }

    imgLoad = ()=>{
        this.drawImage()
    }

    drawImage = ()=>{
        const image = this.srcRef.current
        const canvas = this.cnvRef.current
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image,0,0,image.width,image.height);
        this.enableCrop()
    }

    enableCrop = () =>{
        const canvas = this.cnvRef.current
        const cropper = new Cropper(canvas, {
            zoomable: true,
        // scalable: false,
        // aspectRatio: 1,
            autoCrop: false,
            background: false,
        crop(event) {

        },
        });
        this.cropper = cropper
    }

    getCropped = ()=>{
        const cropped = this.cropper.getCroppedCanvas()
        const newImage = cropped.toDataURL("image/png")
        this.clearCanvas()
        this.srcRef.current.src = newImage
    }

    handleRotate = ()=>{
        this.cropper.rotate(90)
    }

    handleCrop = ()=>{
        this.cropper.setDragMode('crop')
    }

    handleMove = ()=>{
        this.cropper.setDragMode('move')
    }

    handleZoom = ()=>{
        console.log(this.cropper)
        this.cropper.zoomable = true
        this.cropper.zoomOnWheel = true
    }

    equalize = ()=>{
        this.cropper.destroy()
        /*global cv*/
        const image = this.srcRef.current
        const canvas = this.cnvRef.current
        let mat = cv.imread(image)
        let dst = new cv.Mat();
        cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);
        cv.equalizeHist(mat,dst)
        // cv.imwrite('res.png')
        cv.imshow(canvas, dst);
        this.enableCrop()
    }

    render () { 
        return(  
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.handleChange} />
                </div>
                <div className={"img-container"}>
                    <canvas id='src' ref={this.cnvRef}  />
                </div>
                <div>
                    <img ref={this.srcRef} width='50%' style={{display:'none'}} onLoad={this.imgLoad}/>
                </div>
                <button onClick={this.handleCrop}>Modo Cortar</button>
                <button onClick={this.handleMove}>Move</button>
                <button onClick={this.equalize}>Equalizar</button>
                <button onClick={this.handleDownload}>Download</button>
                <button onClick={this.handleRotate}>Left</button>
                <button onClick={this.handleRotate}>Right</button>
                <button onClick={this.handleZoom}>Enable Zoom</button>
                <button onClick={this.clearCanvas}>Limpar</button>
                <button onClick={this.getCropped}>Cortar</button>
            </div>)
    };
}

export default App;
