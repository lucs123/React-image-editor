import React,{Component} from 'react';


class ImgList extends Component {
    render(){
        return(
            <div>
                <ul>
                    {this.props.images.map(image=>
                        <li>
                            <img src={image}/>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default ImgList
