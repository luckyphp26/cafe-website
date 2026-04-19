import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import logo from './assets/logo.png';
import menu1 from './assets/menu-1.jpg';
import menu2 from './assets/menu-2.jpg';
import menu3 from './assets/menu-3.jpg';
import menu4 from './assets/menu-4.jpg';
import bookImg from './assets/book.jpg';
import headerBg from './assets/header-bg.jpg';

const API_URL = process.env.REACT_APP_API_URL || 'https://cafe-websitepastry-world-backend.onrender.com/api';

/* ── Seed reviews ─────────────────────────────────────────────────────── */
const SEED_REVIEWS = [
  {
    id: 1,
    name: "Priya Sharma",
    initials: "PS",
    avatarBg: "#f5dfc0",
    avatarColor: "#a0631e",
    location: "Malviya Nagar, Jaipur",
    rating: 5,
    dish: "Cinnamon Roll",
    date: "April 12, 2025",
    text: "Honestly the best cinnamon roll I've had in Jaipur. It came out warm, the glaze was perfectly sweet and not overdone. The place has this cozy vibe that makes you want to sit and stay. My sister and I ordered two extra to take home!",
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: "Arjun Meena",
    initials: "AM",
    avatarBg: "#dbeafe",
    avatarColor: "#1e40af",
    location: "Vaishali Nagar",
    rating: 5,
    dish: "Chocolate Croissant",
    date: "March 28, 2025",
    text: "The croissant had exactly the right flakiness. Paired with their cold brew — absolute perfection. Will definitely be back next weekend.",
    verified: true,
    featured: false,
  },
  {
    id: 3,
    name: "Sneha Rathi",
    initials: "SR",
    avatarBg: "#fce7f3",
    avatarColor: "#9d174d",
    location: "C-Scheme, Jaipur",
    rating: 4,
    dish: "Chocolate Mousse",
    date: "April 3, 2025",
    text: "Rich and velvety mousse. Small portion for ₹290 but the quality justifies it. Service was quick and the staff were super warm.",
    verified: true,
    featured: false,
  },
  {
    id: 4,
    name: "Rahul Joshi",
    initials: "RJ",
    avatarBg: "#d1fae5",
    avatarColor: "#065f46",
    location: "Jagatpura, Jaipur",
    rating: 5,
    dish: "Chocolate Fudge",
    date: "April 8, 2025",
    text: "I live 5 minutes away and it's become my Sunday ritual. The fudge cake is deeply chocolatey without being too dense. So glad this place opened here.",
    verified: true,
    featured: false,
  },
  {
    id: 5,
    name: "Kavya Gupta",
    initials: "KG",
    avatarBg: "#ede9fe",
    avatarColor: "#5b21b6",
    location: "Mansarovar, Jaipur",
    rating: 4,
    dish: "Cinnamon Roll",
    date: "March 19, 2025",
    text: "Lovely ambiance, very Instagram-worthy. The cinnamon roll was delicious — I only wished it was slightly larger. Still a solid recommendation for baked goods lovers.",
    verified: false,
    featured: false,
  },
];



/* ── Star row component ─────────────────────────────────────────────── */
function Stars({ rating, max = 5 }) {
  return (
    <div className="review__stars__row">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={i < rating ? '' : 'dim'}>★</span>
      ))}
    </div>
  );
}

/* ── Display card ───────────────────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <div className={`review__display__card${review.featured ? ' review__display__card--dark' : ''}`}>
      {review.verified && <div className="review__verified__badge">✓ Verified Visit</div>}
      <div className="review__glyph">"</div>
      <Stars rating={review.rating} />
      <span className="review__dish__tag">{review.dish}</span>
      <div className="review__date">{review.date}</div>
      <p className="review__body">{review.text}</p>
      <div className="review__footer">
        <div
          className="review__avatar"
          style={{ background: review.avatarBg, color: review.avatarColor }}
        >
          {review.initials}
        </div>
        <div>
          <div className="review__name">{review.name}</div>
          <div className="review__location">{review.location}</div>
        </div>
      </div>
    </div>
  );
}

/* ── Star picker ────────────────────────────────────────────────────── */
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="star__picker">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`star__picker__btn${n <= (hovered || value) ? ' active' : ''}`}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

