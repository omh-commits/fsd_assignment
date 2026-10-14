export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>
          <strong>Leafy Village</strong> - plants, tools and everything a gardener needs.
        </p>
        <p className="small">
          leafvillageinfo@gmail.com &middot; +91 9427802388 &middot; &copy; {new Date().getFullYear()} Leafy Village
        </p>
      </div>
    </footer>
  );
}
