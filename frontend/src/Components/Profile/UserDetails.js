import React, {useState, useEffect} from 'react';
import './UserDetails.css'
import UserDetailsEdit from './UserDetailsEdit';
import { Link } from 'react-router-dom';

const UserDetails = (props) => {
    const [userDetails, setUserDetails] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isPasswordChanging, setIsPasswordChanging] = useState(false);

    const token = localStorage.getItem('token');

    const editEnableHandler = () =>{
        setIsEditing(true);
    }

    const editDisableHandler = () =>{
        setIsEditing(false);
    }

    const passwordChangeEnableHandler = () =>{
        setIsPasswordChanging(true);
    }

    const passwordChangeDisableHandler = () =>{
        setIsPasswordChanging(false);
    }

    const oldPasswordChangeHandler = (event) =>{
        setOldPassword(event.target.value);
    }

    const passwordChangeHandler = (event) =>{
        setPassword(event.target.value);
    }

    const passwordConfirmChangeHandler = (event) =>{
        setPasswordConfirm(event.target.value);
    }

    const passwordSubmitHandler = async(event) =>{
        event.preventDefault();
        if(password !== passwordConfirm){
            alert('Passwords do not match');
            return;
        }
        const passwordData = {
            oldPassword: oldPassword,
            newPassword: password,
        }
        try{
            const response = await fetch(`${process.env.REACT_APP_API}/users/editpassword`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(passwordData),
            });
            if(response.ok){
                alert('Password changed successfully');
                setPassword('');
                setPasswordConfirm('');
                setIsPasswordChanging(false);
                console.log('Password changed successfully');
            }else{
                console.error('Error:', response.status);
            }
        }
        catch(error){
            console.error('Error:', error);
        }
    }

    const saveUserDataHandler = (enteredUserData) =>{
        const userData = {
            ...enteredUserData,
        }

        setIsEditing(false);
    }

    const fetchUserDetails = async() => {
        try{
            const result = await fetch(`${process.env.REACT_APP_API}/users/`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(result.ok){
                const data = await result.json();
                setUserDetails(data);
                console.log(data);
            }else{
                console.error('Error:', result.status);
            }
        }
        catch(error){
            console.error('Error:', error);
        }
    }
    useEffect(() => {
        fetchUserDetails();
      }, []);

      const logoutHandler = () =>{
        localStorage.removeItem('token');
      };

  return (
    <div className='user__Details'>
      <div>
        {userDetails.profilePicture && <img src = {userDetails.profilePicture} alt = 'profile_pic' className='user_profile_pic'/>}
        {!userDetails.profilePicture && <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt = 'profile_pic' className='user_profile_pic'/>}
      </div>
      <div className='user__Name'>
        {userDetails.name}
      </div>
      <div className='user__Bio'>
        {userDetails.bio}
      </div>
      <Link to='/'>
        <div className='logout__wrapper'>
            <button className='logout__button' onClick={logoutHandler}>Logout</button>
        </div>
        </Link>
      <div className='user_details'>
        <h3>User Details</h3>
        {!isEditing && <button className='edit__button' onClick={editEnableHandler}>Edit Profile</button>}
        {isEditing && <UserDetailsEdit onSaveUserData = {saveUserDataHandler}  onCancel ={editDisableHandler}/>}
        <div className='details_wrapper'>
            Email<div className='user__Email'>{userDetails.email}</div>
        </div>  
        <div className='details_wrapper'>
            DOB<div className='user__Dob'>
                {new Date(userDetails.dob).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
                })}
            </div>
        </div>
        {userDetails.gender && <div className='details_wrapper'>
            Gender<div className='user__Gender'>{userDetails.gender}</div>
        </div>}
        {userDetails.sexualPreference && <div className='details_wrapper'>
            Sexual Orientation<div className='user__SexualOrientation'>{userDetails.sexualPreference ? userDetails.sexualPreference : "nil"}</div>
        </div>}
        <div className='details__wrapper'>
        
            <button className='change__button' onClick={passwordChangeEnableHandler}>Change Password</button>
            {isPasswordChanging && <form className='form_control'>
                <div className='newFormControls'>
                <input type='password' className='newFormControl' placeholder='Enter old password' onChange={oldPasswordChangeHandler} style={{ textAlign: "center" }}/>
                <input type='password' className='newFormControl' placeholder='Enter new password' onChange={passwordChangeHandler} style={{ textAlign: "center" }}/>
                <input type='password' className='newFormControl' placeholder='Confirm new password' onChange={passwordConfirmChangeHandler} style={{ textAlign: "center" }}/>
                <div>
                    <button className='save__button' onClick={passwordSubmitHandler}>Save</button> <button className='cancelchange__button' onClick={passwordChangeDisableHandler}>Cancel</button>
                </div>
                </div>
            </form>}
        </div>
        
      </div>
      
    </div>
  )
}

export default UserDetails
