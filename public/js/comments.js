const newFormHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
  
    alert("Will create a new comment")
  
    const content = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#comment-form').getAttribute('data-id');
    if (content) {
      const response = await fetch(`/api/posts/${post_id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const comment_id = event.target.getAttribute('data-id');
      
  
      const post_id = document.querySelector('#comment-form').getAttribute('data-id');


      const response = await fetch(`/api/posts/${post_id}/comments`, {
        method: 'DELETE',
        body: JSON.stringify({comment_id }),
        headers: {
          'Content-Type': 'application/json',
        },

      });
  
      if (response.ok) {
        //document.location.replace('/profile');
        //refresh
        document.location.reload();
      } else {
        alert('Failed to delete comment');
      }
    }
  };
  
  document
    .querySelector('#comment-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelectorAll('.btn-delete')
    .forEach(el=>{
      el.addEventListener('click', delButtonHandler);
    })
    
