import { FormEvent, ReactNode, useEffect, useState } from "react";
import logoMark from "./assets/logo.png";
import { districts, insetRivers, lake, mapPoints, mekong, provinces, ratanakiri, ratInset, rivers } from "./cambodiaMapData";

const images = {
  hero: "https://images.unsplash.com/photo-1659067181027-8afc1940e89c?auto=format&fit=crop&w=2200&q=90",
  geology: "https://images.unsplash.com/photo-1685666586493-622c826886d5?auto=format&fit=crop&w=1400&q=85",
  drilling: "https://images.unsplash.com/photo-1696059928249-f036c4d54338?auto=format&fit=crop&w=1400&q=85",
  vision: "https://images.unsplash.com/photo-1770644426895-1f27aecda9e7?auto=format&fit=crop&w=2200&q=85",
};

type IconName = "pin" | "layers" | "globe" | "leaf" | "compass" | "drill" | "chart" | "community" | "arrow";

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    pin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    layers: <><path d="m12 3-9 5 9 5 9-5-9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18" /></>,
    leaf: <><path d="M20 4C11 4 5 8.5 5 15c0 2.7 2 5 5 5 6 0 10-7 10-16Z" /><path d="M4 21c3-5 7-8 12-11" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    drill: <><path d="M7 3h10l-1 5H8L7 3ZM10 8v9m4-9v9M8 17h8M12 17v5" /><path d="m9 12 6 3m-6 0 6-3" /></>,
    chart: <><path d="M4 20V10m6 10V4m6 16v-7m4 7H2" /></>,
    community: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="10" r="2" /><path d="M3 20c0-4 2.5-7 6-7s6 3 6 7M15 15c3 0 5 2 5 5" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? "logo-light" : ""}`} href="#top" aria-label="Green Action home">
      <span className="logo-mark"><img src={logoMark} alt="" /></span>
      <span><strong>GREEN ACTION</strong><small>CAMBODIA CO., LTD.</small></span>
    </a>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</div>;
}

const navItems = [
  ["About Us", "about"],
  ["Our Project", "project"],
  ["Our Approach", "approach"],
  ["Our Partner", "partner"],
  ["Contact", "contact"],
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Logo light={!scrolled} />
      <nav className={`nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <a className="header-cta" href="#contact">Contact Us <Icon name="arrow" size={17} /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>
        <span /><span /><span />
      </button>
    </header>
  );
}

