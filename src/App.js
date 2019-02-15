import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

let id = null

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      fetching: true,
      projects:[],
      id: id,
      actions: []
    }
  }
  componentDidMount(){
    axios.get('http://localhost:3000/api/projects')
      .then(response=>{
        console.log(response.data);
        this.setState(prevState=>({projects: response.data, fetching:false}))
      })
      .catch(err=>console.log(err))
  }
  handleClick = (id)=>{
    axios.get(`http://localhost:3000/api/actions/${id}`)
      .then(action=>{console.log(action); this.setState({actions: action.data})})
      .catch(err=>console.log(err))
  }
  render() {

    return (

      <div className="App">
         {this.state.fetching ? (<h3>Hold on, loading data</h3>) :(<div>{this.state.projects.map((project,index)=>{
            return <div onClick = {()=>this.handleClick(project.id)}>
                      <div>{project.name}</div><div>{project.description}</div>
                      <div className = "description-class">{this.state.actions.description}</div>
                    </div>
         })}</div>)}
      </div>
    );
  }
}

export default App;
