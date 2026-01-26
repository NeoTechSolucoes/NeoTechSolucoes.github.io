// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    // Animate hamburger icon
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ============================================

const sections = document.querySelectorAll('.section');
const navLinksArray = document.querySelectorAll('.nav-link');

function setActiveNavLink() {
  let current = '';
  const scrollPosition = window.pageYOffset + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = sectionId;
    }
  });

  navLinksArray.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveNavLink);

// ============================================
// FORM HANDLING
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      telefone: document.getElementById('telefone').value,
      assunto: document.getElementById('assunto').value,
      mensagem: document.getElementById('mensagem').value
    };

    // Validate form
    if (validateForm(formData)) {
      // Show success message
      showFormMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

      // Reset form
      contactForm.reset();

      // In a real application, you would send the data to a server here
      // Example: sendToServer(formData);
    }
  });
}

function validateForm(data) {
  // Basic validation
  if (!data.nome || data.nome.trim() === '') {
    showFormMessage('Por favor, preencha o nome completo.', 'error');
    return false;
  }

  if (!data.email || !isValidEmail(data.email)) {
    showFormMessage('Por favor, insira um e-mail válido.', 'error');
    return false;
  }

  if (!data.telefone || data.telefone.trim() === '') {
    showFormMessage('Por favor, preencha o telefone.', 'error');
    return false;
  }

  if (!data.mensagem || data.mensagem.trim() === '') {
    showFormMessage('Por favor, preencha a mensagem.', 'error');
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFormMessage(message, type) {
  // Remove existing message if any
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.textContent = message;

  // Add styles
  messageDiv.style.padding = '1rem';
  messageDiv.style.marginTop = '1rem';
  messageDiv.style.borderRadius = '4px';
  messageDiv.style.fontWeight = '500';

  if (type === 'success') {
    messageDiv.style.background = '#d4edda';
    messageDiv.style.color = '#155724';
    messageDiv.style.border = '1px solid #c3e6cb';
  } else {
    messageDiv.style.background = '#f8d7da';
    messageDiv.style.color = '#721c24';
    messageDiv.style.border = '1px solid #f5c6cb';
  }

  // Insert message after form
  contactForm.appendChild(messageDiv);

  // Scroll to message
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Remove message after 5 seconds
  setTimeout(() => {
    messageDiv.style.opacity = '0';
    messageDiv.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      messageDiv.remove();
    }, 300);
  }, 5000);
}

// ============================================
// PHONE NUMBER MASK
// ============================================

const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
  telefoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
      if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
      e.target.value = value;
    }
  });
}

// ============================================
// ANIMATION ON SCROLL
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.area-card, .team-member, .contact-info-card');

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// ============================================
// CLOSE MOBILE MENU ON RESIZE
// ============================================

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// ============================================
// COPY ADDRESS FUNCTION
// ============================================

function copyAddress(event) {
  const address = 'Seixas Rego Advocacia Especializada\nAlameda Vicente Pizon, 144 - Conjunto 52\nVila Olímpia - São Paulo/SP - 04547-130';

  navigator.clipboard.writeText(address).then(() => {
    // Show feedback
    const button = event.target.closest('.btn-address') || event.currentTarget;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
    button.style.background = '#28a745';

    setTimeout(() => {
      button.innerHTML = originalText;
      button.style.background = '';
    }, 2000);
  }).catch(err => {
    console.error('Erro ao copiar:', err);
    alert('Erro ao copiar endereço. Por favor, copie manualmente.');
  });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Set initial active nav link
  setActiveNavLink();

  // Add fade-in animation to hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.animation = 'fadeInUp 0.8s ease forwards';
  }

  // Initialize video loop
  initHeroVideo();

  // Initialize language selector
  initLanguageSelector();
});

// ============================================
// HERO VIDEO LOOP HANDLER
// ============================================

