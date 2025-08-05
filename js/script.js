document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (!name || !email || !message) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);

            this.reset();
        });
    }

    const newsletterForm = document.querySelector('.footer-newsletter form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;

            if (!email) {
                alert('Por favor, insira seu endereço de e-mail.');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                alert('Por favor, insira um endereço de e-mail válido.');
                return;
            }

            alert(`Obrigado por se inscrever! Você receberá nossas novidades no e-mail ${email}.`);
            this.reset();
        });
    }
});

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

    const elementsToAnimate = document.querySelectorAll('.attraction-card, .event-item, .gastronomy-content, .contact-info, .contact-form');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    animateOnScroll();

    window.addEventListener('scroll', animateOnScroll);
});

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
    title: 'Bem‑vindo ao Quiz de Turismo Inteligente! 🧭',
    icon: 'question',
    html: '<p>Nosso sistema de IA vai te ajudar a encontrar os melhores locais em Piracicaba!</p>',
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
      arte: '🎨 Arte e Cultura',
      aventura: '🚵 Aventura e Esportes',
      ar_livre: '🌲 Natureza e Ar Livre',
      historicos: '⛪ Locais Históricos',
      shopping: '🛍️ Compras e Lazer'
    };
  } else if (categoria === 'alimentacao') {
    title = 'Onde prefere comer?';
    opts = {
      churrascaria: '🥩 Churrascarias',
      caseira: '🏠 Comida caseira',
      internacional: '🌍 Cozinha internacional',
      lanches: '🍔 Lanches rápidos'
    };
  } else if (categoria === 'hospedagem') {
    title = 'Que tipo de hospedagem?';
    opts = {
      hoteis: '🏩 Hotéis e Resorts',
      pousadas: '🏡 Pousadas charmosas',
      economico: '💰 Acomodações econômicas'
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

const locaisPiracicaba = {
  atracoes: {
    arte: [
      { nome: "Museu da Água", descricao: "História do saneamento na cidade", rating: 4.5 },
      { nome: "Pinacoteca Municipal", descricao: "Artes plásticas regionais", rating: 4.2 },
      { nome: "Casa do Povoador", descricao: "Centro cultural histórico", rating: 4.7 }
    ],
    aventura: [
      { nome: "Parque da Rua do Porto", descricao: "Ciclismo e caminhadas", rating: 4.8 },
      { nome: "Mirante", descricao: "Vista panorâmica da cidade", rating: 4.6 },
      { nome: "Passeio de barco pelo Rio Piracicaba", descricao: "Passeios turísticos fluviais", rating: 4.9 }
    ],
    ar_livre: [
      { nome: "Engenho Central", descricao: "Complexo cultural a céu aberto", rating: 4.7 },
      { nome: "Parque do Mirante", descricao: "Área verde com mirante", rating: 4.5 },
      { nome: "Parque da Rua do Porto", descricao: "Às margens do rio Piracicaba", rating: 4.8 }
    ],
    historicos: [
      { nome: "Igreja Matriz de Santo Antônio", descricao: "Patrimônio histórico religioso", rating: 4.6 },
      { nome: "Capela de São Pedro", descricao: "Arquitetura colonial", rating: 4.4 },
      { nome: "Teatro Erotídes de Campos", descricao: "Teatro histórico municipal", rating: 4.3 }
    ],
    shopping: [
      { nome: "Piracicaba Shopping", descricao: "Shopping center com diversas lojas", rating: 4.1 },
      { nome: "Shopping Center Piracicaba", descricao: "Centro comercial tradicional", rating: 4.0 }
    ]
  },
  alimentacao: {
    churrascaria: [
      { nome: "Churrascaria Bambu", descricao: "Rodízio de carnes premiadas", rating: 4.7 },
      { nome: "Churrascaria e Pizzaria Paulista", descricao: "Comida brasileira tradicional", rating: 4.3 },
      { nome: "Churrascaria Gaúcha", descricao: "Sabores do sul do país", rating: 4.5 }
    ],
    caseira: [
      { nome: "Restaurante Caseiro", descricao: "Comida típica brasileira", rating: 4.2 },
      { nome: "Tia Dita Cozinha Caseira", descricao: "Pratos caseiros regionais", rating: 4.4 },
      { nome: "Quintal do Russo", descricao: "Ambiente familiar e acolhedor", rating: 4.6 }
    ],
    internacional: [
      { nome: "Terraço Italia", descricao: "Cozinha italiana sofisticada", rating: 4.5 },
      { nome: "Sushi Yama", descricao: "Culinária japonesa autêntica", rating: 4.8 }
    ],
    lanches: [
      { nome: "Bar do Alemão", descricao: "Hambúrgueres artesanais", rating: 4.6 },
      { nome: "Pé de Fava", descricao: "Lanches regionais", rating: 4.3 }
    ]
  },
  hospedagem: {
    hoteis: [
      { nome: "Hotel Saint Paul", descricao: "Conforto no centro da cidade", rating: 4.2, preco: "$$" },
      { nome: "Hotel Jayma", descricao: "Excelente custo-benefício", rating: 4.0, preco: "$" },
      { nome: "Royal Residence Plaza Hotel", descricao: "Hotel executivo", rating: 4.5, preco: "$$$" }
    ],
    pousadas: [
      { nome: "Pousada dos Pescadores", descricao: "Às margens do rio", rating: 4.7, preco: "$$" },
      { nome: "Pousada do Engenho", descricao: "Charme rústico", rating: 4.8, preco: "$$" },
      { nome: "Pousada Vila Rica", descricao: "Ambiente familiar", rating: 4.4, preco: "$" }
    ],
    economico: [
      { nome: "Hostel Piracicaba", descricao: "Opção econômica", rating: 3.9, preco: "$" },
      { nome: "Pousada Econômica Central", descricao: "Localização privilegiada", rating: 3.8, preco: "$" }
    ]
  }
};

async function getRecomendacaoIA(categoria, escolha = {}) {
  let opcoes = locaisPiracicaba[categoria]?.[escolha] || [];

  if (opcoes.length === 0) {
    return {
      nome: "Nenhuma recomendação disponível",
      descricao: "Desculpe, não encontramos opções para esta categoria"
    };
  }

  opcoes.sort((a, b) => b.rating - a.rating);

  return opcoes[0] || opcoes[Math.floor(Math.random() * opcoes.length)];
}

async function showResultado(categoria, escolha) {
  const labels = {
    arte: 'Arte e Cultura',
    aventura: 'Aventura e Esportes',
    ar_livre: 'Natureza e Ar Livre',
    historicos: 'Locais Históricos',
    shopping: 'Compras e Lazer',
    churrascaria: 'Churrascarias',
    caseira: 'Comida caseira',
    internacional: 'Cozinha internacional',
    lanches: 'Lanches rápidos',
    hoteis: 'Hotéis e Resorts',
    pousadas: 'Pousadas charmosas',
    economico: 'Acomodações econômicas'
  };

  const recomendacao = await getRecomendacaoIA(categoria, escolha || {});

  const resultado = await Swal.fire({
    title: `✨ ${recomendacao.nome}`,
    html: `
      <div style="text-align: left;">
        <p><strong>Categoria:</strong> ${capitalize(categoria)} - ${labels[escolha]}</p>
        <p>${recomendacao.descricao}</p>
        ${recomendacao.rating ? `<p><strong>Avaliação:</strong> ${recomendacao.rating}/5.0</p>` : ''}
        ${recomendacao.preco ? `<p><strong>Faixa de preço:</strong> ${recomendacao.preco}</p>` : ''}
      </div>
      <style>
        .preferences-used {
          color: #666;
          margin-top: 15px;
          font-style: italic;
        }
      </style>
    `,
    icon: 'success',
    confirmButtonText: 'Ver no mapa',
    showDenyButton: true,
    denyButtonText: 'Mais opções',
    footer: '<a href="#" id="feedback-link">Feedback sobre esta recomendação</a>'
  });

  if (resultado.isConfirmed) {
    window.open(`https://www.google.com/maps/search/${encodeURIComponent(recomendacao.nome + ' Piracicaba')}`);
  } else if (resultado.isDenied) {
    showTodasOpcoes(categoria, escolha);
  }

  document.getElementById('feedback-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    coletarFeedback(recomendacao.nome);
  });
}

function showTodasOpcoes(categoria, escolha = {}) {
  let opcoes = locaisPiracicaba[categoria]?.[escolha] || [];

  opcoes.sort((a, b) => b.rating - a.rating);

  Swal.fire({
    title: 'Todas as opções disponíveis:',
    html: `
      <div class="all-options-container">
        ${opcoes.map(opcao => `
          <div class="option-card">
            <h4>${opcao.nome}</h4>
            <p>${opcao.descricao}</p>
            <div class="option-meta">
              ${opcao.rating ? `<span class="rating">⭐ ${opcao.rating}</span>` : ''}
              ${opcao.preco ? `<span class="price">${'$'.repeat(opcao.preco.length)}</span>` : ''}
              <button class="map-btn" data-location="${opcao.nome}">🗺️ Mapa</button>
            </div>
          </div>
        `).join('')}
      </div>
      <style>
        .all-options-container {
          max-height: 60vh;
          overflow-y: auto;
          padding-right: 10px;
        }
        .option-card {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 10px;
          text-align: left;
        }
        .option-card h4 {
          margin: 0 0 5px 0;
          color: #2c3e50;
        }
        .option-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
        }
        .rating {
          color: #e67e22;
          font-weight: bold;
        }
        .price {
          color: #27ae60;
        }
        .map-btn {
          background: none;
          border: none;
          color: #3498db;
          cursor: pointer;
          padding: 2px 5px;
        }
        .map-btn:hover {
          text-decoration: underline;
        }
      </style>
    `,
    width: '800px',
    showConfirmButton: false,
    showCloseButton: true
  });

  document.querySelectorAll('.map-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const location = btn.getAttribute('data-location');
      window.open(`https://www.google.com/maps/search/${encodeURIComponent(location + ' Piracicaba')}`);
    });
  });
}

function coletarFeedback(localNome) {
  Swal.fire({
    title: `O que achou da recomendação para ${localNome}?`,
    input: 'radio',
    inputOptions: {
      'excelente': '⭐ Excelente',
      'bom': '👍 Bom',
      'regular': '😐 Regular',
      'ruim': '👎 Ruim'
    },
    inputValidator: (value) => {
      if (!value) {
        return 'Por favor, selecione uma opção';
      }
    },
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    preConfirm: (value) => {
      // Aqui você pode enviar o feedback para seu backend
      console.log(`Feedback recebido para ${localNome}: ${value}`);
      // Exemplo: axios.post('/api/feedback', { local: localNome, rating: value })
      return value;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Obrigado pelo seu feedback!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}