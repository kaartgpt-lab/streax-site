export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 mt-8">
      <div className="container flex items-center justify-between text-sm text-zinc-400">
        <span>© {new Date().getFullYear()} Tanzanite – Next App</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}
