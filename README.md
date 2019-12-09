# Report

* ### Sites
  The frontend's Github repository is at [forum-frontend](https://github.com/Hwlhwlxyz/forum-frontend).
  The site was built at [Forum](http://149.28.226.57/forum/).

* ### Introduction

  Our team has 3 members, Wenlun Hu (Pitt id: ), Hanlin Ye (Pitt id: ) and  Jun Jiang (Pitt id: juj19). Our project is to develop a Forum. The forum works like a discussion board. Users who login the forum can post text and picture on the forum and they can also leave comments to other users' articles. We also create the role of administrators who have the power to delete users' articles. 

  

* ### Objective

  Our goal can be separated into following parts:

  > * Design the layout and style of the website.
  >
  > * Develop the homepage where can list out all the articles and has the function of pagination.
  >
  > * Develop the sign up and login function.
  >
  > * Implement user posting function and search function.
  >
  > * Implement user comment function.
  >
  > * Implement user profile management function.
  >
  > * Add administrator function.

  Problem solving: when we deployed the project, we used nohup at first. However, nohup was easy to crash at the backend. Then we used pm2 to solve this problem. PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks. Compared to nohup,  PM2 is more stable and not easy to go wronge. In this processing, we compared the performance of using nohup and PM2 and we also learned the capability and functionality of PM2.

  Extra features: Beyond the features listed in the assignment requirements, we also implement the searching function, user profile management function, editing function, like function and comment system, error tolerance mechanism, administrator delete function, administrator statistics function.

  

* ### Team member’s contributions

  Wenlun Hu: Using Angular framework to develop the frontend webpages.

  Hanlin Ye: Using Express and MongoDB to develop the backend functions. 

  Jun Jiang: Adjusting the outlook by modifying the Css files. Writing documentations.

  

* ### Technical Architecture

  * Models

    Using Mongoose to define four models: admin, user, post and comment. The model comment will be refered by the model post. Using mongoose-unique-validator: for preventing duplicate usernames.

  * Views

    Using Angular to create 3 services and 7 components. The three services are account, topic and info. Account supports 3 components: user info, login and sign up. Topic supports 2 components: comments and topic. Info supports 2 components: daily activeness and admin search which are the components for administrator. The libraries used include angular material and ng2-charts. The tags used include mat-form-field, mat-toolbar, mat-card, mat-tab, mat-chip-list, mat-table, mat-paginator.

  * Controllers

    Implementing RESTful APIs. Using bcrypt for salt hash the password. Using body-parser for getting the json from client side. Using express as the framework of node.js. Using jsonwebtoken for storing the information of accounts and authentication. Using path for keeping the absolute path in node.js. 

    

* ### Challenges

    In order to get daily activeness of recent seven days, it is necessary to request seven times. The easiest way is to use seven fallback functions, while the code will be long and the request will be blocked. Finally, my solution is to generate an array of dates, and then request for seven days' data in the same time use angular's  observale, which is similar to promise. Thanks to the angular's two-way data binding, the template can display the data immediately when it is updated.  



* ### Future Work
  The functionality of adding likes on posts and comments is different from the traditional forum because the user can add likes to any post and comment unlimited times. In the future, the functionality of adding likes should be changed to that each user can only add one like to a post or a comment. After the user adds one like, the button of adding likes will disappear. 
  The another future work could be the functionality of montly activeness in the information page of admins. In the future, the admin could choose to see the monthly activeness for one year in a bar chart.




* ### Conclusion

  From our perspective, we have learned what we wanted. We think that Angular, Express and MongoDB would be useful in the future iterations because they are useful and powerful when we need a rapid development. And there are many opensource libraries can be used. 

  

* ### Documentation

  angular material https://material.angular.io/

  ng2-charts https://valor-software.com/ng2-charts/

  mongoose https://mongoosejs.com/docs/guide.html
  

  

