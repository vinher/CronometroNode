const readline = require('readline');

// Función para mostrar el tiempo transcurrido en formato "HH:mm:ss"
function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const formattedSeconds = String(seconds % 60).padStart(2, '0');
  const formattedMinutes = String(minutes % 60).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Función para mostrar el cronómetro cada segundo
function showTime(elapsedTime) {
  const formattedTime = formatTime(elapsedTime);
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(formattedTime);
}

// Función para iniciar el cronómetro
function startTimer() {
  let startTime = Date.now();
  let intervalId;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    showTime(elapsedTime);
  }, 1000);

  return intervalId;
}

// Función para detener el cronómetro
function stopTimer(intervalId) {
  clearInterval(intervalId);
  process.stdout.write('\nCronómetro detenido\n');
}

// Función principal para manejar la entrada del usuario
function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let intervalId;

  rl.question('Presiona ENTER para iniciar el cronómetro. Luego, presiona ENTER nuevamente para detenerlo.\n', () => {
    rl.close();
    process.stdout.write('Cronómetro iniciado. Presiona ENTER para detenerlo.\n');
    intervalId = startTimer();

    process.stdin.on('data', (chunk) => {
      const input = chunk.toString().trim();
      if (input === '') {
        stopTimer(intervalId);
        process.stdin.pause();
      }
    });
  });
}

main();
