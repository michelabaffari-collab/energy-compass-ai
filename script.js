// Verifica caricamento file
console.log("My Energy Compass: Script caricato con successo!");

// 1. SINCRONIZZAZIONE SLIDER ENERGIA
// Aggiorna il numero accanto allo slider in tempo reale
document.getElementById('energia').addEventListener('input', function(e) {
    document.getElementById('energyValue').textContent = e.target.value;
});

// 2. GENERAZIONE DEL PIANO OTTIMIZZATO
function generaPiano() {
    // Recupero dati dagli input
    const oreLibere = parseFloat(document.getElementById('oreLibere').value);
    const oreStudio = parseFloat(document.getElementById('oreStudio').value);
    const energia = parseInt(document.getElementById('energia').value);
    const vuoleSport = document.getElementById('sport').checked;
    const vuoleSociale = document.getElementById('sociale').checked;

    // Validazione immediata
    if (isNaN(oreLibere) || isNaN(oreStudio)) {
        alert("Ops! Inserisci i numeri per le ore prima di calcolare il piano.");
        return;
    }

    const oreRimanenti = oreLibere - oreStudio;
    let suggerimento = "";

    // Logica decisionale basata sull'energia (Innovation Design)
    if (energia >= 8) {
        suggerimento = "🚀 **Stato: Peak Performance.** Hai molta energia! Attacca subito i capitoli più complessi o i nuovi argomenti.";
    } else if (energia >= 5) {
        suggerimento = "⚖️ **Stato: Bilanciato.** Energia media: usa la tecnica Pomodoro (50 min studio / 10 min pausa) per mantenere il focus.";
    } else {
        suggerimento = "☕ **Stato: Risparmio Energetico.** Energia bassa: non forzare. Dedicati a ripassi leggeri, mappe concettuali o organizzazione materiali.";
    }

    // Aggiunte basate sui checkbox
    if (vuoleSport) suggerimento += "<br><br>🏃‍♂️ **Sport:** Previsto nel piano. Ottimo per resettare il cortisolo dopo lo studio.";
    if (vuoleSociale) suggerimento += "<br>🥂 **Social:** Confermata uscita serale. Obiettivo: chiudere i libri entro le 19:00 per staccare davvero.";

    // Rendering Risultati
    document.getElementById('outputPiano').innerHTML = `L'algoritmo ha calcolato <strong>${oreRimanenti} ore</strong> di tempo extra.<br><br>${suggerimento}`;
    
    const citazioni = [
        "Un piccolo passo ogni giorno porta a grandi risultati.",
        "Il riposo non è tempo perso, è rifornimento.",
        "Gestisci la tua energia, non solo il tuo tempo."
    ];
    document.getElementById('motivazione').textContent = citazioni[Math.floor(Math.random() * citazioni.length)];
    
    // Mostra le sezioni nascoste (UX Progressiva)
    document.getElementById('risultato').classList.remove('hidden');
    document.getElementById('chat-section').classList.remove('hidden');
}

// 3. ASSISTENTE CONVERSAZIONALE (AI LOGIC)
function inviaMessaggio() {
    const input = document.getElementById('userQuery');
    const chatWindow = document.getElementById('chat-window');
    const rawMsg = input.value.trim();
    const msg = rawMsg.toLowerCase(); 
    const energia = parseInt(document.getElementById('energia').value);

    if (!rawMsg) return;

    // Visualizza messaggio utente
    chatWindow.innerHTML += `<div class="user-msg"><b>Tu:</b> ${rawMsg}</div>`;
    input.value = ""; // Reset campo

    // Simulazione latenza AI (600ms per realismo UX)
    setTimeout(() => {
        let risposta = "";

        // ALGORITMO DI RISPOSTA PER PAROLE CHIAVE
        if (msg.includes("ansia") || msg.includes("stress") || msg.includes("preoccupat") || msg.includes("agit")) {
            risposta = energia < 5 
                ? "Capisco la tensione. Con la tua energia attuale a " + energia + ", ti consiglio vivamente 15 minuti di stop totale. Respira profondamente." 
                : "Un po' di stress può essere funzionale. Prova a dividere il compito in 3 micro-obiettivi da 15 minuti l'uno.";
        } 
        else if (msg.includes("pausa") || msg.includes("riposo") || msg.includes("stanc") || msg.includes("fermar")) {
            risposta = energia > 7 
                ? "Hai ancora una buona riserva energetica. Fai altri 20 minuti di focus intenso e poi premi il tasto reset con una pausa." 
                : "Sì, il tuo corpo sta segnalando stanchezza. Una pausa di 15 minuti lontano dallo smartphone è essenziale per la tua memoria.";
        }
        else if (msg.includes("sport") || msg.includes("allenamento") || msg.includes("palestra") || msg.includes("muover")) {
            risposta = energia > 6 
                ? "Assolutamente sì! L'attività fisica oggi aiuterà a ossigenare il cervello e fissare quanto studiato." 
                : "Oggi opta per qualcosa di molto leggero, come una passeggiata. Non esaurire le ultime energie preziose.";
        }
        else if (msg.includes("chi sei") || msg.includes("ai") || msg.includes("tecnologia") || msg.includes("funzion")) {
            risposta = "Sono il modulo AI di My Energy Compass. Il mio scopo è ottimizzare la tua 'User Experience' quotidiana incrociando dati psicofisici e obiettivi.";
        }
        else if (msg.includes("grazie") || msg.includes("utile") || msg.includes("graz")) {
            risposta = "Felice di esserti d'aiuto! ✨ Ricorda: ascoltare la tua energia è la chiave per non andare in burnout. Buona sessione!";
        }
        else {
            risposta = "Interessante! Considerando la tua energia di " + energia + "/10, ti suggerisco di seguire il piano generato. Hai altre domande specifiche?";
        }

        // Visualizza risposta AI
        chatWindow.innerHTML += `<div class="ai-msg"><b>AI:</b> ${risposta}</div>`;
        
        // Auto-scroll verso il basso
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 600);
}