import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#103725] text-[#ead59a]">
      <div className="mx-auto grid max-w-[1300px] gap-10 px-6 py-14 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-2">
          <div className="font-display text-5xl tracking-[.08em]">CAMPURA</div>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#d9cfae]">
            Premium camphor and fragrance products manufactured in India with a focus on purity, consistency and dependable supply.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">QUICK LINKS</h3>
          <div className="space-y-3 text-sm text-[#d9cfae]">
            <Link className="block hover:text-white" to="/about">About Us</Link>
            <Link className="block hover:text-white" to="/products">Products</Link>
            <Link className="block hover:text-white" to="/manufacturing">Manufacturing</Link>
            <Link className="block hover:text-white" to="/export">Export</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">CONTACT</h3>
          <div className="space-y-3 text-sm text-[#d9cfae]">
            <p className="flex gap-2"><Mail size={17} /> campurapremium@gmail.com</p>
            <p className="flex gap-2"><Phone size={17} /> +91 99097 89420</p>
            <p className="flex gap-2"><Phone size={17} /> +91 93272 19360</p>
            <p className="flex gap-2"><MapPin size={17} /> India</p>
          </div>
        </div>
      </div>

      <div className="border-t border-[#42614d] py-5 text-center text-xs text-[#bdb596]">
        © {new Date().getFullYear()} Campura. All rights reserved.
      </div>
    </footer>
  );
}