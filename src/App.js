import React,{Component} from 'react';
import './App.css';
import unequalized from './Unequalized_Hawkes_Bay_NZ.jpg'
import Editor from './components/Editor'
import ImgList from './components/ImgList'
import DbList from './components/DbList'
import 'fontsource-roboto';
import {Grid} from '@material-ui/core';
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


    handleUpload = async (event) =>{
        const newImage = URL.createObjectURL(event.target.files[0])
        const currentImage = this.editorRef.current.getImage()
        if(currentImage){
        await this.setState(state=>{
            const images = state.images.concat(currentImage)
            return{
                images:images,
                img: newImage
            }
        })}
        else{
            await this.setState({img:newImage})
        }
        this.editorRef.current.handleChange()
    }


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
            let newImage = newImages[0]
            if(!newImage){
                newImage = null
            }
            console.log(newImages)
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
        console.log(image)
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
                                    <Button variant="outlined"  component="span">
                                        Upload
                                    </Button>
                                </label>
                                <Button variant="outlined" color="primary" onClick={this.handleDownload}>Download</Button>
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
