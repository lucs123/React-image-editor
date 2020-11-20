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

    // setImage = async (event) =>{
    //     const newImage = URL.createObjectURL(event.target.files[0])
    //     await this.setState({img: newImage})
    //     this.editorRef.current.handleChange()
    // }

    handleUpload = async (event) =>{
        const newImage = URL.createObjectURL(event.target.files[0])
        await this.setState(state=>{
            const images = state.images.concat(state.img)
            return{
                images:images,
                img: newImage
            }
        })
        this.editorRef.current.handleChange()
    }

    changeImage = async (event)=>{
        const image = event.target.src
        await this.setState(state=>{
            const images = state.images.filter(el=>el!==image)
            images.push(state.img)
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
                <ImgList images={this.state.images} changeImage={this.changeImage}/>
            </div>)
    };
}

export default App;