function initHeroVideo() {
  const heroVideo = document.querySelector('.hero-video');
  if (heroVideo) {
    // Garantir que o vídeo faça loop corretamente
    heroVideo.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);

    // Garantir que o vídeo continue reproduzindo
    heroVideo.addEventListener('pause', function () {
      if (!this.ended) {
        this.play();
      }
    }, false);

    // Tentar reproduzir quando a página carregar
    heroVideo.play().catch(function (error) {
      console.log('Erro ao reproduzir vídeo:', error);
    });

    // Garantir reprodução contínua
    setInterval(function () {
      if (heroVideo.paused && !heroVideo.ended) {
        heroVideo.play();
      }
    }, 1000);
  }
}

// ============================================
// LANGUAGE SELECTOR & TRANSLATION SYSTEM
// ============================================

const translations = {
  pt: {
    // Navigation
    'nav.home': 'PÁGINA INICIAL',
    'nav.areas': 'ÁREAS DE ATUAÇÃO',
    'nav.professional': 'O PROFISSIONAL',
    'nav.contact': 'CONTATO',

    // Hero
    'hero.description': 'Há 30 anos, somos movidos pela coragem de enfrentar os temas mais sensíveis do Direito, pela técnica para solucionar questões de alta complexidade e pela convicção de que a advocacia é instrumento de transformação.',
    'btn.learnMore': 'Saiba Mais',
    'btn.contact': 'Contato',

    // Sections
    'section.who': 'Quem',
    'section.are': 'Somos',
    'section.our': 'Nossa',
    'section.history': 'História',
    'section.areas': 'Áreas de',
    'section.practice': 'Atuação',
    'section.team': 'Equipe',
    'section.speak': 'Fale',
    'section.withUs': 'Conosco',

    // Quem Somos
    'quem-somos.p1': 'Há 30 anos, somos movidos pela coragem de enfrentar os temas mais sensíveis do Direito, pela técnica para solucionar questões de alta complexidade e pela convicção de que a advocacia é instrumento de transformação.',
    'quem-somos.p2': 'Construímos nossa história com atuação sólida no Direito Criminal, Empresarial, Ambiental, Eleitoral e Administrativo, conduzindo grandes operações, casos envolvendo agentes públicos, crimes ambientais, crimes fiscais, lavagem de capitais e disputas de alto impacto regulatório e econômico.',
    'quem-somos.p3': 'Unimos estratégia e profundidade técnica para oferecer consultoria empresarial em temas sensíveis, contencioso administrativo e judicial tributário, além de forte presença no Direito Público, especialmente em licitações, permissões, concessões e PPPs.',
    'quem-somos.p4': 'Nos tribunais, nossa atuação se destaca pela precisão argumentativa e excelência em recursos, memoriais e sustentações orais, inclusive nos tribunais superiores.',
    'quem-somos.p5': 'Somos um escritório que valoriza pessoas. Nossa equipe é formada por profissionais altamente qualificados, comprometidos com estudo contínuo, ética e rigor técnico.',
    'quem-somos.p6': 'Esse é o nosso DNA: visão estratégica, excelência jurídica e a dedicação de quem, há três décadas, entrega soluções que protegem, transformam e inspiram confiança.',

    // História
    'historia.title1': 'O',
    'historia.title2': 'ESCRITÓRIO',
    'historia.p1': 'Há 30 anos, construímos uma trajetória marcada pela coragem de enfrentar os temas mais sensíveis, a técnica para resolver questões de alta complexidade e o compromisso inabalável com a defesa da legalidade. Inquietos e estratégicos, evoluímos constantemente para entregar uma advocacia moderna, inteligente e transformadora.',
    'historia.p2': 'Nascemos no Direito Criminal e ampliamos nossa atuação para o Direito Empresarial, Ambiental, Eleitoral e Administrativo, sempre com um olhar atento às demandas de uma economia dinâmica e às mudanças do Estado brasileiro. Hoje, somos referência na condução de grandes operações, crimes praticados por agentes públicos e servidores, crimes ambientais, crimes fiscais, lavagem de capitais e toda a gama do contencioso penal econômico.',
    'historia.p3': 'Nossa experiência multidisciplinar também nos posiciona como parceiros estratégicos na assessoria e consultoria empresarial, especialmente em temas sensíveis e de alto impacto regulatório, reputacional e financeiro. Atuamos de forma destacada no contencioso administrativo e judicial tributário, oferecendo respostas precisas, seguras e alinhadas ao ambiente de negócios de cada cliente.',
    'historia.p4': 'No Direito Público, nossa presença é igualmente robusta. Participamos de modelagens e estruturas jurídicas para licitações, permissões, concessões de serviços públicos e PPPs, atuando tanto na consultoria quanto no acompanhamento de todas as fases dos procedimentos. Nossa atuação reúne técnica, visão estratégica e profundo conhecimento da dinâmica estatal.',
    'historia.p5': 'Além disso, temos atuação destacada no Direito Eleitoral, oferecendo consultoria e assessoria jurídica a partidos, agentes públicos e candidatos em todas as fases do processo político-eleitoral. Atuamos em registros e impugnações de candidaturas, representações, investigações e ações eleitorais, sempre com precisão técnica e visão estratégica. Também prestamos suporte integral em compliance eleitoral e na orientação de condutas de agentes políticos, além de acompanhar de perto campanhas e atos de gestão em período eleitoral, assegurando conformidade, segurança jurídica e a proteção da legitimidade do processo democrático.',
    'historia.p6': 'Nos tribunais, nosso trabalho é reconhecido por excelência técnica, precisão argumentativa e atuação dedicada em recursos, memoriais, sustentações orais e processos nos tribunais superiores. Acreditamos que cada detalhe importa — e é exatamente essa postura que nos diferencia.',
    'historia.p7': 'Somos um escritório que valoriza pessoas. Nossa equipe é formada por profissionais altamente qualificados, comprometidos com estudo permanente, com ética e com a busca incansável por soluções jurídicas ágeis, eficientes e inovadoras.',
    'historia.p8': 'Para nós, o Direito é instrumento de impacto. É com ele que protegemos, transformamos e construímos relações de confiança duradouras. É assim que, há três décadas, seguimos lado a lado com clientes que nos confiam seus maiores desafios — oferecendo não apenas respostas, mas caminhos.',
    'historia.p9': 'Trinta anos depois, seguimos guiados pela mesma essência: rigor técnico, visão estratégica e a convicção de que a advocacia é meio de transformação.',

    // Áreas
    'areas.intro': 'Oferecemos soluções jurídicas especializadas em diversas áreas do direito, sempre com foco na excelência e resultados efetivos.',

    // Área 1
    'area1.title': 'Direito Penal / Direito Penal Econômico',
    'area1.item1': 'Crimes praticados por agentes públicos e servidores',
    'area1.item2': 'Grandes operações',
    'area1.item3': 'Crimes ambientais',
    'area1.item4': 'Crimes fiscais',
    'area1.item5': 'Lavagem de capitais',
    'area1.item6': 'Contencioso penal empresarial',

    // Área 2
    'area2.title': 'Direito Empresarial',
    'area2.item1': 'Assessoria e consultoria empresarial em temas sensíveis',
    'area2.item2': 'Apoio jurídico estratégico a empresas em decisões de alto impacto',
    'area2.item3': 'Gestão de riscos regulatórios, reputacionais e financeiros',

    // Área 3
    'area3.title': 'Direito Tributário',
    'area3.item1': 'Contencioso tributário administrativo',
    'area3.item2': 'Contencioso tributário judicial',
    'area3.item3': 'Consultoria estratégica em matéria tributária',

    // Área 4
    'area4.title': 'Direito Administrativo / Direito Público',
    'area4.item1': 'Licitações',
    'area4.item2': 'Permissões e concessões de serviços públicos',
    'area4.item3': 'Parcerias Público-Privadas (PPPs)',
    'area4.item4': 'Modelagem jurídica de projetos públicos',
    'area4.item5': 'Atuação em processos envolvendo Administração Pública',

    // Área 5
    'area5.title': 'Direito Ambiental',
    'area5.item1': 'Crimes ambientais',
    'area5.item2': 'Consultoria e defesa em matéria ambiental',
    'area5.item3': 'Atuação regulatória e sancionadora ambiental',

    // Área 6
    'area6.title': 'Direito Eleitoral',
    'area6.item1': 'Consultoria e assessoria jurídica partidária',
    'area6.item2': 'Defesa de agentes públicos e candidatos',
    'area6.item3': 'Atuação em registros e impugnação de candidaturas, representações, investigações e ações eleitorais',
    'area6.item4': 'Consultoria em compliance eleitoral e conduta de agentes políticos',
    'area6.item5': 'Acompanhamento de campanhas e atos de gestão em período eleitoral',

    // Área 7
    'area7.title': 'Tribunais Superiores e Estratégia Recursal',
    'area7.item1': 'Recursos nos tribunais superiores (STF, STJ e outros)',
    'area7.item2': 'Sustentações orais',
    'area7.item3': 'Elaboração de memoriais e atuação estratégica em casos de impacto',
    'area7.item4': 'Condução de teses e defesa em precedentes qualificados',

    // Contato
    'contato.our': 'Nossos',
    'contato.contacts': 'Contatos',
    'contato.email': 'E-mail:',
    'contato.mobile': 'Celular:',
    'contato.phone': 'Telefone:',
    'contato.ourAddress': 'Nosso',
    'contato.address': 'endereço',
    'contato.openMaps': 'Abrir no Google Maps',
    'contato.waze': 'Traçar rota no Waze',
    'contato.copy': 'Copiar endereço',
    'contato.getIn': 'Entre em',
    'contato.contact': 'contato',
    'contato.formDesc': 'Para qualquer solicitação, preencha os campos no formulário abaixo:',

    // Form
    'form.name': 'Nome completo',
    'form.namePlaceholder': 'Nome completo',
    'form.email': 'E-mail',
    'form.emailPlaceholder': 'E-mail',
    'form.phone': 'Telefone (opcional)',
    'form.phonePlaceholder': 'Telefone (opcional)',
    'form.message': 'Mensagem',
    'form.messagePlaceholder': 'Mensagem',
    'form.send': 'Enviar',

    // Footer
    'footer.navigation': 'Navegação',
    'footer.contact': 'Contato',
    'footer.social': 'Rede sociais',
    'footer.copyright': 'Todos os direitos reservados.',
  },
  en: {
    // Navigation
    'nav.home': 'HOME',
    'nav.areas': 'PRACTICE AREAS',
    'nav.professional': 'THE PROFESSIONAL',
    'nav.contact': 'CONTACT',

    // Hero
    'hero.description': 'For 30 years, we have been driven by the courage to face the most sensitive legal issues, the technical expertise to solve highly complex matters, and the conviction that law is an instrument of transformation.',
    'btn.learnMore': 'Learn More',
    'btn.contact': 'Contact',

    // Sections
    'section.who': 'Who',
    'section.are': 'We Are',
    'section.our': 'Our',
    'section.history': 'History',
    'section.areas': 'Practice',
    'section.practice': 'Areas',
    'section.team': 'Team',
    'section.speak': 'Get In',
    'section.withUs': 'Touch',

    // Quem Somos
    'quem-somos.p1': 'For 30 years, we have been driven by the courage to face the most sensitive legal issues, the technical expertise to solve highly complex matters, and the conviction that law is an instrument of transformation.',
    'quem-somos.p2': 'We have built our history with solid practice in Criminal, Corporate, Environmental, Electoral, and Administrative Law, conducting major operations, cases involving public officials, environmental crimes, tax crimes, money laundering, and high-impact regulatory and economic disputes.',
    'quem-somos.p3': 'We combine strategy and technical depth to offer corporate consulting on sensitive matters, administrative and judicial tax litigation, in addition to a strong presence in Public Law, especially in public tenders, permits, concessions, and PPPs.',
    'quem-somos.p4': 'In the courts, our practice stands out for argumentative precision and excellence in appeals, briefs, and oral arguments, including in superior courts.',
    'quem-somos.p5': 'We are a firm that values people. Our team consists of highly qualified professionals, committed to continuous learning, ethics, and technical rigor.',
    'quem-somos.p6': 'This is our DNA: strategic vision, legal excellence, and the dedication of those who, for three decades, deliver solutions that protect, transform, and inspire confidence.',

    // História
    'historia.title1': 'THE',
    'historia.title2': 'FIRM',
    'historia.p1': 'For 30 years, we have built a trajectory marked by the courage to face the most sensitive issues, the technical expertise to resolve highly complex matters, and an unwavering commitment to defending legality. Restless and strategic, we constantly evolve to deliver modern, intelligent, and transformative legal services.',
    'historia.p2': 'We were born in Criminal Law and expanded our practice to Corporate, Environmental, Electoral, and Administrative Law, always with an attentive eye to the demands of a dynamic economy and the changes in the Brazilian State. Today, we are a reference in conducting major operations, crimes committed by public officials and civil servants, environmental crimes, tax crimes, money laundering, and the full range of economic criminal litigation.',
    'historia.p3': 'Our multidisciplinary experience also positions us as strategic partners in corporate advisory and consulting, especially in sensitive matters with high regulatory, reputational, and financial impact. We excel in administrative and judicial tax litigation, offering precise, secure, and aligned responses to each client\'s business environment.',
    'historia.p4': 'In Public Law, our presence is equally robust. We participate in legal modeling and structures for public tenders, permits, public service concessions, and PPPs, acting both in consulting and monitoring all phases of procedures. Our practice combines technique, strategic vision, and deep knowledge of state dynamics.',
    'historia.p5': 'Furthermore, we have a prominent role in Electoral Law, offering legal consulting and advisory to parties, public officials, and candidates in all phases of the political-electoral process. We act in registration and challenges of candidacies, representations, investigations, and electoral actions, always with technical precision and strategic vision. We also provide comprehensive support in electoral compliance and guidance on conduct of political agents, in addition to closely monitoring campaigns and management acts during the electoral period, ensuring compliance, legal security, and protection of the legitimacy of the democratic process.',
    'historia.p6': 'In the courts, our work is recognized for technical excellence, argumentative precision, and dedicated performance in appeals, briefs, oral arguments, and proceedings in superior courts. We believe that every detail matters — and it is exactly this posture that sets us apart.',
    'historia.p7': 'We are a firm that values people. Our team consists of highly qualified professionals, committed to permanent study, ethics, and the tireless pursuit of agile, efficient, and innovative legal solutions.',
    'historia.p8': 'For us, Law is an instrument of impact. It is with it that we protect, transform, and build lasting relationships of trust. This is how, for three decades, we have walked side by side with clients who entrust us with their greatest challenges — offering not just answers, but paths.',
    'historia.p9': 'Thirty years later, we continue guided by the same essence: technical rigor, strategic vision, and the conviction that law is a means of transformation.',

    // Áreas
    'areas.intro': 'We offer specialized legal solutions in various areas of law, always focusing on excellence and effective results.',

    // Área 1
    'area1.title': 'Criminal Law / Economic Criminal Law',
    'area1.item1': 'Crimes committed by public officials and civil servants',
    'area1.item2': 'Major operations',
    'area1.item3': 'Environmental crimes',
    'area1.item4': 'Tax crimes',
    'area1.item5': 'Money laundering',
    'area1.item6': 'Corporate criminal litigation',

    // Área 2
    'area2.title': 'Corporate Law',
    'area2.item1': 'Corporate advisory and consulting on sensitive matters',
    'area2.item2': 'Strategic legal support for companies in high-impact decisions',
    'area2.item3': 'Management of regulatory, reputational, and financial risks',

    // Área 3
    'area3.title': 'Tax Law',
    'area3.item1': 'Administrative tax litigation',
    'area3.item2': 'Judicial tax litigation',
    'area3.item3': 'Strategic consulting on tax matters',

    // Área 4
    'area4.title': 'Administrative Law / Public Law',
    'area4.item1': 'Public tenders',
    'area4.item2': 'Permits and public service concessions',
    'area4.item3': 'Public-Private Partnerships (PPPs)',
    'area4.item4': 'Legal modeling of public projects',
    'area4.item5': 'Practice in proceedings involving Public Administration',

    // Área 5
    'area5.title': 'Environmental Law',
    'area5.item1': 'Environmental crimes',
    'area5.item2': 'Environmental consulting and defense',
    'area5.item3': 'Regulatory and environmental sanctioning practice',

    // Área 6
    'area6.title': 'Electoral Law',
    'area6.item1': 'Party legal consulting and advisory',
    'area6.item2': 'Defense of public officials and candidates',
    'area6.item3': 'Practice in registration and challenges of candidacies, representations, investigations, and electoral actions',
    'area6.item4': 'Electoral compliance consulting and conduct of political agents',
    'area6.item5': 'Monitoring of campaigns and management acts during the electoral period',

    // Área 7
    'area7.title': 'Superior Courts and Appellate Strategy',
    'area7.item1': 'Appeals in superior courts (STF, STJ, and others)',
    'area7.item2': 'Oral arguments',
    'area7.item3': 'Brief preparation and strategic practice in high-impact cases',
    'area7.item4': 'Thesis development and defense in qualified precedents',

    // Contato
    'contato.our': 'Our',
    'contato.contacts': 'Contacts',
    'contato.email': 'Email:',
    'contato.mobile': 'Mobile:',
    'contato.phone': 'Phone:',
    'contato.ourAddress': 'Our',
    'contato.address': 'Address',
    'contato.openMaps': 'Open in Google Maps',
    'contato.waze': 'Route on Waze',
    'contato.copy': 'Copy address',
    'contato.getIn': 'Get In',
    'contato.contact': 'Touch',
    'contato.formDesc': 'For any request, please fill in the fields in the form below:',

    // Form
    'form.name': 'Full Name',
    'form.namePlaceholder': 'Full Name',
    'form.email': 'Email',
    'form.emailPlaceholder': 'Email',
    'form.phone': 'Phone (optional)',
    'form.phonePlaceholder': 'Phone (optional)',
    'form.message': 'Message',
    'form.messagePlaceholder': 'Message',
    'form.send': 'Send',

    // Footer
    'footer.navigation': 'Navigation',
    'footer.contact': 'Contact',
    'footer.social': 'Social Networks',
    'footer.copyright': 'All rights reserved.',
  }
};

