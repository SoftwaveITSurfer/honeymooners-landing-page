/* =====================================================
   HONEYMOONERS LANDING PAGE — JAVASCRIPT
   ===================================================== */

(function () {
  'use strict';

  /* ---------- Navbar scroll ---------- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---------- Hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');

    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      /* Close all others */
      faqItems.forEach(other => {
        if (other !== item) {
          other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-a').setAttribute('hidden', '');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });

      /* Toggle current */
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        ans.setAttribute('hidden', '');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        ans.removeAttribute('hidden');
      }
    });
  });

  /* ---------- Live countdown in hero phone mockup ---------- */
  function updateHeroCountdown() {
    /* Target date: 127 days from now — demonstrates the feature */
    const now    = new Date();
    const target = new Date(now.getTime() + 127 * 24 * 60 * 60 * 1000);

    function tick() {
      const diff = target - new Date();
      if (diff <= 0) return;

      const d  = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s  = Math.floor((diff % (1000 * 60)) / 1000);

      const dEl = document.getElementById('days');
      const hEl = document.getElementById('hours');
      const mEl = document.getElementById('mins');
      const sEl = document.getElementById('secs');

      if (dEl) dEl.textContent = String(d).padStart(2, '0');
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
  }

  updateHeroCountdown();

  /* ---------- Language switcher ---------- */
  const translations = {
    en: {
      'nav.features': 'Features', 'nav.how-it-works': 'How It Works', 'nav.reviews': 'Reviews',
      'nav.pricing': 'Pricing', 'nav.faq': 'FAQ', 'nav.cta': 'Get Started',
      'hero.badge': 'The #1 Wedding Planning App',
      'hero.title': 'Your Perfect Wedding,<br /><span class="script">Planned Together</span>',
      'hero.subtitle': 'Love requires patience — and the right tools. Honeymooners brings everything you need to plan your dream wedding into one beautiful, effortless experience.',
      'hero.cta-primary': 'Start Planning Free',
      'hero.cta-secondary': '<span class="play-icon">▶</span> See How It Works',
      'hero.stat1-label': 'Couples', 'hero.stat2-label': 'Weddings Planned', 'hero.stat3-label': 'App Rating',
      'hero.float1': '124 guests confirmed!', 'hero.float2': 'Venue booked ✓',
      'trust.label': 'Trusted by couples from',
      'features.tag': 'Features',
      'features.title': 'Everything You Need to Plan<br /><span class="script">Your Dream Wedding</span>',
      'features.subtitle': 'From the first idea to the last dance, Honeymooners has every tool you need to make your special day unforgettable.',
      'features.f1.title': 'Wedding Countdown', 'features.f1.desc': 'A live, real-time countdown to your big day — days, hours, minutes, and seconds. Stay excited and on track every single morning.',
      'features.f2.title': 'Guest Management', 'features.f2.desc': 'Manage your entire guest list with ease. Track RSVPs, dietary needs, seating arrangements, and invitations — all in one place.',
      'features.f3.title': 'Venue &amp; Church', 'features.f3.desc': 'Browse stunning venues and churches, compare options side by side, and book your perfect ceremony and reception locations.',
      'features.f4.title': 'Budget Tracker', 'features.f4.desc': 'Stay on top of every expense with a real-time budget dashboard. Allocate spending by category and never go over budget again.',
      'features.f5.title': 'Smart Checklists', 'features.f5.desc': 'Guided, customizable wedding checklists take you through every planning step — so nothing important ever falls through the cracks.',
      'features.f6.title': 'Service Providers', 'features.f6.desc': 'Discover and book trusted photographers, caterers, florists, and DJs — all vetted and ready to make your day absolutely magical.',
      'hiw.tag': 'How It Works',
      'hiw.title': 'Get Started in<br /><span class="script">Three Simple Steps</span>',
      'hiw.subtitle': 'Planning your wedding has never been this easy. Join thousands of happy couples in minutes.',
      'hiw.s1.title': 'Create Your Wedding', 'hiw.s1.desc': 'Sign up and set your wedding date in seconds. Add your partner and let Honeymooners tailor the experience just for you.',
      'hiw.s2.title': 'Plan Together', 'hiw.s2.desc': 'Invite your partner, family, or coordinator. Collaborate in real-time on guests, venues, budgets, and tasks from any device.',
      'hiw.s3.title': 'Celebrate Your Day', 'hiw.s3.desc': 'Walk down the aisle stress-free, knowing every detail is handled. Focus on love — we\'ve handled the rest.',
      'preview.tag': 'Designed with Love',
      'preview.title': 'Beautiful, <span class="script">Thoughtful Design</span>',
      'preview.desc': 'Honeymooners blends elegant aesthetics with effortless usability. From the soft dusty rose palette to smooth animations — every detail is crafted for couples who deserve the best.',
      'preview.f1': 'Light &amp; dark mode support', 'preview.f2': 'English, Greek &amp; Cypriot languages',
      'preview.f3': 'Native iOS &amp; Android apps', 'preview.f4': 'Private &amp; secure — your data stays yours',
      'preview.f5': 'Syncs instantly across all your devices', 'preview.cta': 'Download the App',
      'testimonials.tag': 'Testimonials',
      'testimonials.title': 'Loved by<br /><span class="script">Couples Everywhere</span>',
      'testimonials.subtitle': 'Don\'t just take our word for it — hear from couples who planned their perfect day with Honeymooners.',
      'testimonials.t1.quote': '"Honeymooners made planning our wedding an absolute joy. The countdown timer alone kept us motivated every single day. We couldn\'t imagine doing this without it!"',
      'testimonials.t1.name': 'Sophia &amp; Andreas', 'testimonials.t1.detail': 'Married in Athens · June 2025',
      'testimonials.t2.badge': '⭐ Featured Review',
      'testimonials.t2.quote': '"We managed 250 guests, two venues, and a tight budget — all stress-free thanks to Honeymooners. The guest management is phenomenal. Our wedding was absolutely perfect."',
      'testimonials.t2.name': 'Elena &amp; Nikos', 'testimonials.t2.detail': 'Married in Thessaloniki · September 2025',
      'testimonials.t3.quote': '"The budget tracker saved us thousands. We could see exactly where money was going and make smart decisions in real time. Beautiful app, beautiful wedding."',
      'testimonials.t3.name': 'Maria &amp; Dimitris', 'testimonials.t3.detail': 'Married in Santorini · May 2025',
      'pricing.tag': 'Pricing',
      'pricing.title': 'Simple,<br /><span class="script">Transparent Pricing</span>',
      'pricing.subtitle': 'Start free and upgrade only when you need more. No hidden fees, no surprises.',
      'pricing.free.name': 'Free', 'pricing.free.desc': 'Everything to get started', 'pricing.free.period': 'forever',
      'pricing.free.f1': 'Wedding countdown timer', 'pricing.free.f2': 'Up to 50 guests',
      'pricing.free.f3': 'Basic checklists', 'pricing.free.f4': 'Venue browsing',
      'pricing.free.f5': 'Basic budget tracking', 'pricing.free.f6': 'Unlimited guests',
      'pricing.free.f7': 'Premium venues &amp; churches', 'pricing.free.f8': 'Collaborative planning',
      'pricing.free.f9': 'Priority support', 'pricing.free.cta': 'Get Started Free',
      'pricing.premium.badge': 'Most Popular', 'pricing.premium.name': 'Premium',
      'pricing.premium.desc': 'For the perfect wedding', 'pricing.premium.period': '/ month',
      'pricing.premium.f1': 'Everything in Free', 'pricing.premium.f2': 'Unlimited guests',
      'pricing.premium.f3': 'Advanced checklists', 'pricing.premium.f4': 'Premium venues &amp; churches',
      'pricing.premium.f5': 'Advanced budget analytics', 'pricing.premium.f6': 'Service provider booking',
      'pricing.premium.f7': 'Collaborative planning', 'pricing.premium.f8': 'Priority support',
      'pricing.premium.f9': 'Offline access', 'pricing.premium.cta': 'Start Free Trial',
      'pricing.premium.note': '14-day free trial · Cancel anytime',
      'faq.tag': 'FAQ',
      'faq.title': 'Frequently Asked<br /><span class="script">Questions</span>',
      'faq.q1': 'Is Honeymooners available on both iOS and Android?',
      'faq.a1': 'Yes! Honeymooners is available on both iOS (App Store) and Android (Google Play). You and your partner can use it seamlessly across different devices and platforms.',
      'faq.q2': 'Can my partner and I use it together?',
      'faq.a2': 'Absolutely! Honeymooners is built for couples. Invite your partner and collaborate on every aspect of your wedding in real-time — any device, any time.',
      'faq.q3': 'Is my personal data safe and private?',
      'faq.a3': 'Your privacy is our top priority. All data is end-to-end encrypted and stored securely. We never sell your personal information to third parties — ever.',
      'faq.q4': 'Can I use Honeymooners in Greek?',
      'faq.a4': 'Yes! Honeymooners fully supports English, Greek, and Cypriot Greek. Switch languages at any time from the Settings screen — no reinstall needed.',
      'faq.q5': 'How do I cancel my Premium subscription?',
      'faq.a5': 'You can cancel anytime from the app settings or through your App Store / Google Play subscription management. No questions asked, no hassle.',
      'faq.q6': 'What happens to my data after I cancel?',
      'faq.a6': 'Your wedding data remains accessible on the Free plan after cancellation. We\'ll never delete your information without giving you ample time to export it first.',
      'faq.q7': 'Does it work offline?',
      'faq.a7': 'Premium subscribers enjoy offline access to their wedding data. Your checklists, guest list, and notes are always available — even without internet connection.',
      'download.title': 'Start Planning Your<br /><span class="script">Dream Wedding Today</span>',
      'download.subtitle': 'Join 10,000+ couples who chose Honeymooners. Free to download on iOS and Android.',
      'download.store1-sub': 'Download on the', 'download.store1-name': 'App Store',
      'download.store2-sub': 'Get it on', 'download.store2-name': 'Google Play',
      'download.note': 'Free to download · No credit card required · Cancel Premium anytime',
      'footer.tagline': 'Love requires patience — and the right tools. Plan your perfect day with Honeymooners.',
      'footer.product': 'Product', 'footer.features': 'Features', 'footer.pricing': 'Pricing',
      'footer.download': 'Download', 'footer.changelog': 'Changelog', 'footer.company': 'Company',
      'footer.about': 'About Us', 'footer.blog': 'Blog', 'footer.careers': 'Careers', 'footer.press': 'Press',
      'footer.support': 'Support', 'footer.faq': 'FAQ', 'footer.help': 'Help Center',
      'footer.contact': 'Contact Us', 'footer.community': 'Community', 'footer.legal': 'Legal',
      'footer.privacy': 'Privacy Policy', 'footer.terms': 'Terms of Service',
      'footer.cookies': 'Cookie Policy', 'footer.gdpr': 'GDPR',
      'footer.copy': '© 2026 Honeymooners. All rights reserved. Made with ❤️ for couples everywhere.',
      'footer.script': 'Love requires patience',
      'app.countdown-label': 'Your Big Day In',
      'app.days': 'days', 'app.hrs': 'hrs', 'app.mins': 'min', 'app.secs': 'sec',
      'app.guests': 'Guests', 'app.venue': 'Venue', 'app.budget': 'Budget', 'app.tasks': 'Tasks',
      'app.progress-label': 'Planning Progress', 'app.mini-guests': 'Guest List',
      'app.guests-stat': '124 confirmed · 8 pending', 'app.mini-budget': 'Budget Overview',
      'app.budget-total': 'Total', 'app.budget-venue': 'Venue', 'app.budget-catering': 'Catering',
      'app.budget-flowers': 'Flowers', 'app.budget-photo': 'Photo', 'app.budget-remaining': '€5,580 remaining',
      'cookie.text': 'We use cookies to improve your experience and analyse site usage. By clicking "Accept All" you consent to our use of cookies.',
      'cookie.link': 'Cookie Policy', 'cookie.accept': 'Accept All', 'cookie.reject': 'Reject',
    },
    gr: {
      'nav.features': 'Χαρακτηριστικά', 'nav.how-it-works': 'Πώς Λειτουργεί', 'nav.reviews': 'Κριτικές',
      'nav.pricing': 'Τιμές', 'nav.faq': 'Ερωτήσεις', 'nav.cta': 'Ξεκινήστε',
      'hero.badge': 'Η #1 Εφαρμογή Οργάνωσης Γάμου',
      'hero.title': 'Ο Τέλειος Γάμος Σας,<br /><span class="script">Σχεδιάστε Μαζί</span>',
      'hero.subtitle': 'Η αγάπη απαιτεί υπομονή — και την κατάλληλη εφαρμογή. Το Honeymooners συγκεντρώνει όλα όσα χρειάζεστε για τον γάμο των ονείρων σας σε μια όμορφη, αβίαστη εμπειρία.',
      'hero.cta-primary': 'Ξεκινήστε Δωρεάν',
      'hero.cta-secondary': '<span class="play-icon">▶</span> Δείτε Πώς Λειτουργεί',
      'hero.stat1-label': 'Ζευγάρια', 'hero.stat2-label': 'Γάμοι Οργανώθηκαν', 'hero.stat3-label': 'Βαθμολογία',
      'hero.float1': '124 καλεσμένοι επιβεβαιώθηκαν!', 'hero.float2': 'Χώρος κλεισμένος ✓',
      'trust.label': 'Εμπιστεύονται ζευγάρια από',
      'features.tag': 'Χαρακτηριστικά',
      'features.title': 'Όλα Όσα Χρειάζεστε για<br /><span class="script">τον Γάμο των Ονείρων Σας</span>',
      'features.subtitle': 'Από την πρώτη ιδέα μέχρι τον τελευταίο χορό, το Honeymooners έχει κάθε εργαλείο που χρειάζεστε για να κάνετε την ξεχωριστή μέρα σας αξέχαστη.',
      'features.f1.title': 'Αντίστροφη Μέτρηση', 'features.f1.desc': 'Ζωντανή, πραγματικού χρόνου αντίστροφη μέτρηση για τη μεγάλη μέρα σας — μέρες, ώρες, λεπτά και δευτερόλεπτα. Μείνετε ενθουσιασμένοι κάθε πρωί.',
      'features.f2.title': 'Διαχείριση Καλεσμένων', 'features.f2.desc': 'Διαχειριστείτε ολόκληρη τη λίστα καλεσμένων σας εύκολα. Παρακολουθήστε RSVP, διατροφικές ανάγκες, διάταξη θέσεων και προσκλήσεις — όλα σε ένα μέρος.',
      'features.f3.title': 'Χώρος &amp; Εκκλησία', 'features.f3.desc': 'Περιηγηθείτε σε εκπληκτικούς χώρους και εκκλησίες, συγκρίνετε επιλογές δίπλα-δίπλα, και κλείστε τους τέλειους χώρους για την τελετή και τη δεξίωσή σας.',
      'features.f4.title': 'Παρακολούθηση Προϋπολογισμού', 'features.f4.desc': 'Ακολουθήστε κάθε έξοδο με ταμπλό προϋπολογισμού πραγματικού χρόνου. Κατανείμετε δαπάνες ανά κατηγορία και μην υπερβαίνετε ποτέ τον προϋπολογισμό.',
      'features.f5.title': 'Έξυπνες Λίστες', 'features.f5.desc': 'Καθοδηγούμενες, προσαρμόσιμες λίστες γάμου σας οδηγούν σε κάθε βήμα σχεδιασμού — ώστε τίποτα σημαντικό να μην ξεχαστεί.',
      'features.f6.title': 'Πάροχοι Υπηρεσιών', 'features.f6.desc': 'Ανακαλύψτε και κλείστε αξιόπιστους φωτογράφους, catering, ανθοπώλες και DJ — όλοι ελεγμένοι και έτοιμοι να κάνουν τη μέρα σας μαγική.',
      'hiw.tag': 'Πώς Λειτουργεί',
      'hiw.title': 'Ξεκινήστε σε<br /><span class="script">Τρία Απλά Βήματα</span>',
      'hiw.subtitle': 'Ποτέ δεν ήταν τόσο εύκολο να οργανώσετε τον γάμο σας. Γίνετε μέλος χιλιάδων ευτυχισμένων ζευγαριών σε λίγα λεπτά.',
      'hiw.s1.title': 'Δημιουργήστε τον Γάμο Σας', 'hiw.s1.desc': 'Εγγραφείτε και ορίστε την ημερομηνία του γάμου σας σε δευτερόλεπτα. Προσθέστε τον/την σύντροφό σας και αφήστε το Honeymooners να προσαρμόσει την εμπειρία για εσάς.',
      'hiw.s2.title': 'Σχεδιάστε Μαζί', 'hiw.s2.desc': 'Καλέστε τον/την σύντροφό σας, την οικογένειά σας ή τον/την συντονιστή. Συνεργαστείτε σε πραγματικό χρόνο για καλεσμένους, χώρους, προϋπολογισμούς και εργασίες.',
      'hiw.s3.title': 'Γιορτάστε την Ημέρα Σας', 'hiw.s3.desc': 'Περπατήστε στον διάδρομο χωρίς άγχος, γνωρίζοντας ότι κάθε λεπτομέρεια έχει φροντιστεί. Εστιάστε στην αγάπη — εμείς φροντίσαμε τα υπόλοιπα.',
      'preview.tag': 'Σχεδιασμένο με Αγάπη',
      'preview.title': 'Όμορφος, <span class="script">Στοχαστικός Σχεδιασμός</span>',
      'preview.desc': 'Το Honeymooners συνδυάζει κομψή αισθητική με αβίαστη χρηστικότητα. Από την παλ ροζ παλέτα μέχρι τα ομαλά animations — κάθε λεπτομέρεια έχει φτιαχτεί για ζευγάρια που αξίζουν το καλύτερο.',
      'preview.f1': 'Υποστήριξη φωτεινής &amp; σκοτεινής λειτουργίας', 'preview.f2': 'Αγγλικά, Ελληνικά &amp; Κυπριακά',
      'preview.f3': 'Εφαρμογές για iOS &amp; Android', 'preview.f4': 'Ιδιωτικό &amp; ασφαλές — τα δεδομένα σας παραμένουν δικά σας',
      'preview.f5': 'Συγχρονίζεται αμέσως σε όλες τις συσκευές σας', 'preview.cta': 'Κατεβάστε την Εφαρμογή',
      'testimonials.tag': 'Κριτικές',
      'testimonials.title': 'Αγαπημένο από<br /><span class="script">Ζευγάρια Παντού</span>',
      'testimonials.subtitle': 'Μην πιστεύετε μόνο τα λόγια μας — ακούστε ζευγάρια που σχεδίασαν την τέλεια μέρα τους με το Honeymooners.',
      'testimonials.t1.quote': '"Το Honeymooners έκανε τον σχεδιασμό του γάμου μας απόλυτα χαρούμενο. Ο χρονόμετρος αντίστροφης μέτρησης μόνο μας κρατούσε κινητοποιημένους κάθε μέρα. Δεν μπορούσαμε να φανταστούμε να το κάνουμε χωρίς αυτό!"',
      'testimonials.t1.name': 'Σοφία &amp; Ανδρέας', 'testimonials.t1.detail': 'Παντρεύτηκαν στην Αθήνα · Ιούνιος 2025',
      'testimonials.t2.badge': '⭐ Επιλεγμένη Κριτική',
      'testimonials.t2.quote': '"Διαχειριστήκαμε 250 καλεσμένους, δύο χώρους και στενό προϋπολογισμό — όλα χωρίς άγχος χάρη στο Honeymooners. Η διαχείριση καλεσμένων είναι φαινομενική. Ο γάμος μας ήταν απολύτως τέλειος."',
      'testimonials.t2.name': 'Ελένη &amp; Νίκος', 'testimonials.t2.detail': 'Παντρεύτηκαν στη Θεσσαλονίκη · Σεπτέμβριος 2025',
      'testimonials.t3.quote': '"Η παρακολούθηση προϋπολογισμού μας έσωσε χιλιάδες. Μπορούσαμε να δούμε ακριβώς πού πήγαιναν τα χρήματα και να λάβουμε έξυπνες αποφάσεις σε πραγματικό χρόνο. Όμορφη εφαρμογή, όμορφος γάμος."',
      'testimonials.t3.name': 'Μαρία &amp; Δημήτρης', 'testimonials.t3.detail': 'Παντρεύτηκαν στη Σαντορίνη · Μάιος 2025',
      'pricing.tag': 'Τιμές',
      'pricing.title': 'Απλές,<br /><span class="script">Διαφανείς Τιμές</span>',
      'pricing.subtitle': 'Ξεκινήστε δωρεάν και αναβαθμίστε μόνο όταν χρειάζεστε περισσότερα. Χωρίς κρυφές χρεώσεις, χωρίς εκπλήξεις.',
      'pricing.free.name': 'Δωρεάν', 'pricing.free.desc': 'Όλα για να ξεκινήσετε', 'pricing.free.period': 'για πάντα',
      'pricing.free.f1': 'Αντίστροφη μέτρηση γάμου', 'pricing.free.f2': 'Έως 50 καλεσμένοι',
      'pricing.free.f3': 'Βασικές λίστες', 'pricing.free.f4': 'Περιήγηση χώρων',
      'pricing.free.f5': 'Βασική παρακολούθηση προϋπολογισμού', 'pricing.free.f6': 'Απεριόριστοι καλεσμένοι',
      'pricing.free.f7': 'Premium χώροι &amp; εκκλησίες', 'pricing.free.f8': 'Συνεργατική οργάνωση',
      'pricing.free.f9': 'Υποστήριξη προτεραιότητας', 'pricing.free.cta': 'Ξεκινήστε Δωρεάν',
      'pricing.premium.badge': 'Πιο Δημοφιλές', 'pricing.premium.name': 'Premium',
      'pricing.premium.desc': 'Για τον τέλειο γάμο', 'pricing.premium.period': '/ μήνα',
      'pricing.premium.f1': 'Όλα του Δωρεάν', 'pricing.premium.f2': 'Απεριόριστοι καλεσμένοι',
      'pricing.premium.f3': 'Προηγμένες λίστες', 'pricing.premium.f4': 'Premium χώροι &amp; εκκλησίες',
      'pricing.premium.f5': 'Προηγμένα αναλυτικά προϋπολογισμού', 'pricing.premium.f6': 'Κράτηση παρόχων υπηρεσιών',
      'pricing.premium.f7': 'Συνεργατική οργάνωση', 'pricing.premium.f8': 'Υποστήριξη προτεραιότητας',
      'pricing.premium.f9': 'Πρόσβαση εκτός σύνδεσης', 'pricing.premium.cta': 'Έναρξη Δωρεάν Δοκιμής',
      'pricing.premium.note': '14 ημέρες δωρεάν δοκιμή · Ακύρωση ανά πάσα στιγμή',
      'faq.tag': 'Ερωτήσεις',
      'faq.title': 'Συχνές<br /><span class="script">Ερωτήσεις</span>',
      'faq.q1': 'Είναι διαθέσιμο το Honeymooners σε iOS και Android;',
      'faq.a1': 'Ναι! Το Honeymooners είναι διαθέσιμο τόσο στο iOS (App Store) όσο και στο Android (Google Play). Εσείς και ο/η σύντροφός σας μπορείτε να το χρησιμοποιήσετε απρόσκοπτα σε διαφορετικές συσκευές.',
      'faq.q2': 'Μπορώ να το χρησιμοποιήσω μαζί με τον/την σύντροφό μου;',
      'faq.a2': 'Απολύτως! Το Honeymooners είναι φτιαγμένο για ζευγάρια. Καλέστε τον/την σύντροφό σας και συνεργαστείτε σε κάθε πτυχή του γάμου σας σε πραγματικό χρόνο — οποιαδήποτε συσκευή, οποιαδήποτε στιγμή.',
      'faq.q3': 'Είναι ασφαλή και ιδιωτικά τα προσωπικά μου δεδομένα;',
      'faq.a3': 'Η ιδιωτικότητά σας είναι η κορυφαία μας προτεραιότητα. Όλα τα δεδομένα είναι κρυπτογραφημένα και αποθηκεύονται με ασφάλεια. Ποτέ δεν πουλάμε τα προσωπικά σας στοιχεία σε τρίτους — ποτέ.',
      'faq.q4': 'Μπορώ να χρησιμοποιήσω το Honeymooners στα Ελληνικά;',
      'faq.a4': 'Ναι! Το Honeymooners υποστηρίζει πλήρως Αγγλικά, Ελληνικά και Κυπριακά. Αλλάξτε γλώσσα ανά πάσα στιγμή από τις Ρυθμίσεις — δεν απαιτείται επανεγκατάσταση.',
      'faq.q5': 'Πώς μπορώ να ακυρώσω τη συνδρομή Premium;',
      'faq.a5': 'Μπορείτε να ακυρώσετε ανά πάσα στιγμή από τις ρυθμίσεις της εφαρμογής ή μέσω της διαχείρισης συνδρομών του App Store / Google Play. Χωρίς ερωτήσεις, χωρίς ταλαιπωρία.',
      'faq.q6': 'Τι γίνεται με τα δεδομένα μου μετά την ακύρωση;',
      'faq.a6': 'Τα δεδομένα γάμου σας παραμένουν προσβάσιμα στο πλάνο Δωρεάν μετά την ακύρωση. Δεν θα διαγράψουμε ποτέ τις πληροφορίες σας χωρίς να σας δώσουμε αρκετό χρόνο να τις εξαγάγετε πρώτα.',
      'faq.q7': 'Λειτουργεί εκτός σύνδεσης;',
      'faq.a7': 'Οι συνδρομητές Premium απολαμβάνουν πρόσβαση εκτός σύνδεσης στα δεδομένα γάμου τους. Οι λίστες, η λίστα καλεσμένων και οι σημειώσεις σας είναι πάντα διαθέσιμα — ακόμα και χωρίς σύνδεση.',
      'download.title': 'Ξεκινήστε να Σχεδιάζετε τον<br /><span class="script">Γάμο των Ονείρων Σας Σήμερα</span>',
      'download.subtitle': 'Γίνετε μέλος 10.000+ ζευγαριών που επέλεξαν το Honeymooners. Δωρεάν λήψη σε iOS και Android.',
      'download.store1-sub': 'Κατεβάστε στο', 'download.store1-name': 'App Store',
      'download.store2-sub': 'Βρείτε το στο', 'download.store2-name': 'Google Play',
      'download.note': 'Δωρεάν λήψη · Δεν απαιτείται πιστωτική κάρτα · Ακύρωση Premium ανά πάσα στιγμή',
      'footer.tagline': 'Η αγάπη απαιτεί υπομονή — και τα κατάλληλα εργαλεία. Σχεδιάστε την τέλεια μέρα σας με το Honeymooners.',
      'footer.product': 'Προϊόν', 'footer.features': 'Χαρακτηριστικά', 'footer.pricing': 'Τιμές',
      'footer.download': 'Λήψη', 'footer.changelog': 'Ιστορικό Αλλαγών', 'footer.company': 'Εταιρεία',
      'footer.about': 'Σχετικά με εμάς', 'footer.blog': 'Blog', 'footer.careers': 'Καριέρα', 'footer.press': 'Τύπος',
      'footer.support': 'Υποστήριξη', 'footer.faq': 'Συχνές Ερωτήσεις', 'footer.help': 'Κέντρο Βοήθειας',
      'footer.contact': 'Επικοινωνία', 'footer.community': 'Κοινότητα', 'footer.legal': 'Νομικά',
      'footer.privacy': 'Πολιτική Απορρήτου', 'footer.terms': 'Όροι Χρήσης',
      'footer.cookies': 'Πολιτική Cookies', 'footer.gdpr': 'GDPR',
      'footer.copy': '© 2026 Honeymooners. Με επιφύλαξη παντός δικαιώματος. Φτιαγμένο με ❤️ για ζευγάρια παντού.',
      'footer.script': 'Η αγάπη απαιτεί υπομονή',
      'app.countdown-label': 'Η Μεγάλη Μέρα Σε',
      'app.days': 'μέρες', 'app.hrs': 'ώρες', 'app.mins': 'λεπτά', 'app.secs': 'δευτ',
      'app.guests': 'Καλεσμένοι', 'app.venue': 'Χώρος', 'app.budget': 'Προϋπολογισμός', 'app.tasks': 'Εργασίες',
      'app.progress-label': 'Πρόοδος Οργάνωσης', 'app.mini-guests': 'Λίστα Καλεσμένων',
      'app.guests-stat': '124 επιβεβαιώθηκαν · 8 σε αναμονή', 'app.mini-budget': 'Επισκόπηση Προϋπολογισμού',
      'app.budget-total': 'Σύνολο', 'app.budget-venue': 'Χώρος', 'app.budget-catering': 'Catering',
      'app.budget-flowers': 'Λουλούδια', 'app.budget-photo': 'Φωτογράφος', 'app.budget-remaining': '€5.580 υπόλοιπο',
      'cookie.text': 'Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας και να αναλύσουμε τη χρήση της ιστοσελίδας. Κάνοντας κλικ στο "Αποδοχή Όλων" συναινείτε στη χρήση cookies.',
      'cookie.link': 'Πολιτική Cookies', 'cookie.accept': 'Αποδοχή Όλων', 'cookie.reject': 'Απόρριψη',
    }
  };

  const pageTitles = {
    en: 'Honeymooners – Plan Your Perfect Wedding Together',
    gr: 'Honeymooners – Σχεδιάστε τον Τέλειο Γάμο Μαζί'
  };

  let currentLang = localStorage.getItem('hm-lang') || 'gr';

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('hm-lang', lang);
    document.documentElement.lang = lang === 'gr' ? 'el' : 'en';
    document.title = pageTitles[lang];

    const t = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.getElementById('lang-en').classList.toggle('active', lang === 'en');
    document.getElementById('lang-gr').classList.toggle('active', lang === 'gr');
  }

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      applyLang(currentLang === 'en' ? 'gr' : 'en');
    });
  }

  applyLang(currentLang);

  /* ---------- Cookie consent ---------- */
  const cookieBanner = document.getElementById('cookie-banner');
  if (cookieBanner && !localStorage.getItem('hm-cookie-consent')) {
    setTimeout(() => cookieBanner.classList.add('visible'), 800);
  }

  function dismissCookie(choice) {
    localStorage.setItem('hm-cookie-consent', choice);
    cookieBanner.classList.remove('visible');
  }

  const cookieAccept = document.getElementById('cookie-accept');
  const cookieReject = document.getElementById('cookie-reject');
  if (cookieAccept) cookieAccept.addEventListener('click', () => dismissCookie('accepted'));
  if (cookieReject) cookieReject.addEventListener('click', () => dismissCookie('rejected'));

  /* ---------- Add stagger delay to feature cards ---------- */
  document.querySelectorAll('.features-grid .reveal').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - navbar.offsetHeight - 80;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });

    navAnchors.forEach(a => {
      a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--rose)' : '';
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ---------- Animate number counters on first view ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      countersStarted = true;
      statNumbers.forEach(el => {
        const raw    = el.textContent;
        const num    = parseFloat(raw.replace(/[^\d.]/g, ''));
        const suffix = raw.replace(/[\d.]/g, '');
        const dur    = 1200;
        const step   = 16;
        const steps  = dur / step;
        let current  = 0;
        const inc    = num / steps;

        const timer = setInterval(() => {
          current = Math.min(current + inc, num);
          const display = Number.isInteger(num) ? Math.round(current) : current.toFixed(1);
          el.textContent = display + suffix;
          if (current >= num) clearInterval(timer);
        }, step);
      });
    }
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters();

})();
