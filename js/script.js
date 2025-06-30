// Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Simple validation
            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);

            // Reset form
            this.reset();
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.footer-newsletter form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;

            if (!email) {
                alert('Por favor, insira seu endereço de e-mail.');
                return;
            }

            // Simple email validation
            if (!email.includes('@') || !email.includes('.')) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            alert(`Obrigado por se inscrever! Você receberá nossas novidades no e-mail ${email}.`);
            this.reset();
        });
    }
});

// Animation on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.attraction-card, .event-item, .gastronomy-content, .contact-info, .contact-form');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state
    const elementsToAnimate = document.querySelectorAll('.attraction-card, .event-item, .gastronomy-content, .contact-info, .contact-form');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run on load
    animateOnScroll();

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Current Year for Footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
});
document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('quizBtn')
    .addEventListener('click', () =>
      Swal.fire(welcomeConfig()).then(res => {
        if (res.isConfirmed) startQuiz();
      })
    );
});

function welcomeConfig() {
  return {
    title: 'Bem‑vindo ao Quiz de Turismo! 🧭',
    icon: 'question',
    confirmButtonText: 'Iniciar'
  };
}

function startQuiz() {
  Swal.fire({
    title: 'Escolha o que você quer explorar:',
    html: `
      <button data-val="atracoes">🗺️ Atrações</button>
      <button data-val="alimentacao">🍽️ Alimentação</button>
      <button data-val="hospedagem">🏨 Hospedagem</button>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    didOpen: () => attachButtons('nivel1')
  });
}

function attachButtons(nivel, categoria) {
  const container = Swal.getHtmlContainer();
  container
    .querySelectorAll('button[data-val]')
    .forEach(btn =>
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-val');
        Swal.close();
        if (nivel === 'nivel1') {
          showSubquiz(val);
        } else if (nivel === 'nivel2') {
          showResultado(categoria, val);
        }
      })
    );
}

function showSubquiz(categoria) {
  let title, opts;

  if (categoria === 'atracoes') {
    title = 'Que tipo de atrações?';
    opts = {
      arte: '🎨 Arte',
      aventura: '🚵 Aventura',
      ar_livre: '🌲 Ao ar livre',
      historicos: '⛪ Históricos & Religiosos',
      shopping: '🛍️ Shopping'
    };
  } else if (categoria === 'alimentacao') {
    title = 'Onde prefere comer?';
    opts = {
      churrascaria: '🥩 Churrascarias',
      caseira: '🏠 Comida caseira'
    };
  } else if (categoria === 'hospedagem') {
    title = 'Que tipo de hospedagem?';
    opts = {
      hoteis: '🏩 Hotéis',
      pousadas: '🏡 Pousadas'
    };
  }

  const buttonsHtml = Object.entries(opts)
    .map(([val, label]) => `<button data-val="${val}">${label}</button>`)
    .join('');

  Swal.fire({
    title,
    html: buttonsHtml,
    showConfirmButton: false,
    showCloseButton: true,
    didOpen: () => attachButtons('nivel2', categoria)
  });
}

function showResultado(categoria, escolha) {
  const labels = {
    arte: 'Arte',
    aventura: 'Aventura',
    ar_livre: 'Ao ar livre',
    historicos: 'Históricos e Religiosos',
    shopping: 'Shopping',
    churrascaria: 'Churrascarias',
    caseira: 'Comida caseira',
    hoteis: 'Hotéis',
    pousadas: 'Pousadas'
  };

  Swal.fire({
    title: '🎉 Resultado:',
    html: `
      <p><strong>Caminho:</strong> ${capitalize(categoria)}</p>
      <p><strong>Opção:</strong> ${labels[escolha]}</p>
    `,
    icon: 'success',
    confirmButtonText: 'OK'
  }).then(() => {
    // Exemplo de redirecionamento
    // window.location.href = `/resultado.html?cat=${categoria}&opt=${escolha}`;
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
