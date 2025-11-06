    const audio = document.getElementById('myAudio');
    const subtitles = document.getElementById('subtitles').children;

    audio.addEventListener('timeupdate', function() {
      const currentTime = audio.currentTime;
      for (let i = 0; i < subtitles.length; i++) {
        const startTime = parseFloat(subtitles[i].getAttribute('data-start'));
        const endTime = parseFloat(subtitles[i].getAttribute('data-end'));
        if (startTime <= currentTime && currentTime <= endTime) {
          subtitles[i].style.display = 'inline'; 
        } else {
          subtitles[i].style.display = 'none';
        }
      }
    });