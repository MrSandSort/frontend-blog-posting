import React, { useEffect, useState } from "react";
import { FaHeart, FaEdit, FaTrash, FaRegHeart } from "react-icons/fa";
import { LuLoader2 } from "react-icons/lu";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Blog_Modal() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBlogs = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        Swal.fire({
          icon: "warning",
          title: "Unauthorized",
          text: "Please log in to view blogs.",
        }).then(() => {
          navigate("/login");
        });
        return;
      }

      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/accounts/blogs/",
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setBlogs(response.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        const errorMessage = err.response
          ? err.response.data.detail
          : "Failed to fetch blogs";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate]);

  const handleEditComment = async (blogId, commentId, newContent) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please log in to edit comments.",
      });
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/accounts/comments/${commentId}/`,
        { content: newContent },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId
            ? {
                ...blog,
                comments: blog.comments.map((comment) =>
                  comment.id === commentId
                    ? { ...comment, content: newContent }
                    : comment
                ),
              }
            : blog
        )
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Comment updated successfully!",
      });
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.detail
        : "Failed to update the comment";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  const handleDeleteComment = async (blogId, commentId) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please log in to delete comments.",
      });
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/accounts/comments/${commentId}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === blogId
            ? {
                ...blog,
                comments: blog.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              }
            : blog
        )
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Comment deleted successfully!",
      });
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.detail
        : "Failed to delete the comment";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  const handleLike = async (postId) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Please log in to like or unlike posts.",
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/accounts/blogs/${postId}/like/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === postId
            ? {
                ...blog,
                liked_by_user: response.data.liked_by_user,
                likes_count: response.data.likes_count,
              }
            : blog
        )
      );
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data.detail
        : "Failed to like/unlike the post";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  return (
    <div>
      {loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontSize: "2rem",
            color: "#007BFF",
          }}
        >
          <LuLoader2
            style={{
              animation: "spin 1s linear infinite",
              display: "inline-block",
            }}
          />
          <p style={{ marginTop: "1rem", fontSize: "1.2rem", color: "#333" }}>
            Loading blogs...
          </p>
        </div>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="blog-modal"
            style={{
              padding: "1rem",
              border: "2px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              margin: "1rem auto ",
              maxWidth: "65rem",
              backgroundColor: "rgb(245, 247, 248)",
            }}
          >
            <div className="blog-title" style={{ marginBottom: "0.5rem" }}>
              <h3
                style={{
                  margin: 0,
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "#333",
                  fontFamily: "fantasy",
                }}
              >
                {blog.title}
              </h3>

              <p
                style={{
                  margin: "0.5rem 0 0",
                  fontSize: "0.9rem",
                  color: "#888",
                  textAlign: "center",
                }}
              >
                <strong>{blog.author}</strong> •{" "}
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div
              className="blog-content"
              style={{
                color: "#555",
                lineHeight: "1.6",
                marginBottom: "1rem",
                textAlign: "justify",
              }}
            >
              <p style={{ fontFamily: "cursive" }}>{blog.content}</p>
            </div>

            <div
              className="blog-actions"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #eee",
                paddingTop: "0.5rem",
                color: "#777",
                fontSize: "0.9rem",
              }}
            >
              <div
                className="likes"
                style={{ display: "flex", alignItems: "center" }}
              >
                {blog.liked_by_user ? (
                  <FaHeart
                    style={{
                      marginRight: "0.3rem",
                      color: "#FF0A0AFF",
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                    }}
                    onClick={() => handleLike(blog.id)}
                  />
                ) : (
                  <FaRegHeart
                    style={{
                      marginRight: "0.3rem",
                      color: "#888",
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                    }}
                    onClick={() => handleLike(blog.id)}
                  />
                )}
                <span>{blog.likes_count || 0} Likes</span>
              </div>
            </div>

            <div
              className="comments"
              style={{
                marginTop: "1rem",
                borderTop: "1px solid #eee",
                paddingTop: "0.5rem",
              }}
            >
              <h4
                style={{
                  fontSize: "1rem",
                  color: "#333",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Comment: {blog.comments.length}
              </h4>

              {blog.comments && blog.comments.length > 0 ? (
                <div
                  style={{
                    maxHeight: "150px",
                    overflowY: "auto",
                    marginBottom: "0.5rem",
                  }}
                >
                  {blog.comments.map((comment) => (
                    <div
                      key={comment.id}
                      style={{
                        marginBottom: "0.5rem",
                        padding: "0.5rem",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "5px",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          color: "#444",
                        }}
                      >
                        {comment.author}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <p
                          style={{
                            margin: "0.2rem 0 0",
                            color: "#555",
                            fontSize: "0.9rem",
                            flex: 1,
                          }}
                        >
                          {comment.content}
                        </p>

                        <div style={{ display: "flex", gap: "10px" }}>
                          <FaEdit
                            style={{ cursor: "pointer", color: "#4CAF50" }}
                            onClick={() =>
                              handleEditComment(
                                blog.id,
                                comment.id,
                                prompt("Edit Comment:", comment.content)
                              )
                            }
                          />
                          <FaTrash
                            style={{ cursor: "pointer", color: "#CC0F0F" }}
                            onClick={() =>
                              handleDeleteComment(blog.id, comment.id)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "#888", fontSize: "0.9rem" }}>
                  No comments yet.
                </p>
              )}

              <div style={{ marginTop: "0.5rem" }}>
                <textarea
                  placeholder="Write a comment..."
                  rows="2"
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                    resize: "none",
                  }}
                  value={blog.newComment || ""}
                  onChange={(e) =>
                    setBlogs((prevBlogs) =>
                      prevBlogs.map((b) =>
                        b.id === blog.id
                          ? { ...b, newComment: e.target.value }
                          : b
                      )
                    )
                  }
                ></textarea>
                <button
                  onClick={async () => {
                    const authToken = localStorage.getItem("authToken");

                    if (!authToken) {
                      Swal.fire({
                        icon: "warning",
                        title: "Unauthorized",
                        text: "Please log in to post comments.",
                      });
                      return;
                    }

                    try {
                      const response = await axios.post(
                        `http://127.0.0.1:8000/accounts/blogs/${blog.id}/comments/`,
                        { content: blog.newComment },
                        {
                          headers: {
                            Authorization: `Bearer ${authToken}`,
                          },
                        }
                      );

                      setBlogs((prevBlogs) =>
                        prevBlogs.map((b) =>
                          b.id === blog.id
                            ? {
                                ...b,
                                comments: [...b.comments, response.data],
                                newComment: "",
                              }
                            : b
                        )
                      );
                      Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Comment added successfully!",
                      });
                    } catch (err) {
                      const errorMessage = err.response
                        ? err.response.data.detail
                        : "Failed to post the comment";
                      Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: errorMessage,
                      });
                    }
                  }}
                  style={{
                    marginTop: "0.5rem",
                    padding: "0.5rem 1rem",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No blogs found.</p>
      )}
    </div>
  );
}
