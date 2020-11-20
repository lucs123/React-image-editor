import React,{Component} from 'react';


class DbList extends Component {
    render(){
        return(
            <div>
                <ul>
                    {this.props.databases.map(database=>( 
                        <button onClick={this.props.changeDb}>{database.name}</button>
                    )
                    )}
                </ul>
                <button onClick={this.props.createDB}>Novo Banco</button>
            </div>
        )
    }
}

export default DbList
