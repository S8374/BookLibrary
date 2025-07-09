// src/utils/guestUser.ts
export const getOrCreateGuestUser = () => {
  let guestUser = localStorage.getItem('guestUser');
  
  if (!guestUser) {
    guestUser = JSON.stringify({
      id: `guest_${Math.random().toString(36).substring(2, 15)}`,
      email: `guest_${Math.random().toString(36).substring(2, 9)}@example.com`
    });
    localStorage.setItem('guestUser', guestUser);
  }

  return JSON.parse(guestUser);
};