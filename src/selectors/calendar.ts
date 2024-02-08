export const days = [
    'lundi','mardi','mercredi','jeudi',
    'vendredi','samedi','dimanche'
];

export const months = [
    "janvier", "février", "mars", "avril", "mai", "juin",
    "juillet", "août", "septembre", "octobre", "novembre", "décembre"
];

export const agenda = [];

export function calendar (transcript : string){
    
    let day = null;
    let numberOfDay = null;
    let month = null;
    let hour = null;
    let subject = null;
    let response = ''

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

    console.log(day, numberOfDay, month, hour, subject)

    if(day !== null && numberOfDay !== null && month !== null && hour !== null && subject !== null){

        response = `Votre rendez-vous du ${day} ${numberOfDay} ${month} à ${hour} pour ${subject} a bien été enregistrer`
    }

    return response

}