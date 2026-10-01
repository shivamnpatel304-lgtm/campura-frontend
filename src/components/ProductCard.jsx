import { Link } from "react-router-dom";
import { Flower2, ArrowUpRight } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <article className="group rounded-3xl border border-[#e1d4b8] bg-[#fffaf0] p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-[#eee2c7]">
        <div className="float-slow grid h-32 w-32 place-items-center rounded-full bg-[#c99b38] shadow-xl">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-[#e9dcae]">
            <Flower2 size={54} strokeWidth={1.1} className="text-[#7e5c18]" />
          </div>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-[#123d29] px-3 py-1 text-[10px] font-bold tracking-widest text-[#f1d98d]">
          {product.tag}
        </span>
      </div>

      <div className="text-xs font-semibold tracking-[.2em] text-[#a2761d]">{product.category}</div>
      <h3 className="mt-2 font-display text-3xl text-[#123d29]">{product.name}</h3>
      <p className="mt-3 text-sm leading-6 text-[#716954]">{product.description}</p>

      <Link
        to={`/products/${product.id}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-[#8d681b] group-hover:gap-3"
      >
        VIEW DETAILS <ArrowUpRight size={16}/>
      </Link>
    </article>
  );
}