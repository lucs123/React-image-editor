import React,{Component} from 'react';
import './App.css';
import image from './1119.jpg'
import unequalized from './Unequalized_Hawkes_Bay_NZ.jpg'
import Editor from './components/Editor'
  

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

    handleUpload = async (event) =>{
        const newImage = URL.createObjectURL(event.target.files[0])
        await this.setState({img: newImage})
        this.editorRef.current.handleChange()
    }

    render () { 
        return(  
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.handleUpload} />
                </div>
                <Editor ref={this.editorRef} img={this.state.img}/>
            </div>)
    };
}

export default App;
