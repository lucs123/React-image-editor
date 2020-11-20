import React,{Component} from 'react';
import './App.css';
import image from './1119.jpg'
import unequalized from './Unequalized_Hawkes_Bay_NZ.jpg'
import Editor from './components/Editor'
import ImgList from './components/ImgList'
import DbList from './components/DbList'
  

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

    changeDb = (event)=>{
        console.log(event.target.text)
        const newDb = event.target.text 
        const currentBanco = this.state.banco
        if(currentBanco !== newDb){
        const currentImages = this.state.images
        const currentImage = this.editorRef.current.getImage()
        currentImages.push(currentImage)
        let newImages = []
        this.setState(state=>{
            const databases = state.databases.map(database=>{
                // console.log(database)
                if(database.name === currentBanco){
                    database.images = currentImages
                }
                if(database.name === newDb){
                    newImages = database.images
                }
            })
            return{
                banco: newDb,
                images: newImages,
                img: newImages[0],
                databases: databases
            }
        })
    }}

    log = ()=>{
        console.log(this.state.databases)
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
                <div>
                    <input type="file" accept="image/*" onChange={this.handleUpload} />
                </div>
                <Editor ref={this.editorRef} img={this.state.img}/>
                <DbList databases={this.state.databases} createDB={this.createDB} changeDb={this.changeDb}/>
                <ImgList images={this.state.images} changeImage={this.changeImage}/>
                <button onClick={this.log}>Log</button>
            </div>)
    };
}

export default App;
