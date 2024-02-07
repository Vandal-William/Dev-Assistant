const days = [
    'lundi','mardi','mercredi','jeudi',
    'vendredi','samedi','dimanche'
];

const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];

const agenda = [];

export default function voiceCommands (transcript : string){
    console.log(transcript)
    let response = ''
    if (transcript.toLocaleLowerCase().includes("voir mon agenda")){
      
        if (agenda.length === 0){
            response = 'Votre agenda est vide !'  
        }else {
            response = 'voici votre agenda'
        }
    }

    if (transcript.toLocaleLowerCase().includes("quelle heure est-il")){
        const maintenant = new Date();
        const heure = maintenant.getHours();
        const minutes = maintenant.getMinutes();

        const heureString = (heure < 10 ? '0' : '') + heure;
        const minutesString = (minutes < 10 ? '0' : '') + minutes;

        const heureActuelle = heureString + ':' + minutesString;

        response = `il est ${heureActuelle}`; 

    }

    if (days.some(day => transcript.toLowerCase().includes(day))){ 
        
        let day = null;
        let numberOfDay = null;
        let month = null;
        let hour = null;
        let subject = null;

        const dayFollowedByNumberRegex = new RegExp(`(${days.join('|')})\\s(\\d+)`, 'i');
        const matchDayAndNumber = transcript.match(dayFollowedByNumberRegex);

        if (matchDayAndNumber) {
            day = matchDayAndNumber[1];
            numberOfDay = matchDayAndNumber[2];
            month = months.find(month => transcript.toLowerCase().includes(month));

            if (month) {
                const hourRegex = /\b\d{1,2}h(?:\d{1,2})?\b/;
                const matchHour = transcript.match(hourRegex);

                if (matchHour) {
                    hour = matchHour[0];
                    subject = transcript.substring(transcript.indexOf(hour) + hour.length).trim();
                }
            }
        }

        if(day !== null && numberOfDay !== null && month !== null && hour !== null && subject !== null){

            response = `Votre rendez-vous du ${day} ${numberOfDay} ${month} à ${hour} pour ${subject} a bien été enregistrer`
        }

    }

    return response
}