import React, { useState,useEffect } from 'react';
import './Articles.css';
import JobDate from '../Jobs/JobDate';

const Articles = (props) => {
const [showFullText, setShowFullText] = useState(false);
const [likes, setLikes] = useState(0);
const [liked, setLiked] = useState(false);
const [comments, setComments] = useState([]);
const [reported, setReported] = useState(false);
const [reportMessage, setReportMessage] = useState('');
const [loadComments, setLoadComments] = useState([]);
const [showComments, setShowComments] = useState(false);

const handleAddComment = (comment) => {
  setComments([...comments, comment]);
};

const handleShowComments = () => {
  setShowComments(true);
};

const handleHideComments = () => {
  setShowComments(false);
}

const handleLike = async() => {
  try {
    const response = await fetch(`http://localhost:5000/api/blogs/like/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ likes: liked ? likes - 1 : likes + 1,id:props.id }),
    });
    if (response.ok) {
      console.log('Likes updated'+response.json());
      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    } else {
      console.error('Error updating likes');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};



const maxWordsToShow = 40; // or whatever maximum number of words you want to show initially
const words = props.article ? props.article.split(' ') : [];
const truncatedText = words.slice(0, maxWordsToShow).join(' ');

const handleShowMoreClick = () => {
  setShowFullText(true);
  // document.body.style.overflow = 'hidden';
};

const handleCloseModal = () => {
  setShowFullText(false);
  document.body.style.overflow = 'initial';
};

const handleReport = (e) => {
  e.preventDefault();
  setReported(true);
};
const token = localStorage.getItem('token');

useEffect(() => {
  fetchComments();
}, [comments]);

const fetchComments = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/blogs/comment/${props.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      }
    });
    const data = await response.json();  
    console.log('Fetch comments'+data);
    setLoadComments(data); 
  } catch (error) {
    console.error(error);   
  }
}

useEffect(() => {
  fetchComments();
}, []);

const commentSubmitHandler = async(event)=> { 
  event.preventDefault(); 
  const comment = event.target.comment.value;
  const content = comment;
  try {
    const response = await fetch(`http://localhost:5000/api/blogs/addcomment/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify({ content, id:props.id }),
    });

    if (response.ok) {
      // Comment added successfully
      console.log('Added comment'+response.json());
      setComments([...comments, comment]);
    } else {
      // Handle error case
      console.error('Error adding comment');
    }
  } catch (error) {
    console.error('Error:', error);
  }
  
}

return (
  <div className='article'>
    <div className='a_description'>
      <div className='a_title'>{props.title}</div>
      <div className='author'>{props.author} </div>
      <div className='blog'>
          <p>{truncatedText}</p>
          {!showFullText && (
              <button className='showmorebutton' onClick={handleShowMoreClick}>
              Show more
              </button>
          )}
          <div className='a_date'>
                {new Date(props.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
          {showFullText && 
            (
              <div className='blog_details'>
                <div className='blog_details_content'>
              <div>
                  <span className='blog_detailsclose' onClick={handleCloseModal}>
                    ×
                  </span>
                  <img src={props.image} alt='hi' className='blog_details_img'></img>
                  <div className='blog_details_title'>{props.title}</div>
                  <p className='blog_details_blog'>{props.article}</p>
                  <div className='blog_detailsauthor'>{props.author} </div>
                  <div className='likes'>Likes: {likes}</div>
                  <button className='likebutton' onClick={handleLike}>
                    {liked ? 'Dislike' : 'Like'}
                  </button>
                  <div className='comments'>
                    {!showComments && (
                      <button className='viewcommentsbutton' onClick={handleShowComments}>
                        View Comments
                      </button>
                    )}
                    {showComments && ( <>
                      
                    <div className='comment_details'>
                      <div className='comment_detail'>
                      <button className='viewcommentsbutton' onClick={handleHideComments}>
                        Hide Comments
                      </button> 
                        {loadComments.map((commentGroup) => (
                          <div key={commentGroup._id}>
                            {commentGroup.comments.map((comment) => (
                              <div key={comment._id} className='comment_wrapper'>
                                <div className='commenter'> {comment.commenter}</div>
                                <div className='comment_time'>{new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</div>
                                <div className='comment_content'>Content: {comment.content}</div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div> 
                      </>
                    )}
                  </div>
                  {/* {comments.map((comment, index) => ( <div key={index}>{comment}</div> ))} */}
                  <form className='addComment' onSubmit={commentSubmitHandler}>
                    <input type='text' name='comment' placeholder='Add a comment' style={{ textAlign: 'center' }}></input>
                    <button type='submit'>Comment</button>
                  </form>
                  
                  <form className='reportBlog' onSubmit={handleReport}>
                    <div>
                      <input name='report-message' placeholder='Report Message' value={reportMessage} onChange={(e) => setReportMessage(e.target.value)} style={{ textAlign: 'center' }}></input>
                      <button type='submit'>Report</button>
                    </div>
                    
                  </form>
                  {reported && (
                    <div className='reported'>
                      This article has been reported with the following message: {reportMessage}
                    </div>
                  )}
                  </div>

                   </div>
                  
                 </div>
          )
          }
          
      </div>
 
      
    </div>
  </div>
);
};

export default Articles;