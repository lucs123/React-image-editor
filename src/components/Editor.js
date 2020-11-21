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
        this.clearCanvas()
        if(this.props.img){
            console.log('handle change')
            this.srcRef.current.src = this.props.img
            this.setState({oldImages:[]})
    }}

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
        if(this.props.img){
            const canvas = this.cnvRef.current
            return canvas.toDataURL()
        }
        else{
            return null
        }
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
        if(this.props.img){
        this.srcRef.current.src = this.props.img
    }}

    imgLoad = ()=>{
        console.log('img load')
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

    cleanSelection = ()=>{
        this.cropper.reset()
        this.cropper.clear()
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
                    <Button variant="outlined" onClick={this.handleCrop}>Seleção</Button>
                    <Button variant="outlined" onClick={this.handleMove}>Mover</Button>
                    <Button variant="outlined" onClick={this.equalize}>Equalizar Imagem</Button>
                    <Button variant="outlined" onClick={this.handleRotate}>Rotacionar</Button>
                    <Button variant="outlined" onClick={this.cleanSelection}>Limpar seleção</Button>
                    <Button variant="outlined" onClick={this.getCropped}>Cortar</Button>
                    {this.state.oldImages.length ? <Button onClick={this.undoChange}>Desfazer</Button> : null }
                </Paper>
            </div>)
    };
}


export default Editor
