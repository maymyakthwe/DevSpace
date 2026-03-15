const Footer = () => {
  return (
    <footer className=" text-off-white-2 mt-20">
      <div className=" ">

        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 p-16 border-t border-slate-600/40">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-500 p-3 rounded-xl">
                {/* GitHub SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-5 h-5"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.6.11.82-.26.82-.58v-2.02c-3.26.71-3.95-1.57-3.95-1.57-.53-1.36-1.3-1.72-1.3-1.72-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.43.98.11-.76.41-1.28.75-1.57-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.21-3.15-.12-.3-.52-1.52.11-3.17 0 0 .99-.32 3.25 1.2a11.2 11.2 0 015.92 0c2.26-1.52 3.25-1.2 3.25-1.2.63 1.65.23 2.87.11 3.17.75.82 1.21 1.87 1.21 3.15 0 4.51-2.74 5.49-5.35 5.78.42.36.79 1.09.79 2.21v3.28c0 .32.22.7.83.58A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
                </svg>
              </div>

              <h2 className="text-white font-semibold text-lg">
                DevBoard
              </h2>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              The ultimate platform for developers to manage projects
              and track skills.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">Changelog</li>
              <li className="hover:text-white cursor-pointer">Roadmap</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Privacy</li>
              <li className="hover:text-white cursor-pointer">Terms</li>
              <li className="hover:text-white cursor-pointer">Security</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-600/40 mt-12 py-6 p-16 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-gray-400">
            © 2026 DevBoard. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">

            {/* Twitter */}
            <button className="border-slate-600/40 hover:bg-gray-700 p-3 rounded-lg transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M22 5.92c-.77.35-1.6.59-2.47.7a4.27 4.27 0 001.87-2.36 8.52 8.52 0 01-2.7 1.03 4.25 4.25 0 00-7.24 3.88A12.06 12.06 0 013 4.79a4.25 4.25 0 001.31 5.67 4.2 4.2 0 01-1.92-.53v.05a4.26 4.26 0 003.41 4.17c-.46.13-.95.2-1.46.2-.35 0-.7-.03-1.03-.1a4.27 4.27 0 003.97 2.96A8.53 8.53 0 012 19.54a12.03 12.03 0 006.52 1.91c7.83 0 12.11-6.49 12.11-12.11 0-.18 0-.35-.01-.52A8.64 8.64 0 0022 5.92z"/>
              </svg>
            </button>

            {/* GitHub */}
            <button className="border-slate-600/40 hover:bg-gray-700 p-3 rounded-lg transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.6.11.82-.26.82-.58v-2.02c-3.26.71-3.95-1.57-3.95-1.57-.53-1.36-1.3-1.72-1.3-1.72-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.43.98.11-.76.41-1.28.75-1.57-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.33 1.21-3.15-.12-.3-.52-1.52.11-3.17 0 0 .99-.32 3.25 1.2a11.2 11.2 0 015.92 0c2.26-1.52 3.25-1.2 3.25-1.2.63 1.65.23 2.87.11 3.17.75.82 1.21 1.87 1.21 3.15 0 4.51-2.74 5.49-5.35 5.78.42.36.79 1.09.79 2.21v3.28c0 .32.22.7.83.58A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
              </svg>
            </button>

            {/* LinkedIn */}
            <button className="border-slate-600/40 hover:bg-gray-700 p-3 rounded-lg transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6 1.11 6 0 4.88 0 3.5S1.11 1 2.49 1c1.38 0 2.49 1.12 2.49 2.5zM.22 8h4.54v14H.22V8zM7.98 8h4.35v1.91h.06c.61-1.15 2.09-2.36 4.3-2.36 4.6 0 5.45 3.03 5.45 6.96V22h-4.54v-6.69c0-1.6-.03-3.65-2.22-3.65-2.22 0-2.56 1.73-2.56 3.53V22H7.98V8z"/>
              </svg>
            </button>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;