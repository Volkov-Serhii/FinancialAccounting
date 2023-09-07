import React from 'react';
import classes from "./MyHeader.module.css";

const MyHeader = () => {
    return (
        

        <header className={classes.myHeader}>
  <div class="header">
    <a href="#" class="logo"></a>
    <div class="header-right">


      <div class="search-container">
        <form action="/action_page.php">
        </form>
      </div>


      <a class="active" href="#home">Home</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>


      <button class="book-button">BOOK</button>
    </div>
   
  </div>
</header>
    );
};

export default MyHeader;