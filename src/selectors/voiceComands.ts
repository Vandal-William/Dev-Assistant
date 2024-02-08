import {calendar, days, agenda} from "./calendar"
import {responseData} from "../@types/responseData"

export default function voiceCommands (transcript : string){

    console.log(transcript)

    if (transcript?.toLocaleLowerCase().includes("voir mon agenda")){
      
        if (agenda.length === 0){
            responseData.get = 'Votre agenda est vide !'
            responseData.voiceResponse = 'Votre agenda est vide !'  
        }else {
            responseData.get = 'voici votre agenda'
            responseData.voiceResponse = 'voici votre agenda'
        }
    }

    if (transcript?.toLocaleLowerCase().includes("quelle heure est-il")){
        const maintenant = new Date();
        const heure = maintenant.getHours();
        const minutes = maintenant.getMinutes();

        const heureString = (heure < 10 ? '0' : '') + heure;
        const minutesString = (minutes < 10 ? '0' : '') + minutes;

        const heureActuelle = heureString + ':' + minutesString;

        responseData.get = `il est ${heureActuelle}`; 
        responseData.voiceResponse = `il est ${heureActuelle}`;

    }

    if (days.some(day => transcript?.toLowerCase().includes(day))){ 

        responseData.get = calendar(transcript);
        responseData.voiceResponse = calendar(transcript);
    }

    return responseData

}