let currentLang = localStorage.getItem('language') || 'pt';

function initLanguageSelector() {
  const langButtons = document.querySelectorAll('.lang-btn');

  // Set initial active state
  langButtons.forEach(btn => {
    const lang = btn.getAttribute('data-lang');
    if (lang === currentLang) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', function () {
      const selectedLang = this.getAttribute('data-lang');
      changeLanguage(selectedLang);
    });
  });

  // Apply saved language
  applyLanguage(currentLang);
}

function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  applyLanguage(lang);

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.pt;

  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (t[key]) {
      if (element.tagName === 'INPUT' && element.type === 'submit') {
        element.value = t[key];
      } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = t[key];
      } else if (element.tagName === 'BUTTON') {
        // For buttons, check if it has child elements (like icons)
        const icon = element.querySelector('i');
        const span = element.querySelector('span');
        if (icon && span) {
          span.textContent = t[key];
        } else {
          element.textContent = t[key];
        }
      } else if (element.tagName === 'SPAN') {
        // For spans, preserve any sibling text nodes
        element.textContent = t[key];
      } else {
        element.textContent = t[key];
      }
    }
  });

  // Update document title
  if (lang === 'en') {
    document.title = 'Seixas Rego - Legal Services';
    document.documentElement.lang = 'en';
  } else {
    document.title = 'Silvio Seixas - Advocacia';
    document.documentElement.lang = 'pt-BR';
  }
}
