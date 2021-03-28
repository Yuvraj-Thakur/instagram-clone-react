import React, { useState,useEffect } from 'react';
import Logo from './download.png';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button,Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts,setPosts] = useState ([]);
  const [open,setOpen] = useState(false);
  const [openSignin,setOpenSignin] = useState('');
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const[user,setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        setUser(authUser);
    }
      else{
        setUser(null);
      }
    })
    
    return () => {
      unsubscribe();
    }
  },[user,username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({ 
        id: doc.id, 
        post : doc.data()})))
    })

  },[]);

const signUp = (event)=>{
  event.preventDefault();
  auth.createUserWithEmailAndPassword(email,password)
  .then((authUser) => {
   return authUser.user.updateProfile({
      displayName : username, 
    })
  })
  .catch((error) => alert(error.message))
  setOpen(false);
}

const signin = (event) => {
  event.preventDefault();
  auth.signInWithEmailAndPassword(email,password)
  .catch((error) => alert(error.message));
  setOpenSignin(false);
}

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
    <form>
      <center className="app__signup">
      <img 
      className = "modal__img"
      src= "https://i.pinimg.com/564x/ac/76/72/ac76724616bde8c8749f73c1d07ee255.jpg" 
      alt=""/>
      
      <Input 
      type = "text"
      placeholder = "username"
      value = {username}
      onChange={(e) => setUsername(e.target.value)} 
      />

      <Input 
      type = "text"
      placeholder = "email"
      value = {email}
      onChange={(e) => setEmail(e.target.value)} 
      />

      <Input 
      type = "password"
      placeholder = "password"
      value = {password}
      onChange={(e) => setPassword(e.target.value)} />
      
      <Button type="submit" onClick={signUp}>Sign UP</Button>
      </center>
      </form>
      </div>
      </Modal>


      <Modal
        open={openSignin}
        onClose={() => setOpenSignin(false)}
      >
      <div style={modalStyle} className={classes.paper}>
    <form>
      <center className="app__signup">
      <img 
      className = "modal__img"
      src= "https://i.pinimg.com/564x/ac/76/72/ac76724616bde8c8749f73c1d07ee255.jpg" 
      alt=""/>
      
      <Input 
      type = "text"
      placeholder = "email"
      value = {email}
      onChange={(e) => setEmail(e.target.value)} 
      />

      <Input 
      type = "password"
      placeholder = "password"
      value = {password}
      onChange={(e) => setPassword(e.target.value)} />
      
      <Button type="submit" onClick={signin}>Sign UP</Button>
      </center>
      </form>
      </div>
      </Modal>

      <div className="app_header">
        <img 
        className='header_img'
        src={Logo}
        alt='logo'
        />

        {user ?(
        <Button onClick={(() => auth.signOut())}>Logout</Button>  
        )
        :
        (
        <div className="app__loginContainer">
          <Button onClick={(() => setOpenSignin(true))}>Sign in</Button>
          <Button onClick={(() => setOpen(true))}>Sign Up</Button>
        
        </div>
        
        )}
            

        
      </div>    
    
    <div className="app__posts">

    {
      posts.map(({id,post}) => (
        <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))
    }
    
    </div>

    <InstagramEmbed
      url='https://www.instagram.com/p/CE9lXYaFcpo/?igshid=mbjertix26hl'
      maxWidth={320}
      hideCaption={false}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}
    />
    
    {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ) :
      (<h3>Sorry you need to Login to Uplaod</h3>)
    }

    </div>
  );
}

export default App;
//2:09:34