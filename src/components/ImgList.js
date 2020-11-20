import React,{Component} from 'react';


class ImgList extends Component {
    render(){
        return(
            <div>
                <ul>
                    {this.props.images.map(image=>
                            <img src={image} onClick={this.props.changeImage}/>
                    )}
                </ul>
            </div>
        )
    }
}

export default ImgList
