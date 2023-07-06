import React from 'react';
import classes from "./MyFooter.module.css";

const MyFooter = () => {
    return (
        <footer className={classes.myFooter}><a href={"https://www.linkedin.com/in/сергей-волков-89531b207/"}>Serhii Volkov</a> & <a href={"https://www.linkedin.com/in/алексей-волков-6448761b5/"}>Oleksii Volkov</a></footer>
    );
};

export default MyFooter;