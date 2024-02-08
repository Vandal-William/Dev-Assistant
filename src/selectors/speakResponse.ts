export function speak(text : string | undefined) : void{
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }