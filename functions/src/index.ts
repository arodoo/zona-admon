
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";



export const helloWorld = onRequest((request, response) => {
    logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});


import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const makeAdmin = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'El usuario no está autenticado.');
    }
    if (!context.auth.token.admin) {
        throw new functions.https.HttpsError('permission-denied', 'El usuario no tiene permisos para asignar roles de administrador.');
    }
    const uid = data.uid;
    try {
        await admin.auth().setCustomUserClaims(uid, { admin: true });
        return { result: `Usuario ${uid} ahora es administrador.` };
    } catch (error) {
        throw new functions.https.HttpsError('internal', `Error al asignar permisos de administrador: ${error}`);
    }
});

export const makeVisualizer = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'El usuario no está autenticado.');
    }
    if (!context.auth.token.admin) {
        throw new functions.https.HttpsError('permission-denied', 'El usuario no tiene permisos para asignar roles de visualizador.');
    }
    const uid = data.uid;
    try {
        await admin.auth().setCustomUserClaims(uid, { visualizer: true });
        return { result: `Usuario ${uid} ahora es visualizador.` };
    } catch (error) {
        throw new functions.https.HttpsError('internal', `Error al asignar permisos de visualizador: ${error}`);
    }
}
);


export const deactivateSomeoneElseUser = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'El usuario no está autenticado.');
    }
    if (!context.auth.token.admin) {
        throw new functions.https.HttpsError('permission-denied', 'El usuario no tiene permisos para desactivar usuarios.');
    }
    const uid = data.uid;
    try {
        await admin.auth().updateUser(uid, { disabled: true });
        await admin.firestore().collection('users').doc(uid).update({ isActive: false });
        return { result: `Usuario ${uid} desactivado con éxito.` };
    } catch (error) {
        throw new functions.https.HttpsError('internal', `Error al desactivar el usuario ${uid}: ${error}`);
    }
});





