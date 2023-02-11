import PropTypes from 'prop-types';
import css from './Notification.module.css';

export const Notification = ({ text }) => {
  return <p className={css.text}>{text}</p>;
};

Notification.propTypes = {
  text: PropTypes.string.isRequired,
};
