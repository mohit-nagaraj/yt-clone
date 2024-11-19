## Youtube clone Frontend

This is the frontend repository, built with React + Redux.
## Core packages

1. Redux - State Management
2. React Router - Routing
3. Styling - Styled Components
4. Toast Notifications - React Toastify
5. Network calls - Axios
6. Video player - Videojs

## Video uploads
I am using cloudinary for hosting videos and the thumbnails are generated automatically once we upload the video to cloudinary

## Features

1. Login/Signup
2. Upload video
3. Search video by channel name
4. Search video by title, description
5. Like/Dislike video
6. Subscribe/Unsubscribe from channels
7. Add comment
8. Edit profile (avatar, cover)
9. Liked videos
10. History

## Running locally

At the root of your project create an .env file with the following contents:

```bash
# BE stands for Backend Endpoint
REACT_APP_BE=<YOUR_BACKEND_ENDPOINT> # eg: http://localhost:5000/api/v1
REACT_APP_CLOUDINARY_ENDPOINT=<YOUR_CLOUD_NAME_LINK>
```

Then run <code>npm i</code> and <code>npm start</code> to see the youtube clone in action


## UI

### Home

![Home](screenshots/home.png)

### Trending

![Trending](screenshots/trending.png)

### Watch

![Watch](screenshots/video.png)

### Suggestions

![Suggestions](screenshots/suggestions.png)

### Channel

![Trending](screenshots/profile.png)

### Edit Profile

![Edit Profile](screenshots/edit_profile.png)

![Trending](screenshots/profile_channels.png)

### Library

![Library](screenshots/library.png)

### Search

![Search](screenshots/search_results.png)
