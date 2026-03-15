// ============================================================
// SCRIPT.JS — Thalita & Renato · 18.10.2026
// Funções: contagem regressiva, animações, vídeo, RSVP,
//          reserva de presentes, modal Pix, player de música
// ============================================================


// ── QUANDO A PÁGINA CARREGA ──────────────────────────────────
// Adiciona a classe 'loaded' ao body para disparar as
// animações CSS dos elementos botânicos dos cantos
window.addEventListener('load', function () {
  document.body.classList.add('loaded');
});


// ── CONTAGEM REGRESSIVA ──────────────────────────────────────
// Atualiza os números de dias/horas/minutos/segundos a cada 1 segundo
// Para trocar a data: altere '2026-10-18T17:00:00'
function tick() {
  var alvo = new Date('2026-10-18T17:00:00'); // DATA DO CASAMENTO
  var agora = new Date();
  var diff = alvo - agora; // diferença em milissegundos

  // se já passou da data, para de contar
  if (diff <= 0) return;

  // calcula cada unidade
  var dias    = Math.floor(diff / 86400000);
  var horas   = Math.floor((diff % 86400000) / 3600000);
  var minutos = Math.floor((diff % 3600000)  / 60000);
  var segundos= Math.floor((diff % 60000)    / 1000);

  // atualiza os elementos na tela
  document.getElementById('cd-d').textContent = dias;
  document.getElementById('cd-h').textContent = String(horas).padStart(2, '0');    // ex: 07
  document.getElementById('cd-m').textContent = String(minutos).padStart(2, '0');
  document.getElementById('cd-s').textContent = String(segundos).padStart(2, '0');
}

tick();                        // roda imediatamente ao carregar
setInterval(tick, 1000);       // repete a cada 1 segundo


// ── ANIMAÇÕES DE ENTRADA (SCROLL REVEAL) ─────────────────────
// Usa IntersectionObserver para adicionar 'visible' aos elementos
// quando eles aparecem na tela durante o scroll
// Os estilos .rev e .rev-l estão no style.css
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // torna o elemento visível
    }
  });
}, { threshold: 0.08 }); // dispara quando 8% do elemento está visível

// aplica o observer em todos os elementos com .rev ou .rev-l
// usa DOMContentLoaded para garantir que o HTML está pronto
window.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.rev, .rev-l').forEach(function (el) {
    observer.observe(el);
  });
});


// ── PLAYER DE MÚSICA ─────────────────────────────────────────
// Botão play/pause no canto inferior direito
// Para adicionar música real:
//   1. Coloque um arquivo de áudio no mesmo site
//   2. Descomente as linhas do <audio> no HTML
//   3. Descomente bgAudio.play() / bgAudio.pause() abaixo

var tocando = false;

function toggleAudio() {
  tocando = !tocando;

  // troca o ícone de play para pause e vice-versa
  document.getElementById('playIcon').style.display  = tocando ? 'none'  : 'block';
  document.getElementById('pauseIcon').style.display = tocando ? 'block' : 'none';

  // ── DESCOMENTE PARA ATIVAR O ÁUDIO ──────────────────────────
  // var audio = document.getElementById('bgAudio');
  // if (tocando) { audio.play(); }
  // else         { audio.pause(); }
  // ────────────────────────────────────────────────────────────
}


// ── RESERVA DE PRESENTES ─────────────────────────────────────
// Quando o convidado clica "Reservar", o item fica marcado
// como reservado visualmente (opacidade reduzida)
// Obs: esta reserva é apenas visual (não salva no servidor)

function reserveGift(btn) {
  var row = btn.closest('.g-row'); // linha do presente

  if (btn.classList.contains('active')) {
    // já estava reservado — desfaz a reserva
    btn.textContent = 'Reservar';
    btn.classList.remove('active');
    row.style.opacity = '1';
  } else {
    // marca como reservado
    btn.innerHTML = '&#10003; Reservado'; // ✓ Reservado
    btn.classList.add('active');
    row.style.opacity = '0.5'; // deixa mais apagado
  }
}


// ── FORMULÁRIO DE CONFIRMAÇÃO (RSVP) ─────────────────────────
// Valida os campos obrigatórios e exibe mensagem de sucesso
// Para enviar de verdade: integre com Formspree, EmailJS ou similar

function doRSVP() {
  var nome    = document.getElementById('gN').value.trim();
  var confirma = document.getElementById('gA').value;

  // validação simples
  if (!nome || !confirma) {
    alert('Por favor preencha seu nome e confirmação.');
    return;
  }

  // esconde o formulário e exibe mensagem de sucesso
  document.getElementById('rsvpForm').style.display = 'none';
  document.getElementById('rsvpOk').style.display   = 'block';

  // ── PARA ENVIAR POR E-MAIL COM FORMSPREE ────────────────────
  // 1. Crie uma conta em formspree.io
  // 2. Troque action do form pelo endpoint do Formspree
  // 3. Use fetch() para enviar os dados
  // ────────────────────────────────────────────────────────────
}


// ── MODAL DA CHAVE PIX ───────────────────────────────────────
// Abre o modal com a chave Pix ao clicar no botão
function showPix() {
  document.getElementById('pixModal').style.display = 'flex';
}

// fecha o modal ao clicar fora dele (no fundo escuro)
document.getElementById('pixModal').addEventListener('click', function (e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

// ── FORÇAR PLAY DO VÍDEO ─────────────────────────────────────
// Alguns navegadores bloqueiam autoplay — isso força o play
// após o usuário interagir com a página
window.addEventListener('DOMContentLoaded', function () {
  var video = document.getElementById('heroVideo');
  if (video) {
    // tenta dar play automaticamente
    var playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(function () {
        // se bloqueou, aguarda o usuário clicar e tenta de novo
        document.addEventListener('click', function () {
          video.play();
        }, { once: true });
      });
    }
  }
});


function toggleAudio() {
  var audio = document.getElementById("bgAudio");
  var playIcon = document.getElementById("playIcon");
  var pauseIcon = document.getElementById("pauseIcon");

  if (audio.paused) {
    audio.volume = 0.1; // volume baixo
    audio.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "block";
  } else {
    audio.pause();
    playIcon.style.display = "block";
    pauseIcon.style.display = "none";
  }
}