function CambodiaMap() {
  const { banlungMain, phnomPenh, banlungInset, ratBox } = mapPoints;
  const [rx0, ry0, rx1, ry1] = ratBox;
  const kmScale = (100 / 111.32) * 76;
  return (
    <div className="map-wrap" aria-label="Map of Cambodia highlighting Ratanakiri province in the northeast">
      <svg className="topography" viewBox="0 0 700 620" aria-hidden="true">
        <path d="M-10 155c90-95 167-23 237-64s137-72 212 8 162 9 224 64" />
        <path d="M-30 198c94-91 173-22 245-61s139-69 218 8 169 8 232 61" />
        <path d="M-45 242c97-88 180-21 254-59s144-66 225 7 174 8 239 59" />
        <path d="M-60 482c110-74 204-18 288-49s162-56 253 6 196 6 270 50" />
        <path d="M-40 525c102-70 190-17 269-46s152-53 238 6 182 6 251 47" />
      </svg>
      <svg className="cambodia-shape" viewBox="0 0 640 580" role="img">
        <title>Cambodia with Ratanakiri province highlighted</title>
        <defs>
          <linearGradient id="mapFill" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#0d8450" />
            <stop offset="1" stopColor="#00492a" />
          </linearGradient>
          <pattern id="grid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M18 0H0v18" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
          </pattern>
          <clipPath id="khmClip"><path d={provinces + ratanakiri} /></clipPath>
          <clipPath id="ratClip"><path d={ratInset} /></clipPath>
        </defs>

        <path className="country-outline" d={provinces + ratanakiri} />
        <path className="country" d={provinces} />
        <path className="map-grid" d={provinces} />
        <g clipPath="url(#khmClip)">
          <path className="river" d={rivers} />
          <path className="river river-main" d={mekong} />
        </g>
        <path className="lake" d={lake} />
        <path className="province" d={ratanakiri} />
        <rect className="focus-box" x={rx0 - 4} y={ry0 - 4} width={rx1 - rx0 + 8} height={ry1 - ry0 + 8} />
        <path className="connector" d={`M${rx1 + 4} ${ry0 - 4}L420 20M${rx1 + 4} ${ry1 + 4}L420 340`} />

        <circle className="marker-ring ring-one" cx={banlungMain[0]} cy={banlungMain[1]} r="16" />
        <circle className="marker-ring ring-two" cx={banlungMain[0]} cy={banlungMain[1]} r="10" />
        <circle className="marker-dot" cx={banlungMain[0]} cy={banlungMain[1]} r="3.5" />

        <circle className="capital-dot" cx={phnomPenh[0]} cy={phnomPenh[1]} r="4" />
        <text x={phnomPenh[0] - 8} y={phnomPenh[1] + 4} textAnchor="end" className="map-city">Phnom Penh</text>
        <text x="178" y="378" textAnchor="middle" className="map-country-label">CAMBODIA</text>
        <text x="150" y="282" className="map-water">Tonle Sap</text>

        <g className="inset">
          <rect className="inset-card" x="420" y="20" width="180" height="320" />
          <text x="434" y="44" className="map-overline">PROJECT AREA</text>
          <text x="434" y="64" className="map-label">RATANAKIRI</text>
          <path className="inset-province" d={ratInset} />
          <g clipPath="url(#ratClip)"><path className="river" d={insetRivers} /></g>
          {districts.map(district => <path key={district.name} className="inset-district" d={district.d}><title>{district.name}</title></path>)}
          <circle className="marker-dot" cx={banlungInset[0]} cy={banlungInset[1]} r="3.5" />
          <text x={banlungInset[0] + 7} y={banlungInset[1] + 3.5} className="map-city">Banlung</text>
          <text x="434" y="326" className="map-overline">9 DISTRICTS · 10,782 KM²</text>
        </g>

        <g className="map-legend" transform="translate(430 440)">
          <rect className="province" width="12" height="9" y="-8" />
          <text x="20" y="0">Ratanakiri province</text>
          <path className="river river-main" d="M0 16h12" />
          <text x="20" y="20">Mekong &amp; rivers</text>
          <circle className="capital-dot" cx="6" cy="36" r="4" />
          <text x="20" y="40">National capital</text>
          <path className="scale-bar" d={`M0 62v5h${kmScale}v-5`} />
          <text x={kmScale + 8} y="68">100 km</text>
        </g>
      </svg>
      <div className="map-coordinate">BANLUNG&nbsp;&nbsp; 13.7394° N&nbsp;&nbsp; 106.9873° E</div>
    </div>
  );
}

function WorldMap() {
  const cities = [
    ["Canada", "20%", "25%"], ["Ghana", "46%", "55%"], ["South Africa", "55%", "67%"],
    ["Peru", "25%", "61%"], ["Chile", "28%", "74%"], ["Australia", "83%", "70%"],
  ];
  return (
    <div className="world-map">
      <svg viewBox="0 0 1000 490" aria-hidden="true">
        <path d="M57 112 103 55l102-23 79 31 52 57-31 56-77 4-35 49-45-31-50 13-44-44Z M254 247l64 17 43 71-26 105-55-36-24-83-38-50Z M436 91l95-38 121 14 48 35-41 37-87-4-30 31-65-15-56-32Z M500 177l91 8 52 72-25 126-64 65-56-84-21-119Z M667 130l90-59 167 37 31 70-69 57-109-8-55 43-66-50Z M794 322l94-38 72 51-14 78-105 14-67-50Z" />
        <path className="routes" d="M200 122Q409 10 835 343M280 354Q510 180 835 343M470 260Q660 205 835 343M835 343Q700 490 550 354" />
      </svg>
      {cities.map(([name, left, top]) => <div className="world-point" key={name} style={{ left, top }}><i /><span>{name}</span></div>)}
      <div className="world-hub"><i /><span>CAMBODIA</span><small>LOCAL FOCUS</small></div>
    </div>
  );
}

