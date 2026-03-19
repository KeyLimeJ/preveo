import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey:            "AIzaSyCC1fYbQSlcXnN7xapG4XRXtmdcSkRj-VA",
  authDomain:        "preveo-e6934.firebaseapp.com",
  projectId:         "preveo-e6934",
  storageBucket:     "preveo-e6934.firebasestorage.app",
  messagingSenderId: "326652069193",
  appId:             "1:326652069193:web:bdac0d9198df36284b8698",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

onAuthStateChanged(auth, user => {
  if (!user) { window.location.href = '/login'; return; }
  const name = user.displayName || user.email.split('@')[0];
  const email = user.email || '';
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const initialsEl = document.querySelector('.pb-initials');
  if (initialsEl) initialsEl.textContent = initials;
  const nameEl = document.querySelector('.sidebar-nav-name');
  if (nameEl) nameEl.textContent = name;
  const dropdownName = document.querySelector('.avatar-dropdown-name');
  if (dropdownName) dropdownName.textContent = name;
  const dropdownEmail = document.querySelector('.avatar-dropdown-email');
  if (dropdownEmail) dropdownEmail.textContent = email;
});

document.querySelector('.avatar-dropdown-item.logout')?.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = '/login';
});
