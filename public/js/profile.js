const newFormHandler = async (event) => {
  event.preventDefault();
  event.stopPropagation();

  alert("Will create a new post")

  const title = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-desc').value.trim();

  if (title  && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
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
    console.log(id)

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

  document
    .querySelectorAll('.btn-delete')
    .forEach(el=>{
      el.addEventListener('click', delButtonHandler);
    })