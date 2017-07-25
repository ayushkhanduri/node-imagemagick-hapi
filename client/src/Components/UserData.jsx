import React , { Component } from 'react';
import './userdata.css';

class UserData extends Component {
  constructor(){
    super();
    this.state = { userData: {
      name: "",
      description: "",
      imgUrl: "",
      smallImage: ""
    }};
  }

  componentWillMount(){
    fetch("savedImages").then((response)=>{
      return response.json();
    }).then((blob)=>{
      this.setState({
        userData: {
            name: blob.fullname ,
            description: blob.description ,
            imgUrl: blob.imageUrl ,
            smallImage: blob.smallImgUrl 
        }
      })
    });
  }

  changeImage(data){
    console.log(data);
    this.setState({
      userData: {
        name: this.state.userData.name,
        description: this.state.userData.description,
        imgUrl: data.bigUrl,
        smallImage: data.smallUrl
      }
    });
    alert("New images updated");
  }

  

  componentDidMount(){
    
  }
  render(){
    return (
        <div>
            <div className="form-group">
                <label htmlFor="email">Name:</label>
                <input type="text" value={this.state.userData.name} placeholder="Name" className="form-control" readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input type="text" value={this.state.userData.description} className="form-control" readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="smallImg">Small Image Url:</label>
                <input type="text" value={this.state.userData.smallImage} className="form-control" readOnly/>
            </div>
            <div className="form-group">
                <label htmlFor="bigImg">Big Image Url:</label>
                <input type="text" value={this.state.userData.imgUrl} className="form-control" readOnly/>
            </div>
        </div>
    );
  }
}

export default UserData;