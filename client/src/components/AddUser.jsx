import {useNavigate} from 'react-router-dom';
import { useState,} from 'react';
import axios from 'axios'
import './style.css'

export default function CreateUser(){

        let [name, setName] = useState('');
        let [image, setImage] = useState(null)
        let [email, setEmail] = useState('');
        let [responseMessage, setResponseMessage] = useState('');

    const navigate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert("Logged out successfully");
        // Redirect to login page or refresh
        navigate("/login"); // or use navigate in a React router setup
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Save base64 string in image state
            };
            reader.readAsDataURL(file);
        }
    };

    const addUser=async(e)=>{
        e.preventDefault();
        

            const payload={name,email,image};

            try{
                const response=await axios.post('http://localhost:3001/users',payload,{
                    headers:{
                        "Content-Type":"application/json"
                    },
                });
                setResponseMessage(response.data);
                alert("user added");
            }
            catch(error){
                setResponseMessage(error.response?.data||'something went wrong');
                alert("failed to add user"+error);
            }
        };


    



    

    return(
        <>

<div className="login-container">
      <div className="login-card">
        <h2>Add User</h2>
        <form onSubmit={addUser}>
            <div className="form-group">
            <input type="text" placeholder="Name" value={name}
                        onChange={(e) => setName(e.target.value)} required  />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your Email"  value={email}
                        onChange={(e) => setEmail(e.target.value)} required  />
          </div>
          <div className="form-group">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
            </div>
          <button type="submit" className="register-button">Add User</button>
          

        </form>
        {responseMessage && (
                <div className="response-message">
                    {responseMessage}
                </div>
        )}
      </div>
    </div>
        <button onClick={handleLogout}>logout</button>
        </>
    )
}