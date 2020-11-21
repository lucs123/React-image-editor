import React,{Component} from 'react';
import './App.css';
import unequalized from './Unequalized_Hawkes_Bay_NZ.jpg'
import cat from './1119.jpg'
import Editor from './components/Editor'
import ImgList from './components/ImgList'
import DbList from './components/DbList'
import 'fontsource-roboto';
import {Grid,withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';

class App extends Component {
    constructor(){
        super();
        this.state = {
            img: unequalized,
            images: [],
            databases: [
                {
                    name: 'Banco 1',
                    images: []
                }
            ],
            banco: 'Banco 1',
            nBanco: 1
        }
        this.editorRef = React.createRef()
    }

    // setImage = async (event) =>{
    //     const newImage = URL.createObjectURL(event.target.files[0])
    //     await this.setState({img: newImage})
    //     this.editorRef.current.handleChange()
    // }

    handleUpload = async (event) =>{
        const newImage = URL.createObjectURL(event.target.files[0])
        const currentImage = this.editorRef.current.getImage()
        await this.setState(state=>{
            const images = state.images.concat(currentImage)
            return{
                images:images,
                img: newImage
            }
        })
        this.editorRef.current.handleChange()
    }

    // componentDidMount(){
    //     this.createDB()
    // }

    createDB = ()=>{
        const nBanco = this.state.nBanco + 1
        const name = 'Banco ' + nBanco
        const newDb = {
            name: name,
            images: []
        }
        this.setState(state=>{
            const databases = state.databases.concat(newDb)
            return{
                databases: databases,
                nBanco: nBanco
            }
        })
    }

    changeDb = async (event)=>{
        const newDb = event.target.textContent
        const currentBanco = this.state.banco
        if(currentBanco !== newDb){
            const currentImages = this.state.images
            const currentImage = this.editorRef.current.getImage()
            currentImages.push(currentImage)
            let newImages = []
            const databases = [...this.state.databases]
                databases.forEach(database=>{
                console.log(database)
                if(database.name === currentBanco){
                    database.images = currentImages
                }
                if(database.name === newDb){
                    newImages = database.images
                }
            })
            this.editorRef.current.clearCanvas()
            const newImage = newImages[0]
            newImages.splice(0,1)
            await this.setState({
                    banco: newDb,
                    images: newImages,
                    img: newImage,
                    databases: databases
            })
            this.editorRef.current.handleChange()
    }}

    handleDownload = ()=>{
        this.editorRef.current.handleDownload()
    }

    changeImage = async (event)=>{
        const image = event.target.src
        const currentImage = this.editorRef.current.getImage()
        await this.setState(state=>{
            const images = state.images.filter(el=>el!==image)
            images.push(currentImage)
            return{
                images: images,
                img: image
            }
        })
        this.editorRef.current.handleChange()
    }

    render () { 
        return(  
            <div className="App">
                <Grid container>
                    <Grid item xs={3}>
                        <DbList databases={this.state.databases} createDB={this.createDB} changeDb={this.changeDb}/>
                    </Grid>
                    <Grid item xs={8}>
                        <div>
                            <input
                                accept="image/*"
                                className={'input'}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={this.handleUpload}
                            />
                            <div className={'top-buttons'}>
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                        Upload
                                    </Button>
                                </label>
                                <Button variant="outlined" color="secondary" onClick={this.handleDownload}>Download</Button>
                            </div>
                        </div>
                        <Editor ref={this.editorRef} img={this.state.img}/>
                    </Grid>
                    <Grid item xs={3}>
                        <ImgList images={this.state.images} changeImage={this.changeImage}/>
                    </Grid>
                </Grid>
            </div>)
    };
}

export default App;
