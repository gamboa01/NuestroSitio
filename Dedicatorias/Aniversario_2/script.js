 // Partículas flotantes
    (function generarParticulas() {
      const contenedor = document.getElementById("particles");
      const total = 18;
      for (let i = 0; i < total; i++) {
        const s = document.createElement("span");
        s.style.left = Math.random() * 100 + "vw";
        s.style.animationDelay = Math.random() * 22 + "s";
        s.style.animationDuration = 16 + Math.random() * 12 + "s";
        s.style.opacity = 0.4 + Math.random() * 0.6;
        contenedor.appendChild(s);
      }
    })();

    // Scroll suave por data-scroll
    document.querySelectorAll("[data-scroll]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-scroll");
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // Cálculo aproximado de días juntos (fecha real de inicio)
    (function calcularTiempo() {
      // 11 diciembre 2023
      const inicio = new Date("2023-12-11");
      const hoy = new Date();
      const msPorDia = 1000 * 60 * 60 * 24;
      const diffMs = hoy - inicio;
      const dias = Math.floor(diffMs / msPorDia);
      const meses = Math.floor(dias / 30.4375);
      const anios = Math.floor(meses / 12);

      const daysText = document.getElementById("days-count");
      const badgeDays = document.getElementById("badge-days");
      const badgeMonths = document.getElementById("badge-months");
      const badgeYears = document.getElementById("badge-years");

      if (daysText) {
        daysText.textContent = "Llevamos aproximadamente " + dias + " días compartiendo esta historia.";
      }
      if (badgeDays) badgeDays.textContent = dias + " días";
      if (badgeMonths) badgeMonths.textContent = meses + " meses";
      if (badgeYears) badgeYears.textContent = anios + " años";
    })();

    // Línea de tiempo
    const timelineData = [
      {
        id: 1,
        label: "Cuando todo empezó",
        date: "Día 1",
        title: "Ese momento en el que te comenzó nuestra historia",
        text:
          "Todavía recuerdo aquel día que te pedí fueramos novios, fue toda una travesía el pedir permiso, luego confirmarlo y pedirlo el mismo día." +
          " Quizá lo esperabas o imaginabas diferente, pero para mí fue un momento lleno de emoción, nervios y muchas ganas de empezar algo especial contigo.",
                  note:
          "Nunca se me va a olvidar ese SÍ parcial jaja."
      },
      {
        id: 2,
        label: "Nuestras primeras salidas",
        date: "Primeras salidas",
        title: "La primera vez que tomé tu mano",
        text:
          "Recuerdo los nervios que habían por las primeras veces que salíamos, por tomar tu mano, darte un abrazo y ahora ya un beso. " +
          "Pero estoy seguro que ahora no quiero soltar tu mano en ningún momento y si bien hemos reducido las salidas, seguimos pasando buenos momentos juntos.",
                  note:
          "Recuerda que ya habíamos tenido nuestra primer salida a escondidas, pero los nervios eran iguales."
      },
      {
        id: 3,
        label: "Nuestros días favoritos",
        date: "Momentos especiales",
        title: "Esos días que siempre voy a recordar",
        text:
          "Hay muchos días que sin duda alguna siempre voy a recordar, entre ellos podría incluir las locuras que hemos hecho (Escapadas, quedadas y así). " +
          "También acá incluyo aquellas veces que nos tocó hablar serio, los problemas que hemos atravesado y todas las complicaciones que hemos podido afrontar, porque al final seguimos juntos.",
                  note:
          "Como te dije, mejoremos para nosotros y no para ser mejores con otros."
      },
      {
        id: 4,
        label: "Lo que aprendimos",
        date: "Caminando juntos",
        title: "Lo que hemos construido en estos 2 años",
        text:
          "No todo ha sido perfecto, pero eso es precisamente lo que lo hace real. Hemos aprendido a hablar, a escucharnos, a pedir perdón, " +
          "a apoyar al otro cuando las cosas se ponen difíciles. Y en cada reto, cada diferencia y cada reconciliación, siento que te conozco más y te quiero y amo más.",
        note:
          "Hemos pasado momentos fuertes, pero también nuestro amor es fuerte."
      },
      {
        id: 5,
        label: "Lo que viene",
        date: "Nuestro futuro",
        title: "Todo lo que todavía nos espera",
        text:
          "Cuando pienso en el futuro, no puedo evitar imaginarte en él. No sé exactamente cómo será la vida, " +
          "pero sé que quiero estar contigo, construyendo, soñando y eligiéndonos incluso en los días complicados.",
        note:
          "Ansio el momento en el que dejes de ser mi novia y te conviertas en mi esposa."
      }
    ];

    const timelineList = document.getElementById("timeline-list");
    const timelineDetail = document.getElementById("timeline-detail");

    function renderTimeline() {
      if (!timelineList) return;
      timelineList.innerHTML = "";
      timelineData.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "timeline-item" + (index === 0 ? " active" : "");
        div.dataset.id = item.id;

        const label = document.createElement("span");
        label.className = "label";
        label.textContent = item.label;

        const date = document.createElement("span");
        date.className = "date";
        date.textContent = item.date;

        div.appendChild(label);
        div.appendChild(date);

        div.addEventListener("click", () => setActiveTimeline(item.id));
        timelineList.appendChild(div);
      });
      // Mostrar el primero por defecto
      setActiveTimeline(timelineData[0].id);
    }

    function setActiveTimeline(id) {
      const item = timelineData.find(t => t.id === id);
      if (!item || !timelineDetail) return;

      timelineList.querySelectorAll(".timeline-item").forEach(el => {
        el.classList.toggle("active", Number(el.dataset.id) === id);
      });

      timelineDetail.innerHTML = "";
      const h3 = document.createElement("h3");
      h3.textContent = item.title;

      const p = document.createElement("p");
      p.textContent = item.text;

      const note = document.createElement("p");
      note.className = "note";
      note.textContent = item.note;

      timelineDetail.appendChild(h3);
      timelineDetail.appendChild(p);
      timelineDetail.appendChild(note);
    }

    renderTimeline();

    // Carta con efecto de escritura
    const letterContent =
      "Quiero empezar dándote las gracias. Gracias por estos dos años, por cada día en el que decidiste quedarte, " +
      "por cada vez que compartiste conmigo lo que sentías, por cada abrazo que calmó mi preocupación o mi mente y por cada " +
      "risa que hizo que mi situación se sintiera mucho mejor.\n\n" +
      "No eres solo una parte bonita de mi vida, eres una de las razones por las que quiero ser mejor. " +
      "Porque cuando te miro, entiendo que vale la pena esforzarme, crecer y aprender, no solo por mí, sino también " +
      "por todo lo que estamos construyendo juntos.\n\n" +
      "Hay días fáciles y días complicados, momentos en los que todo fluye y otros en los que nos toca escucharnos, " +
      "tenernos paciencia y elegirnos incluso cuando no pensamos igual. Pero en todos esos momentos, " +
      "hay algo que se mantiene: quiero seguir caminando a tu lado.\n\n" +
      "Gracias por tu cariño, por tus detalles, por tu apoyo, por tu forma de hacerme bonita la vida y por dejarme ser parte de ella. " +
      "Quiero que sepas que te valoro, te admiro y te quiero más de lo que estas palabras pueden explicar.\n\n" +
      "Por estos dos años, por todo lo que fuimos, lo que somos y lo que todavía nos espera, te amo inmensamente.\n";

    const letterElement = document.getElementById("letter-text");
    const letterReplay = document.getElementById("letter-replay");
    let letterIndex = 0;
    let letterInterval = null;

    function escribirCarta() {
      if (!letterElement) return;
      clearInterval(letterInterval);
      letterElement.textContent = "";
      letterIndex = 0;
      const velocidad = 22; // ms por carácter

      letterInterval = setInterval(() => {
        if (letterIndex <= letterContent.length) {
          letterElement.textContent = letterContent.slice(0, letterIndex);
          letterIndex++;
        } else {
          clearInterval(letterInterval);
        }
      }, velocidad);
    }

    if (letterReplay) {
      letterReplay.addEventListener("click", escribirCarta);
    }

    escribirCarta();

    // Frases finales
    const frases = [
      "Si supieras todo lo que cambia dentro de mí cuando escucho tu voz, entenderías por qué quiero seguir a tu lado muchos años más.",
      "No sé qué pase en el futuro, pero tengo claro algo: quiero seguir haciéndote parte de mis planes.",
      "Tu presencia convirtió días normales en recuerdos que quiero guardar para siempre.",
      "Hay muchas cosas en la vida que no puedo controlar, pero sí puedo elegir a quién quiero cuidar y proteger, y yo te elijo a ti.",
      "Gracias por ser mi persona favorita incluso en los días en los que ni yo sé cómo explicarme.",
      "Tú y yo no somos perfectos, pero lo que tenemos es real, y eso para mí vale muchísimo más.",
      "Si pudiera volver al inicio de todo, pediría encontrarme contigo otra vez, para elegirte una vez más.",
      "No prometo que todo será fácil, pero sí prometo que voy a seguir intentándolo contigo, una y otra vez.",
      "Quiero seguir siendo tu amorcito y tu apoyo, en las buenas y en las malas, hoy y siempre.",
      "Que podamos tener más momentos juntos, aprendiendo, creciendo y amándonos cada día más.",
      "Eres mi lugar seguro.",
      "Me haces sentir amado.",
      "Contigo, todo es mejor.",
      "Eres mi persona favorita.",
      "Gracias por ser tú.",
      "ME ENCANTAS.",
      "ME EXCITAS.",
      "ME FASCINAS.",
      "ME ENLOQUECES."
    ];

    const quoteElement = document.getElementById("ending-quote");
    const quoteBtn = document.getElementById("quote-btn");

    function nuevaFrase() {
      if (!quoteElement) return;
      const indice = Math.floor(Math.random() * frases.length);
      quoteElement.textContent = "";
      const texto = frases[indice];
      // Pequeño efecto de aparición
      let i = 0;
      const intervalo = setInterval(() => {
        if (i <= texto.length) {
          quoteElement.textContent = texto.slice(0, i);
          i++;
        } else {
          clearInterval(intervalo);
        }
      }, 18);
    }

    if (quoteBtn) {
      quoteBtn.addEventListener("click", nuevaFrase);
    }