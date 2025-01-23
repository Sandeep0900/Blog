import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// UI Elements
const signupSection = document.getElementById("signup-section");
const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const switchToLogin = document.getElementById("switch-to-login");
const switchToSignup = document.getElementById("switch-to-signup");

const signupBtn = document.getElementById("signup-btn");
const loginBtn = document.getElementById("login-btn");
const postBtn = document.getElementById("post-btn");
const logoutBtn = document.getElementById("logout-btn");

let currentUser = null;

// UI Toggle Functions
function showLoginSection() {
  signupSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
}

function showSignupSection() {
  loginSection.classList.add("hidden");
  signupSection.classList.remove("hidden");
}

// Event Listeners for Section Switching
switchToLogin?.addEventListener("click", showLoginSection);
switchToSignup?.addEventListener("click", showSignupSection);

// Convert file to Base64
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Sign Up
signupBtn.addEventListener("click", async () => {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign Up Successful");
  } catch (error) {
    alert(error.message);
  }
});

// Login
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert("Login Successful");
    currentUser = userCredential.user;
    loadBlogs();
  } catch (error) {
    alert(error.message);
  }
});

// Post a blog with an image
postBtn.addEventListener("click", async () => {
  const blogText = document.getElementById("blog-text").value;
  const imageFile = document.getElementById("image-upload").files[0];

  if (!blogText) {
    alert("Please write something!");
    return;
  }

  if (!currentUser) {
    alert("No user is logged in!");
    return;
  }

  try {
    let base64Image = null;

    // If an image is uploaded, convert it to Base64
    if (imageFile) {
      base64Image = await getBase64(imageFile);
    }

    // Save blog text and Base64-encoded image to Firestore
    await addDoc(collection(db, "blogs"), {
      userId: currentUser.uid,
      text: blogText,
      image: base64Image,
      timestamp: Date.now(),
    });

    alert("Blog posted successfully!");
    document.getElementById("blog-text").value = "";
    document.getElementById("image-upload").value = "";
    loadBlogs();
  } catch (error) {
    alert("Error posting blog: " + error.message);
  }
});

// Delete a blog post
async function deleteBlog(blogId) {
  try {
    await deleteDoc(doc(db, "blogs", blogId));
    alert("Blog deleted successfully!");
    loadBlogs();
  } catch (error) {
    alert("Error deleting blog: " + error.message);
  }
}

// Load blogs for the current user
async function loadBlogs() {
  if (!currentUser) return;

  const blogsContainer = document.getElementById("blog-posts");
  blogsContainer.innerHTML = "";

  try {
    const q = query(
      collection(db, "blogs"),
      where("userId", "==", currentUser.uid)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      blogsContainer.innerHTML = "<p class='text-gray-600'>No blogs found. Start creating!</p>";
      return;
    }

    querySnapshot.forEach((docData) => {
      const blog = docData.data();
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog-post");
      
      blogElement.innerHTML = `
        ${blog.image ? `<img src="${blog.image}" alt="Blog Image">` : ""}
        <p class="text-lg">${blog.text}</p>
        <small class="text-gray-500">${new Date(blog.timestamp).toLocaleString()}</small>
        <button class="delete-post-btn" data-id="${docData.id}">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      `;

      // Add delete event listener
      const deleteBtn = blogElement.querySelector('.delete-post-btn');
      deleteBtn.addEventListener('click', () => deleteBlog(deleteBtn.dataset.id));

      blogsContainer.appendChild(blogElement);
    });
  } catch (error) {
    alert("Error loading blogs: " + error.message);
  }
}

// Logout
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("You have been logged out!");
  } catch (error) {
    alert("Error logging out: " + error.message);
  }
});

// Monitor Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    document.getElementById("auth-container").classList.add("hidden");
    dashboardSection.classList.remove("hidden");
    loadBlogs();
  } else {
    currentUser = null;
    document.getElementById("auth-container").classList.remove("hidden");
    dashboardSection.classList.add("hidden");
  }
});