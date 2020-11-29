# Haxèr
### A hybrid and intuitive approach for discovering movies and getting recommendations! 

![](haxer.png) 

[Visit Website](https://haxer.herokuapp.com)

# Abstract
Movie Databases have been available since as early as the 1990s, but there has been a lack of an effective filtering mechanism of movies for the average user even today. If we consider the example of Netflix and IMDb, the filtering interface is very complex and it takes a significant amount of effort to filter a particular type of movie as needed by the user.

Also, there has been an increasing demand of Recommendation Systems for movies these days in today’s market as people tend to spend a lot of money when they go to the movies or rent a movie, so they need to make an informed decision about it. Over the past decade, a large number of recommendation systems for a variety of domains have been developed and are in use. These recommendation systems use a variety of methods such as content based approach, collaborative approach, knowledge based approach, utility based approach, hybrid approach, etc but the existing solutions are found to be particularly ineffective for the end users.

Our system is a full-stack web application which uses a live movie source, TMDb, which maintaines all real-world movies in their database. The users will have the ability to register themselves in our system so that we can track their browsing activity in our website. The website uses an effective movie filter in the discover section which will solve the problem of filtering movies and a hybrid approach to recommendations would be based on user history, movie similarity and user similarity clusters which will hence provide an effective solution to the aforementioned problems.

# Technologies Used
* TMDb APIs
* Heroku Cloud
* mLab MongoDB (MongoDB Cloud)
* Angular v6
* MEAN Stack
* Bootstrap & Font Awesome
* Supervized Machine Learning
* Clustering

# Launch Instructions

## Project Prerequisites
Dependencies listed in *package.json*

### Install App Dependencies
```bash
npm install // After installing node and angular
```

## Angular App
```bash
/app/*
```
## Node.js Server Side App 
```bash
index.js
```

## Developer Build Compiation & Launch
```bash
ng serve --aot
```

## Production Build Compilation
```bash
ng build --prod --build-optimizer
```

## Compiled Views Directory
```bash
/dist/*
```
## Production Build Execution 
```bash
node index.js
```



