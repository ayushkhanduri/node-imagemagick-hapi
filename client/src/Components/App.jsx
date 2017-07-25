import React , { Component } from 'react';
import UserData from './UserData.jsx';
import Header from './Header.jsx';
import './app.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      file: '',
      imagePreviewUrl: ""
    }
    
  }
  
  handlerSubmit(e){
    e.preventDefault();
    let data = new FormData();
    let imageData = document.querySelector('input[type="file"]').files[0];
    data.append("data",imageData);
    let requestObj = {
      method: "POST",
      body: data
    }
    fetch("http://localhost:3000/logoUpload",requestObj).then((response)=>{
      console.log(response);
      return response.json();
    }).then((data)=>{
      console.log(data);
      this.cleanFileInput("fileInput");
      this.refs.usrData.changeImage(data);
    })
  }
  cleanFileInput(id){
    document.getElementById(id).value= ""; 
  }

  handfleFileChange(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend= ()=>{
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      console.log(this.state);
    };
    reader.readAsDataURL(file);
    
  }

  render(){
    console.log("render");
    let {imagePreviewUrl} = this.state;
    let imageUrl = null;
    if (imagePreviewUrl) {
      imageUrl = (<img id="image" src={imagePreviewUrl} />);
    } else {
      imageUrl = (<div className="previewText">Please select an Image for Preview</div>);
    }
    return (
          <div className="container">
            <Header/>
            <div className="inlineBlock">
                <div className= "floatLeft">
                  <UserData ref="usrData"/>
                  <form  encType="multipart/form-data" onSubmit={this.handlerSubmit.bind(this)} >
                    <input type="file" id="fileInput" onChange={(e)=>this.handfleFileChange(e)}/> <br/>
                    <input type="button" className="btn btn-primary"  type="submit"/>
                  </form>
                </div>
              <div className="imgPreview">
                {imageUrl}
              </div>
            </div>
          </div>
              );
  }
}

export default App;
