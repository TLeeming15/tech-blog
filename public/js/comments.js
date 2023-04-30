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
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('#comment-form')
    .addEventListener('submit', newFormHandler);
  
    // TODO: Delete buttons need to be attached to delete function