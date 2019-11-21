class Player{
    constructor(_element){
        this.element = _element
        this.videoElement = this.element.querySelector('.js-video')

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

        this.setVideo()
        this.setMenuVideo()
        this.setLoop()
        this.setTitle()
        this.setFullScreen()
        this.setPlayPause()
        this.setVolume()
        this.setSeekBar()
    }
    setVideo(){
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

                    _element.classList.toggle('video-current')

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
        const loopElement = document.querySelector('.js-loop-button')
        let loopStatus = false
        loopElement.addEventListener('click', () =>{
            if(loopStatus === false){
                this.videoElement.setAttribute('loop','')
                loopElement.classList.add('is-active')
                loopStatus = true
            }
            else if(loopStatus === true){
                this.videoElement.removeAttribute('loop','')
                loopElement.classList.remove('is-active')
                loopStatus = false
            }
        })
    }
    setTitle(){
        // Displays the title of the current video
        this.titleCurrentVideo.forEach((_element) =>{
            let titleVideoWidth = _element.offsetWidth
            _element.style.left = `calc(50% - ${titleVideoWidth/2}px)`
            console.log(titleVideoWidth)
        })
    }
    setFullScreen(){
        const fullscreenElement = this.element.querySelector('.js-fullscreen')
        // Fullscreen on the fullscreen button
        fullscreenElement.addEventListener('click', () =>{
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
        const playElement = this.element.querySelector('.js-play-button')
        let playStatus = false
        // Play or pause when click on the button play/pause
        playElement.addEventListener('click', (event) =>{
            if(playStatus === false){
                this.videoElement.play()
                playElement.classList.remove('play-button')
                playElement.classList.add('pause-button')
                playStatus = true
            }
            else{
                this.videoElement.pause()
                playElement.classList.add('play-button')
                playElement.classList.remove('pause-button')
                playStatus = false
            }
        })
        // Play or pause when click on the video
        this.videoElement.addEventListener('click', () =>{
                if(playStatus === false){
                    this.videoElement.play()
                    playElement.classList.remove('play-button')
                    playElement.classList.add('pause-button')
                    playStatus = true
                }
                else{
                    this.videoElement.pause()
                    playElement.classList.add('play-button')
                    playElement.classList.remove('pause-button')
                    playStatus = false
                }
            })
        // Play or pasue when the spacebar is press
        window.addEventListener('keydown', (event) =>{
            if(event.key === ' ' && playStatus === false){
                this.videoElement.play()
                playElement.classList.remove('play-button')
                playElement.classList.add('pause-button')
                playStatus = true
            }
            else if(event.key === ' ' && playStatus === true){
                this.videoElement.pause()
                playElement.classList.add('play-button')
                playElement.classList.remove('pause-button')
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
        const seekBarElement = this.element.querySelector('.js-seek-bar')
        const fillElement = this.element.querySelector('.js-seek-bar-fill')

        this.videoElement.addEventListener('timeupdate', () =>{
                const ratio = this.videoElement.currentTime / this.videoElement.duration

                fillElement.style.transform = `scaleX(${ratio})`
            })

            seekBarElement.addEventListener('click', (_event) =>{
                const bounding = seekBarElement.getBoundingClientRect()
                const ratio = (_event.clientX - bounding.left) / bounding.width
                const time = ratio * this.videoElement.duration

                this.videoElement.currentTime = time
            })
        // Press a number between 0 and 9 and go to the percentage of the video
        // Time is forward or rewind by 10s when arrowLeft or arrowRight is press
        const rewindElement = document.querySelector('.js-rewind-video')
        const forwardElement = document.querySelector('.js-forward-video')
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
                    rewindElement.classList.add('is-active')
                    console.log(this.videoElement.currentTime)
                }
                // Forward video by 10 sec
                else if(event.key === 'ArrowRight'){
                    this.videoElement.currentTime = this.videoElement.currentTime + 10
                    forwardElement.classList.add('is-active')
                    console.log(this.videoElement.currentTime)
                }
            })
        // Remove mark rewind / forward
        document.addEventListener('keyup', (event) =>{
            if(event.key === 'ArrowLeft'){
                rewindElement.classList.remove('is-active')
            }
            else if(event.key === 'ArrowRight'){
                forwardElement.classList.remove('is-active')
            }
        })
    }
}

const player = new Player(document.querySelector('.js-player'))

let dragItem = document.querySelector(".js-seek-bar-fill");
let container = document.querySelector(".js-seek-bar");

let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if(e.type === "touchstart"){
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } 
    else{
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if(e.target === dragItem){
        active = true;
    }
}

function dragEnd(e){
    initialX = currentX;
    initialY = currentY;

    active = false;
}

function drag(e){
    if(active){
        e.preventDefault();
        if(e.type === "touchmove"){
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } 
        else{
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, dragItem);
    }
}

function setTranslate(xPos, yPos, el){
    el.style.transform = `scaleX( ${xPos}px, 0px, 0)`;
}