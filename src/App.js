import React,{Component} from 'react';
import './App.css';
import image from './1119.jpg'
import unequalized from './Unequalized_Hawkes_Bay_NZ.jpg'
import Editor from './components/Editor'
import ImgList from './components/ImgList'
  

class App extends Component {
    constructor(){
        super();
        this.state = {
            img: unequalized,
            images: [],
            databases: []
        }
        this.editorRef = React.createRef()
    }

    setImage = async (event) =>{
        const newImage = URL.createObjectURL(event.target.files[0])
        await this.setState({img: newImage})
        this.editorRef.current.handleChange()
    }

    handleUpload = (event) =>{
        // const uploadedFile = event.target.files[]0
        // console.log(uploadedFile)
        // let newImages = []
        // uploadedFiles.map(file=>{
        //     newImages.push(URL.createObjectURL(file))
        // })
        const newImage = URL.createObjectURL(event.target.files[0])
        this.setState(state=>{
            const images = state.images.concat(newImage)
            return{images}
        })
        console.log(this.state.images)
    }

    render () { 
        return(  
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.handleUpload} />
                </div>
                <Editor ref={this.editorRef} img={this.state.img}/>
                <ImgList images={this.state.images}/>
            </div>)
    };
}

export default App;
