import firebase from "firebase/compat";

export default interface IClip {
    uid: string;
    displayName: string;
    title: string;
    fileName: string;
    url: string;
    timestamp: firebase.firestore.FieldValue;
    docID?: string;
}


