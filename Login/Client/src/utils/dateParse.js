

    export default function(input){
    
        let date = Date.parse(input)
        let diff = Date.now() - date
        let days = Math.floor(diff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
        return days ? ` ${days} day ago ` : hours ? `${hours} hr ago ` : minutes ? `${minutes} mins ago` : seconds ? `${seconds} seconds ago` : null
    
    
    }