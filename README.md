# Chat Web App
A simple real time chatting application builting using:
- React
- TailwindCSS
- NodeJS
- ExpressJS
- MongoDB
- Socket.IO

# Demo
https://www.youtube.com/watch?v=U6BazkgOAag

## Environment Variables

```env
PORT="PORT HERE I SUGGEST 5000"
MONGO_DB_URI="URI here"
JWT_SECRET="Secret here"
```

## Run Instructions
1. Clone the repository
```
git clone https://github.com/TimmyTram/Chat-Web-App.git
```

2. cd into correct directory for backend install
```
cd .\Chat-Web-App
```

3. Install Dependencies for backend
```
npm install
```

4. cd into frontend directory
```
cd .\frontend
```

5. Install Dependencies for frontend
```
npm install
```

6. Setup .env file (change directory back to Chat-Web-App)
```
cd ..
```

7. Run backend Server
```
npm run server
```

8. Open another Console and cd into Frontend directory
```
npm run dev
```

9. Backend should run on PORT 5000 and Frontend on 3000