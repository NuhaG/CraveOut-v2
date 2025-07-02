const Footer = () => {
  return (
    <footer className="bg-card text-theme py-6 mt-12 border-t border-[var(--accent)]">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        <p className="text-card">
          © {new Date().getFullYear()} <span className="font-semibold text-[var(--accent-hover)]">CraveOut</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