function App() {
  const [sent, setSent] = useState(false);
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("revealed")),
      { threshold: 0.12 },
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div id="top">
      <Header />
      <main>
        <section className="hero">
          <img src={images.hero} alt="Lush green Cambodian highlands" />
          <div className="hero-overlay" />
          <div className="hero-lines" />
          <div className="hero-content reveal">
            <Eyebrow light>GREEN ACTION (CAMBODIA) CO., LTD.</Eyebrow>
            <h1>Exploring Cambodia’s<br /><em>Mineral Potential</em></h1>
            <p>Green Action is focused on responsible mineral exploration and the development of mineral resources in Cambodia.</p>
            <div className="button-row">
              <a className="button button-gold" href="#project">Explore Our Project <Icon name="arrow" size={18} /></a>
              <a className="button button-ghost" href="#about">About Green Action</a>
            </div>
          </div>
          <div className="hero-meta">
            <div><small>PROJECT REGION</small><strong>Ratanakiri, Cambodia</strong></div>
            <div><small>CORE DISCIPLINE</small><strong>Mineral Exploration</strong></div>
          </div>
          <a className="scroll-cue" href="#about"><span /> SCROLL TO DISCOVER</a>
        </section>

        <section className="section about" id="about">
          <div className="about-copy reveal">
            <Eyebrow>WHO WE ARE</Eyebrow>
            <h2>Local Knowledge.<br />Responsible Exploration.<br /><em>Long-Term Vision.</em></h2>
            <p className="lead">Green Action (Cambodia) Co., Ltd. is a Cambodia-based private company focused on mineral exploration and the development of base metal opportunities.</p>
            <p>Through local knowledge, technical expertise, and international cooperation, we aim to contribute to the responsible development of Cambodia’s mineral sector.</p>
            <div className="highlights">
              <div><Icon name="pin" /><span>Cambodia-Based</span></div>
              <div><Icon name="layers" /><span>Mineral Exploration</span></div>
              <div><Icon name="globe" /><span>International Cooperation</span></div>
            </div>
          </div>
          <div className="about-visual reveal">
            <div className="image-frame"><img src={images.geology} alt="Geological rock formations in the field" /></div>
            <div className="image-note"><span>FIELD PERSPECTIVE</span><strong>Reading the landscape,<br />understanding the ground.</strong></div>
            <div className="vertical-caption">GEOLOGICAL UNDERSTANDING</div>
          </div>
        </section>

        <section className="project" id="project">
          <div className="section project-heading reveal">
            <div><Eyebrow light>OUR PROJECT</Eyebrow><h2>Exploring Opportunities<br /><em>in Ratanakiri</em></h2></div>
            <p>Green Action is working under a cooperative agreement with Gold Fields Limited on a mineral exploration project in Ratanakiri Province.</p>
          </div>
          <div className="project-stage section">
            <CambodiaMap />
            <div className="project-card reveal">
              <div className="card-index">PROJECT / 01</div>
              {[
                ["LOCATION", "Ratanakiri, Cambodia"],
                ["FOCUS", "Mineral Exploration"],
                ["PARTNERSHIP", "Green Action × Gold Fields"],
                ["APPROACH", "Systematic Exploration"],
              ].map(([label, value]) => <div className="data-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
              <a href="#approach">View our approach <Icon name="arrow" size={17} /></a>
            </div>
          </div>
        </section>

        <section className="section approach" id="approach">
          <div className="approach-intro reveal">
            <Eyebrow>OUR APPROACH</Eyebrow>
            <h2>Understanding the Ground <em>Beneath Us</em></h2>
            <p>Responsible exploration is a systematic process—combining geological understanding, technical analysis, and careful evaluation to build knowledge about what lies below.</p>
          </div>
          <div className="process reveal">
            {[
              ["01", "Explore", "Identify geological opportunities and areas of interest.", "compass"],
              ["02", "Investigate", "Study geological conditions and available data.", "layers"],
              ["03", "Drill", "Use targeted drilling to investigate subsurface conditions.", "drill"],
              ["04", "Evaluate", "Analyze findings and assess resource potential.", "chart"],
            ].map(([n, title, text, icon]) => (
              <div className="process-step" key={n}>
                <div className="process-top"><span>{n}</span><i><Icon name={icon as IconName} /></i></div>
                <h3>{title}</h3><p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="responsibility">
          <div className="section">
            <div className="responsibility-heading reveal">
              <div><Eyebrow light>RESPONSIBLE EXPLORATION</Eyebrow><h2>Exploration with a<br /><em>Long-Term Perspective</em></h2></div>
              <p>We believe mineral exploration should be carried out with careful consideration for the environment, local communities, and long-term resource development.</p>
            </div>
            <div className="responsibility-grid reveal">
              {[
                ["01", "Environmental Responsibility", "Considering environmental factors throughout exploration activities.", "leaf"],
                ["02", "Modern Exploration", "Applying systematic and technically informed exploration methods.", "compass"],
                ["03", "Local Awareness", "Understanding the local context and communities surrounding our activities.", "community"],
                ["04", "Long-Term Development", "Building knowledge that can support responsible resource development.", "chart"],
              ].map(([n, title, text, icon]) => (
                <article key={n}><div><span>{n}</span><Icon name={icon as IconName} size={30} /></div><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section partner" id="partner">
          <div className="partner-content reveal">
            <Eyebrow>OUR PARTNER</Eyebrow>
            <h2>Working with<br /><em>Global Expertise</em></h2>
            <p className="lead">Our cooperation with Gold Fields Limited connects local knowledge and international mining expertise to support mineral exploration in Cambodia.</p>
            <p>Gold Fields is a globally diversified gold producer with operations across multiple regions. Its role here is as Green Action’s cooperation partner for exploration activities in Ratanakiri.</p>
            <div className="partner-mark"><span className="gold-disc">GF</span><div><small>COOPERATION PARTNER</small><strong>Gold Fields Limited</strong></div></div>
          </div>
          <div className="partner-image reveal">
            <img src={images.drilling} alt="Exploration drilling equipment operating in the field" />
            <div className="partner-tag"><span>TECHNICAL COOPERATION</span><strong>Local insight.<br />International experience.</strong></div>
          </div>
        </section>

        <section className="global">
          <div className="global-title reveal">
            <Eyebrow light>INTERNATIONAL COOPERATION</Eyebrow>
            <h2>Global Experience. <em>Local Focus.</em></h2>
            <p>International technical experience supports our local exploration work in Cambodia.</p>
          </div>
          <WorldMap />
          <div className="global-note">Highlighted countries represent locations associated with Gold Fields’ global operations. Green Action does not own or operate these mines.</div>
        </section>

        <section className="section focus">
          <div className="focus-heading reveal"><Eyebrow>WHY GREEN ACTION</Eyebrow><h2>Our Focus</h2><p>Four principles guide how we work and where we contribute.</p></div>
          <div className="focus-grid reveal">
            {[
              ["Mineral Exploration", "Building geological knowledge through disciplined, field-based investigation.", "layers"],
              ["Responsible Development", "Considering environmental and community context at every stage.", "leaf"],
              ["Technical Cooperation", "Combining local understanding with international technical experience.", "globe"],
              ["Cambodia", "Committed to the long-term development of Cambodia’s mineral sector.", "pin"],
            ].map(([title, text, icon], i) => (
              <article key={title}><span>0{i + 1}</span><Icon name={icon as IconName} size={32} /><h3>{title}</h3><p>{text}</p><i className="card-arrow"><Icon name="arrow" size={18} /></i></article>
            ))}
          </div>
        </section>

        <section className="vision">
          <img src={images.vision} alt="Forested Cambodian mountains in morning mist" />
          <div className="vision-overlay" />
          <div className="vision-content reveal">
            <Eyebrow light>OUR VISION</Eyebrow>
            <blockquote>“Contributing to Cambodia’s mineral sector through responsible exploration, technical expertise, and long-term development.”</blockquote>
            <span>GREEN ACTION (CAMBODIA) CO., LTD.</span>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy reveal">
            <Eyebrow>CONTACT</Eyebrow>
            <h2>Connect With<br /><em>Green Action</em></h2>
            <p>Learn more about our company, project activities, and mineral exploration work in Cambodia.</p>
            <div className="contact-detail"><small>GENERAL ENQUIRIES</small><a href="mailto:cambodiagreenaction@gmail.com">cambodiagreenaction@gmail.com</a></div>
            <div className="contact-detail"><small>OFFICE</small><span>Phnom Penh, Cambodia</span></div>
          </div>
          <form className="contact-form reveal" onSubmit={submit}>
            <div className="form-row">
              <label><span>Name</span><input required name="name" placeholder="Your full name" /></label>
              <label><span>Company / Organization</span><input name="company" placeholder="Organization name" /></label>
            </div>
            <label><span>Email</span><input required type="email" name="email" placeholder="name@company.com" /></label>
            <label><span>Message</span><textarea required name="message" rows={4} placeholder="How can we help?" /></label>
            <button className="button button-green" type="submit">{sent ? "Message Ready" : "Send Message"} <Icon name="arrow" size={18} /></button>
            {sent && <p className="form-status">Thank you. This demonstration form is ready to connect to your preferred email service.</p>}
          </form>
        </section>
      </main>
      <footer>
        <div className="footer-main">
          <div><Logo light /><p>A Cambodia-based private company advancing responsible mineral exploration through local knowledge and international cooperation.</p></div>
          <div><small>NAVIGATION</small>{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</div>
          <div><small>CONTACT</small><a href="mailto:cambodiagreenaction@gmail.com">cambodiagreenaction@gmail.com</a><span>Phnom Penh, Cambodia</span></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Green Action (Cambodia) Co., Ltd. All rights reserved.</span><span>RESPONSIBLE EXPLORATION · CAMBODIA</span></div>
      </footer>
    </div>
  );
}

export default App;
