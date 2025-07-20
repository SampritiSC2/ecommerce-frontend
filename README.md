Login Flow:

1. We enter email and password and click on login button.
2. If the credentials are not correct, server will send 400 bad request with Invalid Credentials error message.
3. If the credentials are correct, server will send success response with logged in user details such as username, email, role and id and the accessToken in response body.
4. Server will also send refreshToken in http only cookie in the response.
5. In the frontend we will store the accessToken from response body in localstorage.
6. For this we have implemented an async thunk which we will dispatch in login handler function when we click on Login button.
7. This thunk function will inturn dispatch pending, fulfilled and rejected actions when login api call is pending, successful and failed respectively and based on that we will update the user, loading and error states in authSlice extrareducers.
8. Also we have implemented a request interceptor on axios instance which will automatically attach the accessToken (if available in localstorage) to outgoing requests to protected endpoints apart from /login and /register. The token will be added as a header called Aurhorization and value will be Bearer followed by space and the accesaToken.
9. In order to retain the authentication status, we have integrated a /auth/profile endpoint.
10. In the App.tsx file, inside an useEffect we will dispatch a getUserProfile thunk which is responsible to fetch the current logged in user's profile.
11. Since we have dispatched this thunk in useEffect in App component, whenever we refresh the page or application starts, the profile request will be sent to the server.
12. We have also implemented a response interceptor on the axios instance. This interceptor will intercept all api responses which return 401 unauthorized apart from 401 responses from /auth/refresh endpoint.
13. Whever there is a 401 unauthorized response from the server (except for refresh endpoint), this interceptor will first refresh the accessToken by sending request to refresh endpoint, and then once we get the new accessToken, it will update the token in localstorage with the new accessToken and then try to send the failed request once again (only 1 try to send failed request after refreshing the accessToken).
14. However, if the refresh token endpoint fails, it will call store.dispatch and logout the user if any from redux store because the if the refresh token has expired, that means user needs to logout again.
