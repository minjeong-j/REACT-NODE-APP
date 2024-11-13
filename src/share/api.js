// src/share/api.js
export const editPost = async (id, updatedData) => {  
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Failed to update post');
    }
  } catch (error) {
    console.error('Error updating post:', error);
    return { success: false, error };
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, error };
  }
};
