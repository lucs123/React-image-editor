import React,{Component} from 'react';
import './App.css';
import Cropper from './components/Cropper'; 
import d3 from 'react-d3-library'

class App extends Component {
    constructor(){
        super();
        this.state = {
            value: "",
            img: "https://www.am570.com.br/images/posts/1119/1119.jpg",
            cropDisabled: true
        }
    }

    componentDidMount(){
        var cnv = document.getElementById('imageCanvas');
        var ctx = cnv.getContext('2d');
        var cnvori = document.getElementById('imageOriginalCanvas');
        var ctxori = cnvori.getContext('2d');

            var colorScales = {
        'linearB000lackAndWhite': function(values){
            return d3.scale.linear()
            .domain(d3.extent(values))
            .range(['#', '#fff']);
        },
        'histogramEqualize': function(values){
            var buckets = 100;
            var quantiles = d3.scale.quantile()
                .domain(values)
                .range(d3.range(buckets))
                .quantiles();

            var stopCount = quantiles.length;
            var linearScale = d3.scale.linear()
                .domain([0, stopCount - 1])
                .range([d3.rgb('rgb(0, 0, 0)'), d3.rgb('rgb(255, 255, 255)')]);
            
            var grayScale = d3.range(stopCount).map(function(d){
            return linearScale(d);
            });

            return d3.scale.linear().domain(quantiles).range(grayScale);
        }
        };

        var img = new Image;
        img.onload = function(){

        cnvori.width = cnv.width = img.width;
        cnvori.height = cnv.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        ctxori.drawImage(img, 0, 0, img.width, img.height);

        var imgData = ctx.getImageData(0, 0, img.width, img.height);

        var rasterData = [];
        for(let j = 0; j < (imgData.data.length / 4); j++){
            // var brightness = d3.lab(d3.rgb(imgData.data[j * 4], 
            //                     imgData.data[j * 4 + 1], 
            //                     imgData.data[j * 4 + 2])).l;
            // rasterData.push(imgData.data[j * 4] === 0 ? null : brightness);
        }

        var scale = colorScales.histogramEqualize(rasterData);

        for(let j = 0; j < rasterData.length; j++){
            var scaledColor = scale(rasterData[j]);
            var color = d3.rgb(scaledColor);
            imgData.data[j * 4] = color.r;
            imgData.data[j * 4 + 1] = color.g;
            imgData.data[j * 4 + 2] = color.b;
            imgData.data[j * 4 + 3] = 255;
        }

        ctx.putImageData(imgData, 0, 0);
        };
        img.crossOrigin = '';   
        img.src = 'https://upload.wikimedia.org/wikipedia/commons/0/08/Unequalized_Hawkes_Bay_NZ.jpg';
    }

    handleChange = (event) =>{
        this.setState({img: URL.createObjectURL(event.target.files[0])})
        console.log(event.target)
    }

    handleSubmit = (event) => {
        console.log(this.state.img)
    }

    handleCrop = () =>{
        this.setState({cropDisabled: false})
    }

    render () { 
        const { img, cropDisabled } = this.state
        return(  
            <div className="App">
                <div>
                    <input type="file" accept="image/*" onChange={this.handleChange} />
                </div>
                <Cropper src={img} disabled={cropDisabled}/>
                <button onClick={this.handleCrop}>Cortar</button>
  <canvas id="imageOriginalCanvas"></canvas>
	<canvas id="imageCanvas"></canvas>
            </div>)
    };
}

export default App;
