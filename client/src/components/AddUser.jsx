import {useNavigate} from 'react-router-dom';


export default function Home(){
    const navigate=useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert("Logged out successfully");
        // Redirect to login page or refresh
        navigate("/login"); // or use navigate in a React router setup
    };

    

    return(
        <>
        <button onClick={handleLogout}>logout</button>
        </>
    )
}