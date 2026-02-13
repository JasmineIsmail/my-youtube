export const  relativeTimeFormat = (isoDate)=>{

    const videoDate = new Date(isoDate);
    const currentDate = new Date();
    
     //calculate time differrence

    const timeDifference= currentDate.getTime() - videoDate.getTime();
    
    // define time constants

    const minute =60;
    const hour= minute*60;
    const day= hour*24;
    const month = day*30;
    const year= month*12;

    if(timeDifference <minute)
        return "just now"
    else if( timeDifference <hour){
        const minutes = Math.floor(timeDifference/minute);
        return `${minutes} minute ${(minutes>1)? "s" :""} ago`;
    }else if(timeDifference < day){
        const hours= Math.floor(timeDifference/hour);
        return `${hours} hour ${hours >1 ? "s" :""} ago`;
    }else if(timeDifference < month){
        const days= Math.floor(timeDifference/day);
        return `${days} day ${days >1 ? "s" :""} ago`;
    }else if(timeDifference < year){
        const months= Math.floor(timeDifference/month);
        return `${months} month ${months >1 ? "s" :""} ago`;
    }else{
        const years = Math.floor(timeDifference/year)
        return `${years} year ${years >1 ? "s" : ""} ago`
    }
}