class Player{
    constructor(_element){
        this.element = _element
        this.videoElement = this.element.querySelector('.js-video')

        // setSeekBarVolume Selector
        this.seekBarVolume = this.element.querySelector('.js-volume-seek-bar')
        this.seekBarVolumeFill = this.element.querySelector('.js-volume-seek-bar-fill')

        // setShare Selector
        this.buttonShare = this.element.querySelector('.js-share-button')
        this.textShare = this.element.querySelector('.js-share-text')

        // setPictureInPicture Selector
        this.buttonPictureInPicture = this.element.querySelector('.js-picture-in-picture')

        // setTimer Selector
        this.videoCurrentTimeDisplay = this.element.querySelector('.js-video-current-time')
        this.videoDurationTimeDisplay = this.element.querySelector('.js-video-duration')

        // setVideo Selector
        this.descVideoMenu = this.element.querySelectorAll('.js-desc-video-menu-video')
        this.titleCurrentVideo = this.element.querySelectorAll('.js-title-current-video')

        // setMenuVideo Selector
        this.menuElement = this.element.querySelector('.js-menu-video')
        this.buttonMenuElement = this.element.querySelector('.js-menu-video-button')
        this.imageMenuVideoElement = this.element.querySelectorAll('.js-image-menu-video')
        this.titleMenuVideoElement = this.element.querySelectorAll('.title-video-menu-video')
        this.imageMenu = this.element.querySelector('.js-image-menu-video')

        // setVolume Selector
        this.volumeElement = this.element.querySelector('.js-volume-button')

        // setLoop Selector
        this.loopElement = this.element.querySelector('.js-loop-button')

        // setFullscreen Selector
        this.fullscreenElement = this.element.querySelector('.js-fullscreen')

        // setPlay Selector
        this.playElement = this.element.querySelector('.js-play-button')

        // setSeekBar Selector
        this.seekBarElement = this.element.querySelector('.js-seek-bar')
        this.fillElement = this.element.querySelector('.js-seek-bar-fill')
        this.rewindElement = this.element.querySelector('.js-rewind-video')
        this.forwardElement = this.element.querySelector('.js-forward-video')

        this.setSeekBarVolume()
        this.setShare()
        this.setPictureInPicture()
        this.setTimer()
        this.setVideo()
        this.setMenuVideo()
        this.setLoop()
        this.setTitle()
        this.setFullScreen()
        this.setPlayPause()
        this.setVolume()
        this.setSeekBar()
    }
    setSeekBarVolume(){
        this.seekBarVolume.addEventListener('click', (_event) =>{
            const bounding = this.seekBarVolume.getBoundingClientRect()
            const ratio = (_event.clientY - bounding.top) / bounding.height
            const volume = ratio

            this.seekBarVolumeFill.style.transform = `scaleY(${ratio})`

            this.videoElement.volume = volume

            if(this.videoElement.volume > 0.5){
                this.volumeElement.classList.add('volume-full-button')
                this.volumeElement.classList.remove('volume-medium-button')
                this.volumeElement.classList.remove('volume-muted-button')
            }
            else if(this.videoElement.volume > 0 && this.videoElement.volume <= 0.5){
                this.volumeElement.classList.add('volume-medium-button')
                this.volumeElement.classList.remove('volume-muted-button')
                this.volumeElement.classList.remove('volume-full-button')
            }
            else if(this.videoElement.volume === 0){
                this.volumeElement.classList.remove('volume-medium-button')
                this.volumeElement.classList.add('volume-muted-button')
                this.volumeElement.classList.remove('volume-full-button')
            }
        })
    }
    setShare(){
        // Display url of the current page 
        this.buttonShare.addEventListener('click', () =>{
            this.textShare.value = window.location.href
            this.textShare.classList.toggle('is-active')
            this.buttonShare.classList.toggle('is-active')
        })
    }
    setPictureInPicture(){
        let pictureInPictureStatus = false
        // On click on Button Picture in Picture launch Picture in picture mode
        this.buttonPictureInPicture.addEventListener('click', () =>{
            this.videoElement.requestPictureInPicture()
            pictureInPictureStatus = true
        })
        // Exit Picture in Picture mode when 'Escape' is press
        document.addEventListener('keydown', (event) =>{
            if(event.key === 'Escape' && pictureInPictureStatus === true){
                document.exitPictureInPicture()
                pictureInPictureStatus = false
            }
            // Open Picture in Pïcture mode when 'P' is press
            else if(event.key === 'p' || event.key === 'P'){
                this.videoElement.requestPictureInPicture()
                pictureInPictureStatus = true
            }
        })
    }
    setTimer(){
        // Display current time and time remaining of the video
        this.videoElement.addEventListener('timeupdate', () =>{
            let currentTimeSeconds = Math.floor(this.videoElement.currentTime % 60)
            let currentTimeMinutes = Math.floor((this.videoElement.currentTime) / 60)

            this.videoCurrentTimeDisplay.innerHTML = `${currentTimeMinutes} : ${currentTimeSeconds}`

            if(currentTimeSeconds < 60){
                currentTimeSeconds = 0
                currentTimeMinutes++
            }

            let durationTimeSeconds = Math.floor((this.videoElement.duration - this.videoElement.currentTime) % 60)
            let durationTimeMinutes = Math.floor((this.videoElement.duration - this.videoElement.currentTime) / 60)

            this.videoDurationTimeDisplay.innerHTML = `${durationTimeMinutes} : ${durationTimeSeconds}`

            if(durationTimeSeconds < 60){
                durationTimeSeconds = 0
                durationTimeMinutes++
            }
        })
    }
    setVideo(){
        // Set video in the menu video
        this.descVideoMenu.forEach((_element, _key) =>{
            _element.addEventListener('click', () =>{
                if(_key === 0){
                    this.videoElement.removeAttribute('src','video/video2.mp4')
                    this.videoElement.setAttribute('src','video/video.mp4')

                    this.videoElement.removeAttribute('poster','images/poster2.jpg')
                    this.videoElement.setAttribute('poster','images/poster.jpg')

                    this.titleCurrentVideo.forEach((_element, _key) =>{
                        if(_key === 0){
                            _element.classList.remove('title-hide')
                        }
                        else if(_key === 1){
                            _element.classList.add('title-hide')
                        }
                    })
                }
                else if(_key === 1){
                    this.videoElement.removeAttribute('src','video/video.mp4')
                    this.videoElement.setAttribute('src','video/video2.mp4')

                    this.videoElement.removeAttribute('poster','images/poster.jpg')
                    this.videoElement.setAttribute('poster','images/poster2.jpg')

                    _element.classList.add('video-current')

                    this.titleCurrentVideo.forEach((_element, _key) =>{
                        if(_key === 0){
                            _element.classList.add('title-hide')
                        }
                        else if(_key === 1){
                            _element.classList.remove('title-hide')
                        }
                    })
                }
            })
        })
    }
    setMenuVideo(){
        const jsPlayerElement = document.querySelector('.js-player')
        // Menu video appear on click menu button
        this.buttonMenuElement.addEventListener('click', () =>{
            this.menuElement.classList.toggle('is-active')
            this.buttonMenuElement.classList.toggle('is-active')
            jsPlayerElement.classList.toggle('is-active')
            this.imageMenuVideoElement.forEach((_element) =>{
                _element.classList.toggle('is-active') 
            })
            this.titleMenuVideoElement.forEach((_element) =>{
                _element.classList.toggle('is-active')
            })
            let isActivePlayerStauts = false 
            if(jsPlayerElement.classList.contains('is-active')){
                jsPlayerElement.style.transform = `translateX(-${menuWidthElement/2}px)`
                isActivePlayerStauts = true 
            }
            else if(isActivePlayerStauts === false ){
                jsPlayerElement.style.transform = `translateX(0px)`
            }
        })
        // Leave menu when Escape is press
        document.addEventListener('keydown', (event) =>{
            if(event.key === 'Escape' && this.menuElement.classList.contains('is-active')){
                this.imageMenuVideoElement.forEach((_element) =>{
                    _element.classList.remove('is-active') 
                })
                this.titleMenuVideoElement.forEach((_element) =>{
                    _element.classList.remove('is-active')
                })
                this.menuElement.classList.remove('is-active')
                this.buttonMenuElement.classList.remove('is-active')
                jsPlayerElement.classList.remove('is-active')
                let isActivePlayerStauts = false 
                if(jsPlayerElement.classList.contains('is-active')){
                    jsPlayerElement.style.transform = `translateX(-${menuWidthElement/2}px)`
                    isActivePlayerStauts = true 
                }
                else if(isActivePlayerStauts === false ){
                    jsPlayerElement.style.transform = `translateX(0px)`
                }
            }
        })
        // Responsive off the menu when resize
        let imageMenuWidth = this.imageMenu.offsetWidth
        this.menuElement.style.width = `${imageMenuWidth+10}px`
        let menuWidthElement = this.menuElement.offsetWidth
        this.menuElement.style.right = `-${menuWidthElement}px`
        window.addEventListener('resize', () =>{
            let imageMenuWidth = this.imageMenu.offsetWidth
            this.menuElement.style.width = `${imageMenuWidth+10}px`
            let menuWidthElement = this.menuElement.offsetWidth
            this.menuElement.style.right = `-${menuWidthElement}px`
        })
    }
    setLoop(){
        // Video is on loop when click on the button loop
        let loopStatus = false
        this.loopElement.addEventListener('click', () =>{
            if(loopStatus === false){
                this.videoElement.setAttribute('loop','')
                this.loopElement.classList.add('is-active')
                loopStatus = true
            }
            else if(loopStatus === true){
                this.videoElement.removeAttribute('loop','')
                this.loopElement.classList.remove('is-active')
                loopStatus = false
            }
        })
    }
    setTitle(){
        // Displays the title of the current video
        this.titleCurrentVideo.forEach((_element) =>{
            let titleVideoWidth = _element.offsetWidth
            _element.style.left = `calc(50% - ${titleVideoWidth/2}px)`
        })
    }
    setFullScreen(){
        // Fullscreen on the fullscreen button
        this.fullscreenElement.addEventListener('click', () =>{
            this.videoElement.requestFullscreen()
        })
        // Fullscreen when F is press
        window.addEventListener('keydown', event =>{
            if(event.key === 'f' || event.key === 'F'){
                this.videoElement.requestFullscreen()
            }
        })

        // Fullscreen when doubleclick on the video
        this.videoElement.addEventListener('dblclick', ()=>{
            this.videoElement.requestFullscreen()
            })
    }
    setPlayPause(){
        let playStatus = false
        // Play or pause when click on the button play/pause
        this.playElement.addEventListener('click', (event) =>{
            if(playStatus === false){
                this.videoElement.play()
                this.playElement.classList.remove('play-button')
                this.playElement.classList.add('pause-button')
                playStatus = true
            }
            else{
                this.videoElement.pause()
                this.playElement.classList.add('play-button')
                this.playElement.classList.remove('pause-button')
                playStatus = false
            }
        })
        // Play or pause when click on the video
        this.videoElement.addEventListener('click', () =>{
                if(playStatus === false){
                    this.videoElement.play()
                    this.playElement.classList.remove('play-button')
                    this.playElement.classList.add('pause-button')
                    playStatus = true
                }
                else{
                    this.videoElement.pause()
                    this.playElement.classList.add('play-button')
                    this.playElement.classList.remove('pause-button')
                    playStatus = false
                }
            })
        // Play or pasue when the spacebar is press
        window.addEventListener('keydown', (event) =>{
            if(event.key === ' ' && playStatus === false){
                this.videoElement.play()
                this.playElement.classList.remove('play-button')
                this.playElement.classList.add('pause-button')
                playStatus = true
            }
            else if(event.key === ' ' && playStatus === true){
                this.videoElement.pause()
                this.playElement.classList.add('play-button')
                this.playElement.classList.remove('pause-button')
                playStatus = false
            }
        })
    }
    setVolume(){
        let volumeStatus = true
        // Muted or unmuted when click on the button volume
        this.volumeElement.addEventListener('click', () =>{
            if(volumeStatus === true){
                volumeStatus = false
                this.videoElement.volume = 0
                this.volumeElement.classList.add('volume-muted-button')
                this.volumeElement.classList.remove('volume-full-button')
            }
            else if(volumeStatus === false){
                volumeStatus = true
                this.videoElement.volume = 1
                this.volumeElement.classList.remove('volume-muted-button')
                this.volumeElement.classList.add('volume-full-button')
            }
        })
        
        // Volume up or down when the arrow top or bottom is press
        window.addEventListener('keydown', (event) =>{
            // Volume down
            if(event.key === 'ArrowDown'){
                this.seekBarVolumeFill.style.transform = `scaleY(${this.videoElement.volume})`
                this.videoElement.volume = Math.max(this.videoElement.volume - 0.1, 0)
                if(this.videoElement.volume > 0.5){
                    this.volumeElement.classList.add('volume-full-button')
                    this.volumeElement.classList.remove('volume-medium-button')
                    this.volumeElement.classList.remove('volume-muted-button')

                }
                else if(this.videoElement.volume > 0 && this.videoElement.volume <= 0.5){
                    this.volumeElement.classList.add('volume-medium-button')
                    this.volumeElement.classList.remove('volume-muted-button')
                    this.volumeElement.classList.remove('volume-full-button')
                }
                else if(this.videoElement.volume === 0){
                    this.volumeElement.classList.remove('volume-medium-button')
                    this.volumeElement.classList.add('volume-muted-button')
                    this.volumeElement.classList.remove('volume-full-button')
                }
            }
            // Volume Up
            else if(event.key === 'ArrowUp'){
                this.seekBarVolumeFill.style.transform = `scaleY(${this.videoElement.volume})`
                this.videoElement.volume = Math.min(this.videoElement.volume + 0.1, 1)
                    if(this.videoElement.volume > 0.5){
                        this.volumeElement.classList.add('volume-full-button')
                        this.volumeElement.classList.remove('volume-medium-button')
                        this.volumeElement.classList.remove('volume-muted-button')
                    }
                    else if(this.videoElement.volume > 0 && this.videoElement.volume <= 0.5){
                        this.volumeElement.classList.add('volume-medium-button')
                        this.volumeElement.classList.remove('volume-muted-button')
                    }
                }
            // Volume muted when M is press
            else if(event.key === 'm' && volumeStatus === true || event.key === 'M' && volumeStatus === true){
                this.videoElement.volume = 0
                volumeStatus = false
                this.volumeElement.classList.remove('volume-full-button')
                this.volumeElement.classList.remove('volume-medium-button')
                this.volumeElement.classList.add('volume-muted-button')
            }
            // Volume unmuted when M is press
            else if(event.key === 'm' && volumeStatus === false || event.key === 'M' && volumeStatus === false){
                this.videoElement.volume = 1
                volumeStatus = true
                this.volumeElement.classList.add('volume-full-button')
                this.volumeElement.classList.remove('volume-medium-button')
                this.volumeElement.classList.remove('volume-muted-button')
            }
        })
        
    }
    setSeekBar(){
        this.videoElement.addEventListener('timeupdate', () =>{
            const ratio = this.videoElement.currentTime / this.videoElement.duration

            this.fillElement.style.transform = `scaleX(${ratio})`
        })

        this.seekBarElement.addEventListener('click', (_event) =>{
            const bounding = this.seekBarElement.getBoundingClientRect()
            const ratio = (_event.clientX - bounding.left) / bounding.width
            const time = ratio * this.videoElement.duration

            this.videoElement.currentTime = time
        })
        // Press a number between 0 and 9 and go to the percentage of the video
        // Time is forward or rewind by 10s when arrowLeft or arrowRight is press
        document.addEventListener('keydown', (event) =>{
            // Time to 0% video
            if(event.key === 'à' || event.key === '0'){
                this.videoElement.currentTime = (this.videoElement.duration / this.videoElement.currentTime) * 0
            }
            // Time to 10% video
            else if(event.key === '&' || event.key === '1'){
                this.videoElement.currentTime = (this.videoElement.duration * (10 / 100))
            }
            // Time to 20% video
            else if(event.key === 'é' || event.key === '2'){
                this.videoElement.currentTime = (this.videoElement.duration * (20 / 100))
            }
            // Time to 30% video
            else if(event.key === '"' || event.key === '3'){
                this.videoElement.currentTime = (this.videoElement.duration * (30 / 100))
            }
            // Time to 40% video
            else if(event.key === `'` || event.key === '4'){
                this.videoElement.currentTime = (this.videoElement.duration * (40 / 100))
            }
            // Time to 50% video
            else if(event.key === '(' || event.key === '5'){
                this.videoElement.currentTime = (this.videoElement.duration * (50 / 100))
            }
            // Time to 60% video
            else if(event.key === '§' || event.key === '6'){
                this.videoElement.currentTime = (this.videoElement.duration * (60 / 100))
            }
            // Time to 70% video
            else if(event.key === 'è' || event.key === '7'){
                this.videoElement.currentTime = (this.videoElement.duration * (70 / 100))
            }
            // Time to 80% video
            else if(event.key === '!' || event.key === '8'){
                this.videoElement.currentTime = (this.videoElement.duration * (80 / 100))
            }
            // Time to 90% video
            else if(event.key === 'ç' || event.key === '9'){
                this.videoElement.currentTime = (this.videoElement.duration * (90 / 100))
            }
            // Rewind video by 10 sec
            else if(event.key === 'ArrowLeft'){
                this.videoElement.currentTime = this.videoElement.currentTime - 10
                this.rewindElement.classList.add('is-active')
            }
            // Forward video by 10 sec
            else if(event.key === 'ArrowRight'){
                this.videoElement.currentTime = this.videoElement.currentTime + 10
                this.forwardElement.classList.add('is-active')
            }
        })
        // Remove mark rewind / forward
        document.addEventListener('keyup', (event) =>{
            if(event.key === 'ArrowLeft'){
                this.rewindElement.classList.remove('is-active')
            }
            else if(event.key === 'ArrowRight'){
                this.forwardElement.classList.remove('is-active')
            }
        })
    }
}

const player = new Player(document.querySelector('.js-player'))