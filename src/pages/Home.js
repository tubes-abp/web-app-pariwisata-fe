import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const posts = useSelector(state => state?.main?.posts)
    console.log(posts)
    return (
        <div>
            {
                posts && posts.map((data) => (
                    <p>{data.title}</p>
                ))                
            }
            <h1>MASUK</h1>
        </div>
    )
}

export default Home
