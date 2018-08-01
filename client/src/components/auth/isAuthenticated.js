export default function isAuthenticated() {
  // Check whether the current time is past the
  // access token's expiry time
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  console.log('expiresAt', expiresAt, new Date().getTime() < expiresAt)
  return new Date().getTime() < expiresAt;
}
