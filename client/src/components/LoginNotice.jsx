import { Link } from 'react-router-dom';

// Shown on pages that need a logged in user.
// "next" is where the account page sends the user back after logging in.
export default function LoginNotice({ text, next }) {
  return (
    <div className="box notice">
      <p>{text}</p>
      <Link className="button" to={`/account?next=${encodeURIComponent(next)}`}>
        Log in or register
      </Link>
    </div>
  );
}
