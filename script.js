// Hintergrundmusik und Variablen
let backgroundMusic = new Audio("Hintergrundmusik/hintergrund.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5; // Lautstärke auf 50%

// Standard-Zeit für "gong" in Sekunden (10 Minuten)
let gongDelay = 600;

// Reihenfolge der Zeiten und Rollen in der Abspielreihenfolge
const audioSequence = [
    { audio: "start", roles: [], alwaysPlay: true },
    { audio: null, roles: ["schutzengel"], condition: () => hasRole(["schutzengel"]) },
    { audio: null, roles: ["nachahmer"], condition: () => hasRole(["nachahmer"]) },
    { audio: "daemmerung", roles: [], condition: () => hasRole(["der-graf", "renfield", "infizierter", "venus", "anstifterin", "priester", "meuchler", "verliebte"]) },
    { audio: "vampire", roles: [], condition: () => hasRole(["der-meister", "der-graf", "vampir"]) },
    { audio: null, roles: ["der-graf", "renfield", "infizierter", "venus", "anstifterin", "priester", "meuchler"], condition: () => hasRole(["der-graf", "renfield", "infizierter", "venus", "anstifterin", "priester", "meuchler"]) },
    { audio: "marken", roles: [], condition: () => hasRole(["der-graf", "renfield", "infizierter", "venus", "anstifterin", "priester", "meuchler"]) },
    { audio: null, roles: ["verliebte"], condition: () => hasRole(["verliebte"]) },
    { audio: "hoellenzeit", roles: [], condition: () => hasRole(["knochenleser_1", "hoellenfuerst", "flammenbeschwoerer", "seelendieb", "schattenlaeufer_1", "todesengel", "knochenleser_2"]) },
    { audio: "daemonen", roles: [], condition: () => hasRole(["hoellenfuerst", "flammenbeschwoerer", "seelendieb", "schattenlaeufer"]) },
    { audio: null, roles: ["knochenleser_1", "hoellenfuerst", "flammenbeschwoerer", "seelendieb", "schattenlaeufer_1", "todesengel", "knochenleser_2"], condition: () => hasRole(["knochenleser_1", "hoellenfuerst", "flammenbeschwoerer", "seelendieb", "schattenlaeufer", "todesengel", "knochenleser_2"]) },
    { audio: "nacht", roles: [], alwaysPlay: true },
    { audio: null, roles: ["wache"], condition: () => hasRole(["wache"]) },
    { audio: "werwoelfe", roles: [], condition: () => hasRole(["alphawolf", "sehender-wolf", "traumwolf", "werwolf"]) },
    { audio: null, roles: [
        "alphawolf", "sehender-wolf", "traumwolf", "das-ding", "die-unsichtbare", "nebelseher",
        "flammenwaechter", "daemonenjaeger", "seherin", "junger-seher", "die-erleuchtete", "weise-eule", "kobold", "rufer-der-toten",
        "geisterjaeger", "spurenleser", "glockenlaeuter", "raeuber", "exorzist", "hexe", "lichtbringer",
        "schattenwandler", "taschendieb", "unruhestifterin", "dorftrottel", "magier-des-chaos", "geistermedium",
        "sternendeuterin", "wahrsagerin", "der-prophet", "betrunkener", "schlaflose",
        "der-glasmacher", "aufklaerer", "der-schicksalsweber", "kurator", "spielsuechtiger", "sensenmann",
        "schattenlaeufer_2"
    ], condition: () => hasRole([
        "alphawolf", "sehender-wolf", "traumwolf", "das-ding", "die-unsichtbare", "nebelseher",
        "flammenwaechter", "daemonenjaeger", "seherin", "junger-seher", "die-erleuchtete", "weise-eule", "kobold", "rufer-der-toten",
        "geisterjaeger", "spurenleser", "glockenlaeuter", "raeuber", "exorzist", "hexe", "lichtbringer",
        "schattenwandler", "taschendieb", "unruhestifterin", "dorftrottel", "magier-des-chaos", "geistermedium",
        "sternendeuterin", "wahrsagerin", "der-prophet", "betrunkener", "schlaflose",
        "der-glasmacher", "aufklaerer", "der-schicksalsweber", "kurator", "spielsuechtiger", "sensenmann",
        "schattenlaeufer_2"
    ]) },
    { audio: "ende", roles: [], alwaysPlay: true },
    {
        audio: "abstimmung",
        roles: [],
        alwaysPlay: true,
        nextAudio: {
            audio: "gong",
            delay: gongDelay // Anpassbare Zeit in Sekunden
        }
    }
];

// Funktion zum Überprüfen, ob mindestens eine der Rollen ausgewählt ist
function hasRole(roleList) {
    return roleList.some(role => {
        const checkbox = document.querySelector(`input[type='checkbox'][value='${role}']`);
        return checkbox && checkbox.checked;
    });
}

// Start/Stop-Button und Zustand verwalten
const startStopButton = document.getElementById("start-stop-button");
let isRunning = false; // Speichert den aktuellen Zustand (Start oder Stop)
let currentAudio; // Variable für die aktuelle Audiosequenz, falls gestoppt werden soll

// Event-Listener für Zeitwahl-Buttons
document.querySelectorAll(".time-button").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelectorAll(".time-button").forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");
        gongDelay = parseInt(this.getAttribute("data-time")); // Setzt die Verzögerungszeit
    });
});

