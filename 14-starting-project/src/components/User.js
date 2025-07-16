import classes from './User.module.css';

const User = (props) => {
  console.log('User component rendered');
  return <li className={classes.user}>{props.name}</li>;
};

export default User;
