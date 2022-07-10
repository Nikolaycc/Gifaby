import React, {
    useEffect,
    useState
} from 'react'
import { render } from '@testing-library/react'
import './gifaby.css'
import { user } from './redux/reducers/user'
import { Helmet } from 'react-helmet'
import newuser from './newuser'
import { Modal, Button } from 'react-bootstrap'
import Feed from './Feed'
import Avatar from '@material-ui/core/Avatar'
import firebase from 'firebase'
import nickname from './Register'
import Profile from './Profile'



function Home() {
    
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser)
                setUser(authUser)
            } else {
                setUser(null)
            }
        })

        return () => {
            unsubscribe();
        }
    }, [user, nickname])

    useEffect(() => {
        firebase.firestore().collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })))
        })
    }, [])

    return (
        <>
            <div className='allbg' >
            <Helmet>
              <title>Gifaby | Home</title>
            </Helmet>
            <nav>
                <div className='navbarh' >
                    
                </div>
                <Button onClick={() => firebase.auth().signOut()} className='btnoutssd' variant='outline-danger' >LogOut</Button>
                <div className='logoh'></div>
            </nav>
                <div className='Profile' >
                    
                </div>
                
                <div className='Feed' >
                    {
                        posts.map(({id, post}) => (
                            <Feed key={id} photoUrl={post.photoUrl} username={post.username} description={post.description} imageUrl={post.imageUrl} />
                        ))
                    }
                </div>
                
            </div>
        </>

       
    )
}

export default Home