// Start-Stop-Funktionalität
startStopButton.addEventListener("click", function () {
    if (isRunning) {
        stopGame();
    } else {
        startGame();
    }
});

// Hauptfunktion: Startet das Spiel und spielt die Audiosequenz ab
function startGame() {
    console.log("Spiel gestartet");
    isRunning = true;
    startStopButton.textContent = "Stop";
    playBackgroundMusic();
    playAudioSequence(audioSequence);
}

// Funktion zum Stoppen des Spiels
function stopGame() {
    console.log("Spiel gestoppt");
    isRunning = false;
    startStopButton.textContent = "Start";
    stopBackgroundMusic();
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}

// Funktion zum Abspielen der Hintergrundmusik
function playBackgroundMusic() {
    if (!backgroundMusic.playing) {
        backgroundMusic.play();
    }
}

// Funktion zum Stoppen der Hintergrundmusik
function stopBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

// Funktion zum Abspielen der Audiosequenzen in festgelegter Reihenfolge
function playAudioSequence(sequence) {
    let index = 0;

    function playNext() {
        if (!isRunning) return;

        if (index >= sequence.length) {
            stopGame();
            return;
        }

        const { audio, roles, condition, alwaysPlay, nextAudio } = sequence[index];
        index++;

        if (alwaysPlay || (condition && condition())) {
            if (audio) {
                currentAudio = new Audio(`Rollenaudio/${audio}.mp3`);
                currentAudio.play();
                currentAudio.onended = () => {
                    if (roles && roles.length > 0) {
                        playRoleSequence(roles, playNext);
                    } else {
                        playNext();
                    }
                };

                // "gong" Delay aktualisieren, wenn "abstimmung" Audio spielt
                if (audio === "abstimmung" && nextAudio && nextAudio.audio === "gong") {
                    setTimeout(() => {
                        const gongAudio = new Audio(`Rollenaudio/${nextAudio.audio}.mp3`);
                        gongAudio.play();
                    }, gongDelay * 1000);
                }
            } else {
                playRoleSequence(roles, playNext);
            }
        } else {
            playNext();
        }
    }

    playNext();
}

// Funktion zum Abspielen der Rollen in der festgelegten Reihenfolge
function playRoleSequence(roles, callback) {
    let roleIndex = 0;

    function playNextRole() {
        if (!isRunning) return;

        if (roleIndex >= roles.length) {
            callback();
            return;
        }

        const role = roles[roleIndex];
        roleIndex++;

        const checkbox = document.querySelector(`input[type='checkbox'][value='${role}']`);

        if (checkbox && checkbox.checked) {
            currentAudio = new Audio(`Rollenaudio/${role}.mp3`);
            currentAudio.play();
            currentAudio.onended = playNextRole;
        } else {
            playNextRole();
        }
    }

    playNextRole();
}
