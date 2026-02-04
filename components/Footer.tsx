import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sage-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl mb-4">Neale Gold</h3>
            <p className="text-sage-light text-sm">
              Appellate Attorney
              <br />
              San Diego, California
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-sage-light hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/practice-areas" className="text-sage-light hover:text-white transition-colors">
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sage-light hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-sage-light">
              <li>402 W. Broadway, Suite 400</li>
              <li>San Diego, CA 92101</li>
              <li>
                <a href="tel:858-344-0747" className="hover:text-white transition-colors">
                  (858) 344-0747
                </a>
              </li>
              <li>
                <a href="mailto:nealegold@ngoldlaw.com" className="hover:text-white transition-colors">
                  nealegold@ngoldlaw.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage mt-8 pt-8 text-center text-sm text-sage-light">
          <p>&copy; {currentYear} Law Offices of Neale Gold, P.C. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
