const newFormHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
  
    alert("Will create a new post")
  
    const content = document.querySelector('#comment-text').value.trim();
  
    if (title  && content) {
      const response = await fetch(`/api/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content }),
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
    .querySelector('.comment-form')
    .addEventListener('submit', newFormHandler);
  
    // TODO: Delete buttons need to be attached to delete function