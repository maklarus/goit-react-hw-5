import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <p>Oops, something goes wrong</p>
      <p>
        Please visit out <Link to="/">HomePage</Link>
      </p>
    </>
  );
}
