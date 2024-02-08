import {calendar, days, agenda} from "./calendar"

export default function voiceCommands (transcript : string){

    console.log(transcript)
    let response = ''

    if (!transcript){

       response = 'Que puis-je faire pour vous ?'
    }

    if (transcript?.toLocaleLowerCase().includes("voir mon agenda")){
      
        if (agenda.length === 0){
            response = 'Votre agenda est vide !'  
        }else {
            response = 'voici votre agenda'
        }
    }

    if (transcript?.toLocaleLowerCase().includes("quelle heure est-il")){
        const maintenant = new Date();
        const heure = maintenant.getHours();
        const minutes = maintenant.getMinutes();

        const heureString = (heure < 10 ? '0' : '') + heure;
        const minutesString = (minutes < 10 ? '0' : '') + minutes;

        const heureActuelle = heureString + ':' + minutesString;

        response = `il est ${heureActuelle}`; 

    }

    if (days.some(day => transcript?.toLowerCase().includes(day))){ 

        response = calendar(transcript);
    }

    return response

}