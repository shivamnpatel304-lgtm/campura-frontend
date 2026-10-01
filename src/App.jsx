import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ArrowRight, Leaf, Flower2, ShieldCheck, Globe2, UsersRound, CheckCircle2 } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageHero from "./components/PageHero";
import ProductCard from "./components/ProductCard";
import { products as fallbackProducts } from "./data";

const features = [
  [Leaf, "PREMIUM", "QUALITY"],
  [Flower2, "PURE &", "NATURAL"],
  [ShieldCheck, "HYGIENIC", "PROCESS"],
  [Globe2, "GLOBAL", "SUPPLY"],
];

function normalizeProduct(product) {
  return {
    id: String(product.id ?? product.Id ?? "product"),
    name: product.name ?? product.Name ?? "Campura Product",
    category: product.category ?? product.Category ?? "General",
    description:
      product.description ??
      product.Description ??
      `${product.name ?? product.Name ?? "Campura Product"} from our premium collection.`,
    tag: product.tag ?? product.Tag ?? "PRODUCT",
    image: product.image ?? product.imageUrl ?? product.ImageUrl ?? null,
  };
}

function useProducts() {
  const [products, setProducts] = useState(() => fallbackProducts.map(normalizeProduct));

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const mappedProducts = (Array.isArray(data) ? data : []).map(normalizeProduct);

        if (active) {
          setProducts(mappedProducts.length ? mappedProducts : fallbackProducts.map(normalizeProduct));
        }
      } catch (error) {
        if (active) {
          setProducts(fallbackProducts.map(normalizeProduct));
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return products;
}

function Home() {
  const products = useProducts();

  return (
    <>
      <section className="hero-pattern overflow-hidden">
        <div className="mx-auto grid max-w-[1500px] items-center lg:grid-cols-[48%_52%]">
          <div className="px-6 py-16 lg:px-12 lg:py-24 reveal">
            <div className="mb-7 flex items-center gap-3 text-xs tracking-[.32em] text-[#a2761d]">
              <span className="h-px w-14 bg-[#b58a2c]"/> PREMIUM INDIAN MANUFACTURER
            </div>

            <h1 className="font-display text-6xl leading-[.9] tracking-wide text-[#123d29] sm:text-7xl lg:text-[92px]">
              PURE
              <br/>CAMPHOR.
              <span className="mt-3 block text-[#b58a2c]">DIVINE<br/>AROMA.</span>
            </h1>

            <div className="my-8 flex items-center gap-3">
              <span className="h-px w-48 bg-[#b58a2c]"/>
              <span className="text-xl text-[#b58a2c]">❈</span>
            </div>

            <p className="max-w-xl text-sm leading-7 tracking-[.12em] text-[#34473b] md:text-base">
              PREMIUM CAMPHOR & FRAGRANCE PRODUCTS
              <br/>MANUFACTURED IN INDIA
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/products" className="rounded-full bg-[#123d29] px-7 py-4 text-sm font-semibold tracking-wide text-[#f1d98d] transition hover:-translate-y-1 hover:bg-[#1d5138]">
                EXPLORE PRODUCTS <ArrowRight className="ml-2 inline" size={16}/>
              </Link>
              <Link to="/contact" className="rounded-full border border-[#b58a2c] px-7 py-4 text-sm font-semibold tracking-wide text-[#8d681b] transition hover:bg-[#b58a2c] hover:text-white">
                <UsersRound className="mr-2 inline" size={16}/> BECOME A PARTNER
              </Link>
            </div>

            <div className="mt-14 grid max-w-2xl grid-cols-2 sm:grid-cols-4">
              {features.map(([Icon, a, b], i) => (
                <div key={a} className={`px-4 text-center ${i ? "border-l border-[#d8c9a7]" : ""}`}>
                  <Icon className="mx-auto mb-3 text-[#a2761d]" size={34} strokeWidth={1.2}/>
                  <div className="text-[11px] tracking-[.13em]">{a}<br/>{b}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[600px] overflow-hidden lg:min-h-[760px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_45%,#fffdf7_0%,#f3e8ce_45%,transparent_70%)]"/>
            <div className="absolute right-[10%] top-[20%] h-80 w-80 rounded-full bg-white/70 blur-3xl"/>
            <div className="absolute bottom-[13%] left-[12%] h-20 w-56 rotate-[-10deg] rounded-[50%] bg-[#d6c9a9] opacity-40 blur-xl"/>
            <div className="absolute left-[12%] top-[25%] text-[90px] opacity-10">〰</div>

            <div className="absolute left-[18%] top-[23%] h-16 w-44 rounded-[50%] bg-[#b78b2b] shadow-[0_20px_40px_rgba(82,59,15,.25)]"/>
            <div className="absolute left-[22%] top-[20%] h-12 w-36 rounded-[50%] bg-[#e6c96d]"/>
            <div className="absolute left-[22%] top-[16%] h-20 w-20 rounded-full border-[12px] border-[#d6c9a9]"/>
            <div className="absolute left-[28%] top-[30%] h-52 w-52 rounded-full border-8 border-[#b78b2b] bg-gradient-to-br from-[#d8b456] to-[#936b1b] shadow-2xl"/>
            <div className="absolute left-[31%] top-[35%] h-40 w-40 rounded-full bg-[#fffaf0] shadow-inner"/>
            <div className="absolute left-[36%] top-[41%] h-24 w-24 rotate-12 rounded-2xl bg-white shadow-lg"/>
            <div className="absolute left-[29%] top-[39%] h-20 w-20 -rotate-12 rounded-2xl bg-[#fffdf5] shadow-lg"/>
            <div className="absolute left-[40%] top-[35%] h-20 w-20 rotate-45 rounded-2xl bg-white shadow-lg"/>
            <div className="absolute left-[35%] top-[31%] h-16 w-16 rotate-12 rounded-2xl bg-[#fffefa] shadow-lg"/>
            <div className="absolute left-[31%] top-[51%] h-10 w-10 rounded-full bg-white shadow-lg"/>
            <div className="absolute left-[41%] top-[52%] h-12 w-12 rounded-full bg-white shadow-lg"/>
            <div className="absolute left-[40%] top-[70%] h-16 w-32 rounded-[50%] bg-[#a4771e]"/>
            <div className="absolute left-[31%] top-[69%] h-6 w-48 rounded-full bg-[#c6b999] opacity-60 blur-md"/>

            <div className="absolute right-[7%] top-[10%] h-[520px] w-4 rotate-[18deg] rounded-full bg-[#365e31] opacity-80"/>
            <div className="absolute right-[4%] top-[18%] h-24 w-48 rotate-[18deg] rounded-[100%_0] bg-[#4b7c3d] opacity-80"/>
            <div className="absolute right-[8%] top-[35%] h-28 w-52 rotate-[-18deg] rounded-[0_100%] bg-[#527f43] opacity-80"/>
            <div className="absolute right-[18%] top-[52%] h-24 w-44 rotate-[24deg] rounded-[100%_0] bg-[#5b8749] opacity-70"/>
            <div className="absolute right-[1%] top-[58%] h-28 w-52 rotate-[-15deg] rounded-[0_100%] bg-[#3e6e37] opacity-75"/>

            <div className="absolute bottom-[7%] left-[15%] font-display text-4xl text-[#a2761d]/70">✦</div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 text-xs font-bold tracking-[.35em] text-[#a2761d]">OUR COLLECTION</div>
          <h2 className="font-display text-5xl text-[#123d29] md:text-6xl">OUR PREMIUM PRODUCTS</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6f6755]">
            Crafted with purity. Infused with fragrance. Created for your lifestyle.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((p) => <ProductCard key={p.id} product={p}/>)}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products" className="inline-flex items-center gap-2 rounded-full border border-[#b58a2c] px-7 py-3 text-sm font-semibold text-[#8d681b]">
            VIEW ALL PRODUCTS <ArrowRight size={16}/>
          </Link>
        </div>
      </section>

      <section className="bg-[#123d29] px-6 py-20 text-[#f1d98d]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs font-bold tracking-[.35em] text-[#d6b45b]">WHY CAMPURA</div>
            <h2 className="mt-4 font-display text-5xl leading-none md:text-6xl">Purity you can trust.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Consistent quality", "Hygienic process", "Made in India", "B2B & export ready"].map((x) => (
              <div key={x} className="glass rounded-2xl p-5 text-sm text-[#eadfbd]">
                <CheckCircle2 className="mb-3 text-[#d6b45b]" size={22}/>
                {x}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <PageHero eyebrow="OUR STORY" title="About Campura" description="A premium Indian brand built around purity, dependable manufacturing and the timeless aroma of camphor."/>
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 lg:px-10">
        <div className="rounded-3xl bg-[#e8dcc1] p-10">
          <div className="mx-auto grid h-56 max-w-xs place-items-center rounded-full border-[18px] border-[#c29a42] bg-[#f7efdc] shadow-xl">
            <span className="font-display text-5xl text-[#123d29]">C</span>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold tracking-[.3em] text-[#a2761d]">OUR PROMISE</div>
          <h2 className="mt-3 font-display text-5xl text-[#123d29]">Tradition, refined for today.</h2>
          <p className="mt-6 leading-8 text-[#665d49]">Campura brings together traditional Indian familiarity with modern quality expectations. Our focus is simple: clean products, reliable processes, thoughtful packaging and dependable supply.</p>
          <p className="mt-4 leading-8 text-[#665d49]">We work with retailers, distributors, private-label partners and buyers looking for a premium Indian manufacturing partner.</p>
        </div>
      </section>
    </>
  );
}

function Products() {  const products = useProducts();
  return (
    <>
      <PageHero eyebrow="COLLECTION" title="Premium Products" description="Explore our camphor, pooja and fragrance categories for retail, wholesale and business requirements."/>
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => <ProductCard key={p.id} product={p}/>)}
        </div>
      </section>
    </>
  );
}

function ProductDetails({ id }) {
  const products = useProducts();
  const product = products.find((p) => String(p.id) === String(id)) || products[0];

  if (!product) {
    return null;
  }

  return (
    <>
      <PageHero eyebrow={String(product.category).toUpperCase()} title={product.name} description={product.description}/>
      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2">
        <div className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl bg-[#eadfc6]">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-52 w-52 place-items-center rounded-full bg-[#c69a3b] shadow-2xl">
              <Flower2 size={90} className="text-[#f8edc8]" strokeWidth={1} />
            </div>
          )}
        </div>
        <div className="py-5">
          <div className="text-xs font-bold tracking-[.3em] text-[#a2761d]">CAMPURA QUALITY</div>
          <h2 className="mt-3 font-display text-5xl text-[#123d29]">Built for confidence.</h2>
          <p className="mt-6 leading-8 text-[#665d49]">{product.description}</p>
          <ul className="mt-7 space-y-3 text-sm text-[#4f4a3d]">
            {["Premium quality focus", "Hygienic manufacturing", "Retail and bulk supply", "Custom business enquiries"].map((x) => (
              <li key={x}><CheckCircle2 className="mr-2 inline text-[#a2761d]" size={17}/>{x}</li>
            ))}
          </ul>
          <Link to="/contact" className="mt-8 inline-block rounded-full bg-[#123d29] px-7 py-4 text-sm font-semibold text-[#f1d98d]">REQUEST A QUOTE</Link>
        </div>
      </section>
    </>
  );
}

function Manufacturing() {
  return (
    <>
      <PageHero eyebrow="MANUFACTURING" title="Made with discipline." description="Our manufacturing story is centred on consistency, hygiene, quality checks and reliable fulfilment."/>
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["01", "Raw Material", "Careful sourcing and incoming quality checks."],
            ["02", "Processing", "Controlled production with hygienic handling."],
            ["03", "Packing", "Secure packaging designed for storage and transit."],
          ].map(([n,t,d]) => (
            <div key={n} className="rounded-3xl border border-[#e0d3b8] bg-[#fffaf0] p-8">
              <div className="font-display text-5xl text-[#b58a2c]">{n}</div>
              <h3 className="mt-5 font-display text-3xl text-[#123d29]">{t}</h3>
              <p className="mt-3 text-sm leading-6 text-[#716954]">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Export() {
  return (
    <>
      <PageHero eyebrow="GLOBAL SUPPLY" title="Export & B2B" description="Partner with an Indian manufacturer for dependable bulk, wholesale and private-label requirements."/>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 lg:px-10">
        <div>
          <h2 className="font-display text-5xl text-[#123d29]">Ready for your market.</h2>
          <p className="mt-5 leading-8 text-[#665d49]">We can support distributors, importers, retailers and private-label buyers with product discussions, packaging requirements and commercial enquiries.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#123d29] px-7 py-4 text-sm font-semibold text-[#f1d98d]">START AN ENQUIRY <ArrowRight size={16}/></Link>
        </div>
        <div className="rounded-3xl bg-[#123d29] p-9 text-[#ead59a]">
          {["Bulk supply", "Private label", "Retail distribution", "Export enquiries"].map((x) => (
            <div key={x} className="border-b border-[#456150] py-5 text-lg">{x}<span className="float-right">✦</span></div>
          ))}
        </div>
      </section>
    </>
  );
}

function Contact() {
  const initialForm = {
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (submitted) {
      setSubmitted(false);
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Unable to submit your enquiry right now.");
      }

      setSubmitted(true);
      setFormData(initialForm);
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <PageHero eyebrow="GET IN TOUCH" title="Let's build something." description="Tell us what you need and our team can discuss products, bulk supply, private label or export requirements."/>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[.8fr_1.2fr] lg:px-10">
        <div className="rounded-3xl bg-[#123d29] p-9 text-[#ead59a]">
          <h2 className="font-display text-4xl">Contact Campura</h2>
          <p className="mt-4 text-sm leading-7 text-[#d7cfb4]">For quotations, product details and partnership enquiries.</p>
          <div className="mt-8 space-y-5 text-sm">
            <div>info@campura.in</div>
            <div>+91 98765 43210</div>
            <div>India</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-[#dfd2b8] bg-[#fffaf0] p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm">Name
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#ddd0b5] bg-white p-3 outline-none focus:border-[#a2761d]"
              />
            </label>
            <label className="text-sm">Company
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#ddd0b5] bg-white p-3 outline-none focus:border-[#a2761d]"
              />
            </label>
            <label className="text-sm">Email
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#ddd0b5] bg-white p-3 outline-none focus:border-[#a2761d]"
              />
            </label>
            <label className="text-sm">Phone
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#ddd0b5] bg-white p-3 outline-none focus:border-[#a2761d]"
              />
            </label>
          </div>
          <label className="mt-5 block text-sm">Requirement
            <textarea
              rows="5"
              required
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-[#ddd0b5] bg-white p-3 outline-none focus:border-[#a2761d]"
            />
          </label>
          <button type="submit" className="mt-6 rounded-full bg-[#123d29] px-8 py-4 text-sm font-semibold text-[#f1d98d]">
            SEND ENQUIRY ✦
          </button>
          {submitError && (
            <p className="mt-4 text-sm font-medium text-[#8d1f1f]">
              {submitError}
            </p>
          )}
          {submitted && (
            <p className="mt-4 text-sm font-medium text-[#123d29]">
              Your enquiry has been submitted successfully.
            </p>
          )}
        </form>
      </section>
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8f1df] text-[#163d2b]">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/products/:id" element={<ProductRoute/>}/>
        <Route path="/manufacturing" element={<Manufacturing/>}/>
        <Route path="/export" element={<Export/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      <Footer />
      <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 rounded-full bg-[#1f9b54] px-5 py-3 text-sm font-bold text-white shadow-xl transition hover:scale-105">
        WhatsApp
      </a>
    </div>
  );
}

function ProductRoute() {
  const id = window.location.pathname.split("/").pop();
  return <ProductDetails id={id} />;
}