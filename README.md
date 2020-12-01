# WatchTime
### An easy way to find discovering movies and getting recommendations.

![](logo.png) 

# Abstract
Movie Databases have been available since as early as the 1990s, but there has been a lack of an effective filtering mechanism of movies for the average user even today. If we consider the example of Netflix and IMDb, the filtering interface is very complex and it takes a significant amount of effort to filter a particular type of movie as needed by the user.
Also, there has been an increasing demand of Recommendation Systems for movies these days in today’s market as people tend to spend a lot of money when they go to the movies or rent a movie, so they need to make an informed decision about it. Over the past decade, a large number of recommendation systems for a variety of domains have been developed and are in use. These recommendation systems use a variety of methods such as content based approach, collaborative filtering approach, popularity based recommendation engines,  hybrid approach, etc but the existing solutions are found to be particularly ineffective for the end users.
Our system is a full-stack web application which uses a live movie source, TMDb, which maintains  all real-world movies in their database, with their genres, date released, IMdb scores, etc . The users will have the ability to register themselves in our system so that we can track their browsing activity in our website. The website uses an effective movie filter in the discover section which will solve the problem of filtering movies and a hybrid approach to recommendations would be based on user history, movie similarity and  which will hence provide an effective solution to the aforementioned problems.

# Technologies Used
* TMDb APIs
* MongoDB
* Express
* Angular
* Bootstrap & Font Awesome
* Clustering

# Launch Instructions

## Project Prerequisites
Dependencies listed in *package.json*

### Install App Dependencies
```
npm install // After installing node and angular
```

## Start MongoDB Server
```
mongod.exe
```
## Node.js Server Side App 
```
node index.js
```

## Developer Build Compiation & Launch
```
ng serve
```

## Developed by:
* Aditya Verma
* Vishruth L
* Vishnu Charan



