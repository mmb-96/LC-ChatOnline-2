// Interfaz para recuperar los mensajes o enviarlos.
export interface Message {
    content: string;
    type: string;
    date: Date;
    userName: string;
}