/* ── Contact Form Component ─────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in your name, email, and message.');
      return;
    }
    try {
      setSending(true);
      await axios.post(`${API_URL}/contact`, form);
      alert('✅ Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', mobile: '', message: '' });
    } catch (err) {
      alert('Failed to send: ' + (err.response?.data?.error || err.message));
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact__form" onSubmit={handleSubmit}>
      <input type="text"  name="name"    placeholder="Your Name *"    value={form.name}    onChange={handleChange} required />
      <input type="email" name="email"   placeholder="Email *"         value={form.email}   onChange={handleChange} required />
      <input type="text"  name="mobile"  placeholder="Mobile Number"   value={form.mobile}  onChange={handleChange} />
      <textarea           name="message" placeholder="Your Message *"  value={form.message} onChange={handleChange} required />
      <button className="btn" type="submit" disabled={sending}>
        {sending ? 'Sending…' : 'Submit'}
      </button>
    </form>
  );
}

/* ── Main App ───────────────────────────────────────────────────────── */
function App() {
  /* Booking form */
  const [bookForm, setBookForm] = useState({ firstName: '', lastName: '', date: '', person: '' });
  const [bookLoading, setBookLoading] = useState(false);

  useEffect(() => {
    const t = new Date();
    const d = String(t.getDate()).padStart(2, '0');
    const m = String(t.getMonth() + 1).padStart(2, '0');
    setBookForm(prev => ({ ...prev, date: `${t.getFullYear()}-${m}-${d}` }));
  }, []);

  const handleBookChange = (e) => setBookForm({ ...bookForm, [e.target.name]: e.target.value });

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!bookForm.firstName || !bookForm.lastName || !bookForm.date || !bookForm.person || Number(bookForm.person) <= 0) {
      alert('Please enter valid details (guests must be more than 0)');
      return;
    }
    try {
      setBookLoading(true);
      await axios.post(`${API_URL}/bookings`, {
        firstName: bookForm.firstName,
        phone:     bookForm.lastName,
        date:      bookForm.date,
        guests:    Number(bookForm.person),
      });
      alert('🎉 Table Booked Successfully! We\'ll see you soon.');
      setBookForm(prev => ({ ...prev, firstName: '', lastName: '', person: '' }));
    } catch (err) {
      alert('Booking failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setBookLoading(false);
    }
  };

  /* Reviews state — loaded from MongoDB */
  const [reviews, setReviews]         = useState(SEED_REVIEWS);
  const [, setRevLoading] = useState(true);
  const [showToast, setShowToast]     = useState(false);

  /* Load reviews from DB on mount */
  useEffect(() => {
    axios.get(`${API_URL}/reviews`)
      .then(res => { if (res.data.length > 0) setReviews(res.data); })
      .catch(() => {/* keep seed data if server unreachable */})
      .finally(() => setRevLoading(false));
  }, []);

  /* New review form */
  const [newReview, setNewReview] = useState({ name: '', location: '', dish: '', rating: 0, text: '' });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const handleReviewChange = (e) =>
    setNewReview({ ...newReview, [e.target.name]: e.target.value });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.name.trim())                              { alert('Please enter your name.'); return; }
    if (newReview.rating === 0)                              { alert('Please select a star rating.'); return; }
    if (!newReview.text.trim() || newReview.text.trim().length < 15) { alert('Please write at least 15 characters in your review.'); return; }

    try {
      setReviewSubmitting(true);
      const res = await axios.post(`${API_URL}/reviews`, newReview);
      setReviews(prev => [res.data.review, ...prev]);
      setNewReview({ name: '', location: '', dish: '', rating: 0, text: '' });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      alert('Could not post review: ' + (err.response?.data?.error || err.message));
    } finally {
      setReviewSubmitting(false);
    }
  };

  /* Average rating */
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div>

      {/* ── HEADER ── */}
      <header
        style={{
          backgroundImage: `url(${headerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <nav>
          <div className="nav__logo">
            <img src={logo} alt="Pastry World Logo" />
          </div>
          <ul className="nav__links">
            <li><a href="#home">Home</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contactus">Contact</a></li>
            <li><a href="#booking">Reserve</a></li>
          </ul>
        </nav>

        <div className="section__container header__container" id="home">
          <h1>Good Pastry &amp; <em>Coffee</em> For a Good Day</h1>
          <p>Start your day with freshly baked pastries and premium coffee, crafted with love in the heart of Jaipur.</p>
          <div className="header__btns">
            <a href="#menu" className="btn">Explore Menu</a>
            <a href="#booking" className="btn">Book a Table</a>
          </div>
        </div>
      </header>

      {/* ── MENU ── */}
      <section className="menu" id="menu">
        <div className="section__container menu__container">
          <h2 className="section__header">Popular Menu</h2>
          <p className="menu__subtitle">Our most loved bakes, fresh every morning</p>

          <div className="menu__grid">
            <div className="menu__card">
              <img src={menu1} alt="Cinnamon Roll" />
              <div className="menu__card__content">
                <h4>Cinnamon Roll</h4>
                <p>Soft, pillowy roll swirled with cinnamon sugar and topped with cream cheese glaze.</p>
                <div className="menu__card__footer"><h3>₹140</h3><span>Bestseller</span></div>
              </div>
            </div>

            <div className="menu__card">
              <img src={menu2} alt="Chocolate Croissant" />
              <div className="menu__card__content">
                <h4>Chocolate Croissant</h4>
                <p>Flaky, buttery croissant filled with rich dark chocolate ganache.</p>
                <div className="menu__card__footer"><h3>₹240</h3><span>Popular</span></div>
              </div>
            </div>

            <div className="menu__card">
              <img src={menu3} alt="Chocolate Fudge" />
              <div className="menu__card__content">
                <h4>Chocolate Fudge</h4>
                <p>Dense, indulgent chocolate fudge cake with a velvety smooth finish.</p>
                <div className="menu__card__footer"><h3>₹200</h3><span>Chef's Pick</span></div>
              </div>
            </div>

            <div className="menu__card">
              <img src={menu4} alt="Chocolate Mousse" />
              <div className="menu__card__content">
                <h4>Chocolate Mousse</h4>
                <p>Airy, light mousse made from premium Belgian chocolate, served chilled.</p>
                <div className="menu__card__footer"><h3>₹290</h3><span>Premium</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section className="book dark__book" id="booking">
        <div className="section__container book__container">
          <div className="book__grid">
            <div className="book__form">
              <h2 className="section__header">Reserve a Table</h2>
              <p>Book your spot and we'll have everything ready for you.</p>

              <form onSubmit={handleBookSubmit}>
                <div className="form__group">
                  <label>Full Name</label>
                  <input type="text" name="firstName" placeholder="Your Name" value={bookForm.firstName} onChange={handleBookChange} />
                </div>
                <div className="form__group">
                  <label>Phone Number</label>
                  <input type="text" name="lastName" placeholder="+91 XXXXX XXXXX" value={bookForm.lastName} onChange={handleBookChange} />
                </div>
                <div className="form__row">
                  <div className="form__group">
                    <label>Date</label>
                    <input type="date" name="date" value={bookForm.date} onChange={handleBookChange} />
                  </div>
                  <div className="form__group">
                    <label>Guests</label>
                    <input type="number" name="person" value={bookForm.person} onChange={handleBookChange} min="1" placeholder="2" />
                  </div>
                </div>
                <button className="btn" type="submit" disabled={bookLoading}>
                  {bookLoading ? 'Booking…' : 'Reserve Now'}
                </button>
              </form>
            </div>

            <div className="book__image">
              <img src={bookImg} alt="Cafe interior" />
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="reviews__section" id="reviews">
        <div className="section__container">

          {/* Top bar */}
          <div className="reviews__topbar">
            <div className="reviews__topbar__left">
              <h2 className="section__header">What Our Guests Say</h2>
              <p className="reviews__tagline">Real visits. Real pastries. Real opinions.</p>
            </div>
            <div className="reviews__score__pill">
              <div className="score__big">{avgRating}</div>
              <div className="score__right">
                <div className="score__stars">
                  {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                </div>
                <div className="score__label">{reviews.length} reviews</div>
              </div>
            </div>
          </div>

          {/* Display grid */}
          <div className="reviews__display__grid">
            {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>

          {/* Divider */}
          <hr className="reviews__divider" />

          {/* Add review form */}
          <div className="add__review__wrap">
            <h3 className="add__review__heading">Share Your Experience</h3>
            <p className="add__review__sub">Had a visit? Tell others what you thought — honest reviews help us grow.</p>

            <form className="add__review__form" onSubmit={handleReviewSubmit}>

              <div className="add__review__row">
                <div className="add__review__field">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Anjali Verma"
                    value={newReview.name}
                    onChange={handleReviewChange}
                  />
                </div>
                <div className="add__review__field">
                  <label>Your Area</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Vaishali Nagar"
                    value={newReview.location}
                    onChange={handleReviewChange}
                  />
                </div>
              </div>

              <div className="add__review__row">
                <div className="add__review__field">
                  <label>What did you try? *</label>
                  <select
                    name="dish"
                    value={newReview.dish}
                    onChange={handleReviewChange}
                  >
                    <option value="">Select a dish…</option>
                    <option value="Cinnamon Roll">Cinnamon Roll</option>
                    <option value="Chocolate Croissant">Chocolate Croissant</option>
                    <option value="Chocolate Fudge">Chocolate Fudge</option>
                    <option value="Chocolate Mousse">Chocolate Mousse</option>
                    <option value="General">General Experience</option>
                  </select>
                </div>
                <div className="add__review__field">
                  <label>Your Rating *</label>
                  <StarPicker
                    value={newReview.rating}
                    onChange={(val) => setNewReview(prev => ({ ...prev, rating: val }))}
                  />
                </div>
              </div>

              <div className="add__review__field">
                <label>Your Review *</label>
                <textarea
                  name="text"
                  placeholder="Tell us about your experience — what did you love? What could be better?"
                  value={newReview.text}
                  onChange={handleReviewChange}
                />
              </div>

              <div className="add__review__submit__row">
                <p className="add__review__note">Your review will appear instantly on this page.</p>
                <button className="btn" type="submit" disabled={reviewSubmitting}>
                  {reviewSubmitting ? 'Posting…' : 'Post Review'}
                </button>
              </div>

              <div className={`review__toast${showToast ? ' visible' : ''}`}>
                Thank you! Your review has been posted.
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="section__container contact__container" id="contactus">
        <div className="contact__grid">
          <div className="contact__left">
            <h2 className="section__header">Contact Us</h2>
            <div className="contact__info">
              <p><b>Email:</b> cafejaipur@gmail.com</p>
              <span>The best way to get a faster response.</span>
            </div>
            <div className="contact__info">
              <p><b>Call Us:</b> +91 9602913258</p>
              <span>Available Mon–Sun, 9am to 10pm</span>
            </div>
            <h2 className="section__header">Locate Us</h2>
            <div className="contact__address">
              Pastry World – Cafe of Pastry<br />
              Skit Gate No.2, HighStreet Mall,<br />
              Jagatpura, Jaipur, Rajasthan 302017
            </div>
          </div>

          <div className="contact__right">
            <h3>Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="section__container footer__container">
          <div className="footer__col">
            <a href="#home" className="footer__logo">
              <img src={logo} alt="Pastry World Logo" />
            </a>
          </div>
          <div className="footer__col">
            <h4>Blogs</h4>
            <ul className="footer__links">
              <li><a href="/">Perfect Pastry</a></li>
              <li><a href="/">Coffee &amp; Pastry</a></li>
              <li><a href="/">Pastry Chefs</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>New Items</h4>
            <ul className="footer__links">
              <li><a href="#menu">Menu</a></li>
              <li><a href="#menu">Specials</a></li>
              <li><a href="#reviews">Customer Reviews</a></li>
              <li><a href="#home">Workshops</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Social Media</h4>
            <ul className="footer__links">
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bar">© 2025 Pastry World. All rights reserved.</div>
      </footer>

    </div>
  );
}

export default App;
