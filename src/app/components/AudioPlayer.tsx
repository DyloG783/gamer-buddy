// // AudioPlayer.js
// import React, { useState, useRef } from 'react';

// const AudioPlayer = ({ src }: { src: string }) => {
//     const audioRef = useRef(null);
//     const [isPlaying, setIsPlaying] = useState(false);

//     const togglePlay = () => {
//         if (isPlaying) {
//             audioRef.current.pause();
//         } else {
//             audioRef.current.play();
//         }
//         setIsPlaying(!isPlaying);
//     };

//     return (
//         <div>
//             <audio ref={audioRef} src={src} />
//             <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
//         </div>
//     );
// };

// export default AudioPlayer;