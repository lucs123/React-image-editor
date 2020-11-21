import React, {Component} from 'react'
import '../App.css';
import Cropper from 'cropperjs'; 
import "cropperjs/dist/cropper.min.css";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Editor extends Component{
    constructor(){
        super();
        this.state = {
            equalized: false,
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
        console.log(this.props.img)
        this.clearCanvas()
        this.srcRef.current.src = this.props.img
        this.setState({oldImages:[]})
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

    getImage = ()=>{
        const canvas = this.cnvRef.current
        return canvas.toDataURL()
    }

    backupImage = ()=>{
        const canvas = this.cnvRef.current
        const image = canvas.toDataURL("image/png")
        const equalized = this.state.equalized
        const oldImage = {
            image,
            equalized
        }
        this.setState(state=>{
            const oldImages = state.oldImages.concat(oldImage)
            return{oldImages};
        })
    }

    undoChange = ()=>{
        const oldImages = this.state.oldImages 
        const image = oldImages[oldImages.length - 1].image 
        const equalized = oldImages[oldImages.length - 1].equalized 
        this.clearCanvas()
        this.srcRef.current.src = image
        oldImages.splice(oldImages.length-1,1) 
        this.setState({
            oldImages:oldImages,
            equalized:equalized
        })
    }

    componentDidMount(){
        this.srcRef.current.src = this.props.img
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
            autoCrop: false,
            background: false,
        });
        this.cropper = cropper
    }

    getCropped = ()=>{
        this.backupImage()
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
                this.backupImage()
                this.cropper.destroy()
                /*global cv*/
                const image = this.srcRef.current
                const canvas = this.cnvRef.current
                let mat = cv.imread(image)
                let dst = new cv.Mat();
                cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);
                cv.equalizeHist(mat,dst)
                cv.imshow(canvas, dst);
                this.enableCrop()
                this.setState({equalized: true})
    }

    render () { 
        return(  
            <div>
                <Paper className={"img-container"}>
                    <canvas id='src' ref={this.cnvRef}  />
                </Paper>
                <div>
                    <img ref={this.srcRef} width='50%' style={{display:'none'}} onLoad={this.imgLoad} />
                </div>
                <Paper className={"buttons"}>
                    <Button variant="outlined" onClick={this.handleCrop}>Modo Cortar</Button>
                    <Button variant="outlined" onClick={this.handleMove}>Move</Button>
                    <Button variant="outlined" onClick={this.equalize}>Equalizar</Button>
                    <Button variant="outlined" onClick={this.handleRotate}>Left</Button>
                    <Button variant="outlined" onClick={this.handleRotate}>Right</Button>
                    <Button variant="outlined" onClick={this.handleZoom}>Enable Zoom</Button>
                    <Button variant="outlined" onClick={this.clearCanvas}>Limpar</Button>
                    <Button variant="outlined" onClick={this.getCropped}>Cortar</Button>
                    {this.state.oldImages.length ? <Button onClick={this.undoChange}>Undo</Button> : null }
                </Paper>
            </div>)
    };
}


export default Editor
