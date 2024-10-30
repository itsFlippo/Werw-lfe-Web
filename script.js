// Hintergrundmusik und Variablen
let backgroundMusic = new Audio("hintergrundmusik/hintergrund.mp3"); // Pfad zur Hintergrundmusik
backgroundMusic.loop = true;
backgroundMusic.volume = 0.4; // Lautstärke auf 50%

// Reihenfolge der Zeiten und Rollen in der Abspielreihenfolge
const audioSequence = [
    { audio: "start", roles: [], alwaysPlay: true }, // 1
    { audio: null, roles: ["schutzengel"], condition: () => hasRole(["schutzengel"]) }, // 2
    { audio: null, roles: ["nachahmer"], condition: () => hasRole(["nachahmer"]) }, // 3
    { audio: "daemmerung", roles: [], condition: () => hasRole(["der-graf", "renfield", "infizierter", "venus", "anstifterin", "priester", "meuchler", "verliebte"]) }, // 4
    { audio: "vampire", roles: [], condition: () => hasRole(["der-meister", "der-graf", "vampir"]) }, // 5
    { audio: null, roles: ["der-graf", "renfield", "infizierter", "venus", "anstifterin", "priester", "meuchler"], condition: () => hasRole(["der-graf", "renfield", "infizierter", "venus", "anstifterin", "priester", "meuchler"]) }, // 6-12
    { audio: "marken", roles: [], condition: () => hasRole(["der-graf", "renfield", "infizierter", "venus", "anstifterin", "priester", "meuchler"]) }, // 13
    { audio: null, roles: ["verliebte"], condition: () => hasRole(["verliebte"]) }, // 14
    { audio: "hoellenzeit", roles: [], condition: () => hasRole(["knochenleser", "hoellenfuerst", "flammenbeschwoerer", "seelendieb", "schattenlaeufer", "todesengel"]) }, // 15
    { audio: "daemonen", roles: [], condition: () => hasRole(["hoellenfuerst", "flammenbeschwoerer", "seelendieb", "schattenlaeufer"]) }, // 16
    { audio: null, roles: ["knochenleser_1", "hoellenfuerst", "flammenbeschwoerer", "seelendieb", "schattenlaeufer_1", "todesengel", "knochenleser_2"], condition: () => hasRole(["knochenleser", "hoellenfuerst", "flammenbeschwoerer", "seelendieb", "schattenlaeufer", "todesengel"]) }, // 17-23
    { audio: "nacht", roles: [], alwaysPlay: true }, // 24
    { audio: null, roles: ["wache"], condition: () => hasRole(["wache"]) }, // 25
    { audio: "werwoelfe", roles: [], condition: () => hasRole(["alphawolf", "sehender-wolf", "traumwolf", "werwolf"]) }, // 26
    { audio: null, roles: [
        "alphawolf", "sehender-wolf", "traumwolf", "das-ding", "die-unsichtbare", "nebelseher",
        "flammenwaechter", "daemonenjaeger", "seherin", "junger-seher", "die-erleuchtete", "rufer-der-toten",
        "geisterjaeger", "spurenleser", "glockenlaeuter", "raeuber", "exorzist", "hexe", "lichtbringer",
        "schattenwandler", "taschendieb", "unruhestifterin", "dorftrottel", "magier-des-chaos", "geistermedium",
        "sternendeuterin", "wahrsagerin", "kobold", "weise-eule", "der-prophet", "betrunkener", "schlaflose",
        "der-glasmacher", "aufklaerer", "der-schicksalsweber", "kurator", "spielsuechtiger", "sensenmann",
        "schattenlaeufer_2"
    ], condition: () => hasRole([
        "alphawolf", "sehender-wolf", "traumwolf", "das-ding", "die-unsichtbare", "nebelseher",
        "flammenwaechter", "daemonenjaeger", "seherin", "junger-seher", "die-erleuchtete", "rufer-der-toten",
        "geisterjaeger", "spurenleser", "glockenlaeuter", "raeuber", "exorzist", "hexe", "lichtbringer",
        "schattenwandler", "taschendieb", "unruhestifterin", "dorftrottel", "magier-des-chaos", "geistermedium",
        "sternendeuterin", "wahrsagerin", "kobold", "weise-eule", "der-prophet", "betrunkener", "schlaflose",
        "der-glasmacher", "aufklaerer", "der-schicksalsweber", "kurator", "spielsuechtiger", "sensenmann",
        "schattenlaeufer_2"
    ]) }, // 27-77
    { audio: "ende", roles: [], alwaysPlay: true } // 78
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

// Start-Stop-Funktionalität
startStopButton.addEventListener("click", function () {
    if (isRunning) {
        stopGame(); // Wenn "Stop" geklickt wird
    } else {
        startGame(); // Wenn "Start" geklickt wird
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
        if (!isRunning) return; // Abbruch, wenn gestoppt

        if (index >= sequence.length) {
            console.log("Sequenz abgeschlossen, Hintergrundmusik wird gestoppt.");
            stopBackgroundMusic();
            stopGame(); // Setzt den Button zurück
            return;
        }

        const { audio, roles, condition, alwaysPlay } = sequence[index];
        index++; // Bereitet den nächsten Durchlauf vor, bevor die Bedingungen geprüft werden

        // Nur abspielen, wenn immer abspielbar oder die Bedingung erfüllt ist
        if (alwaysPlay || (condition && condition())) {
            if (audio) {
                console.log(`Spiele Audio: ${audio}`);
                currentAudio = new Audio(`rollenaudio/${audio}.mp3`);
                currentAudio.play();
                currentAudio.onended = () => {
                    if (roles && roles.length > 0) {
                        playRoleSequence(roles, playNext);
                    } else {
                        playNext();
                    }
                };
            } else {
                playRoleSequence(roles, playNext);
            }
        } else {
            // Bedingung nicht erfüllt, überspringe zur nächsten Audio
            playNext();
        }
    }

    playNext();
}

// Funktion zum Abspielen der Rollen in der festgelegten Reihenfolge
function playRoleSequence(roles, callback) {
    let roleIndex = 0;

    function playNextRole() {
        if (!isRunning) return; // Abbruch, wenn gestoppt

        if (roleIndex >= roles.length) {
            callback();
            return;
        }

        const role = roles[roleIndex];
        roleIndex++; // Erhöht vor dem Überprüfen, damit übersprungen wird, falls Bedingung nicht erfüllt ist

        const checkbox = document.querySelector(`input[type='checkbox'][value='${role === "knochenleser_1" || role === "knochenleser_2" ? "knochenleser" : role}']`);

        if (checkbox && checkbox.checked) {
            console.log(`Spiele Rolle: ${role}`);
            currentAudio = new Audio(`rollenaudio/${role}.mp3`);
            currentAudio.play();
            currentAudio.onended = playNextRole;
        } else {
            // Rolle nicht ausgewählt, überspringe zur nächsten Rolle
            playNextRole();
        }
    }

    playNextRole();
}