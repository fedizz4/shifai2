// Import des modules nécessaires
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { AngularFirestore, CollectionReference, DocumentData, DocumentSnapshot, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { getStorage } from 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { QueryDocumentSnapshot, getFirestore } from 'firebase/firestore';
import { p } from './app/patient/patient.page';
import { consultationdate } from './app/consultationliste/consultationliste.page';
import { ToastController } from '@ionic/angular';



// Configuration Firebase

export const firebaseConfig = {
  apiKey: "AIzaSyA7iKnEnxTdm9UdRnegNamwRDsLFESDk7s",
  authDomain: "shifai-f46a0.firebaseapp.com",
  projectId: "shifai-f46a0",
  storageBucket: "shifai-f46a0.appspot.com",
  messagingSenderId: "383597072570",
  appId: "1:383597072570:web:870d9d280b22a1aa28b283",
  measurementId: "G-Y2QLPH92NB"
};

// Initialisation Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(app, 'gs://shifai-f46a0.appspot.com');

const analytics = getAnalytics(app);

// Objet d'authentification pour être utilisé dans d'autres fichiers




// Fonction pour connecter l'utilisateur
/* export async function loginUser(email: string, password: string) {
  try {
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Utilisateur connecté :', userCredential.user);
    return userCredential;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
*/
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, RendezVousData };






export async function AddUser(firestore: AngularFirestore, app: FirebaseApp, familyName: string, name: string, email: string, password: string, date: string, sexe: string, role: string) {
  const user = {
    familyName: familyName,
    name: name,
    email: email,
    password: password,
    date: date,
    sexe: sexe,
    role: role,
  };

  try {
    // Ajouter l'utilisateur à la collection "inscrits"
    const userDocRef = await firestore.collection('inscrits').add(user);

    console.log('Utilisateur ajouté avec succès à Firebase.');

    // Récupérer l'uid généré pour ce document
    const uid = userDocRef.id;

    // Mettre à jour le document avec l'uid
    await userDocRef.update({ uid: uid });

    console.log('UID ajouté avec succès à l\'utilisateur.');

    // Créer une sous-collection "rdv" pour l'utilisateur
    await userDocRef.collection('rdv').add({}); // Ajouter ici les données de rendez-vous si nécessaire
    await userDocRef.collection('documents').add({});

    console.log('Sous-collection "rdv" créée avec succès pour l\'utilisateur.');

  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur et de la sous-collection "rdv" à Firebase :', error);
    throw error; // Vous pouvez gérer l'erreur selon vos besoins
  }
}
export async function AddUserToAuth(auth: AngularFireAuth, email: string, password: string) {
  try {
    // Ajouter l'utilisateur à l'authentification Firebase
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    console.log('Utilisateur ajouté avec succès à l\'authentification Firebase.');
    return userCredential.user;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur à l\'authentification Firebase :', error);
    throw error; // Vous pouvez gérer l'erreur selon vos besoins
  }
}
interface MedicamentDat {
  idd:string;
  nom: string;
  dosage: number;
  prises: {
    label: string;
    checked: boolean;
  }[];
}
export async function AddMedicament(firestore: AngularFirestore, app: FirebaseApp, nom: string, dosage: number, prises: any[], uid:string) {
  const medicament = {
    nom: nom,
    dosage: dosage,
    prises: prises.map(prise => ({
      label: prise.label,
      checked: prise.checked
    })),
    uid: uid,
  };

  try {
    
    const medref =await firestore.collection('medicaments').add(medicament);
    const uid = medref.id;

    // Mettre à jour le document avec l'uid
    await medref.update({ idd: uid });


  } catch (error) {
    console.error('Erreur lors de l\'ajout du médicament:', error);
    throw error;  // Renvoyer l'erreur pour que le gestionnaire puisse la gérer
  }
}
export async function ModifierMedicament(firestore: AngularFirestore, medicamentID: string, nom: string, dosage: number, prises: any[]) {
  const medicament = {
    nom: nom,
    dosage: dosage,
    prises: prises.map(prise => ({
      label: prise.label,
      checked: prise.checked
    })),
  };

  try {
    await firestore.collection('medicaments').doc(medicamentID).update(medicament);
    console.log('Médicament mis à jour avec succès.');
  } catch (error) {
    console.error('Erreur lors de la modification du médicament:', error);
    throw error;  // Renvoyer l'erreur pour que le gestionnaire puisse la gérer
  }
}



interface MedicamentData {
  class: string;
  conditionnement: string;
  conservation: string;
  amm: string;
  dateamm: string;
  dci: string;
  dosage: string;
  forme: string;
  indication: string;
  laboratoire: string;
  sousclass: string;
  specialite: string;
  specification: string;
  tableau: string;
}

export async function getMedicamentsByUid(firestore: AngularFirestore, uid: string) {
  try {
    const snapshot = await firestore.collection('medicaments').ref.where('uid', '==', uid).get();
  
    // Convertir le snapshot en tableau de médicaments en utilisant l'interface
    const medicaments: MedicamentDat[] = snapshot.docs.map(doc => {
      const data = doc.data() as MedicamentDat; // Cast vers l'interface définie
      return { id: doc.id, ...data };
    });
  
    return medicaments;
  } catch (error) {
    console.error('Erreur lors de la récupération des médicaments :', error);
    throw error;
  }
  
  
}

export async function getMedicamentsByid(firestore: AngularFirestore, id: string) {
  try {
    const snapshot = await firestore.collection('medicaments').doc(id).ref.get() ;

    // Convertir le snapshot en tableau de médicaments en utilisant l'interface
    const medicaments: MedicamentDat[] = [snapshot.data() as MedicamentDat];

    return medicaments[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des médicaments :', error);
    throw error;
  }
}
export async function modifierMedicament(firestore:AngularFirestore,medicamentId : string ,medicament: {dosage: number; nom: string; prises: { checked: boolean; label: string }[]; uid: string }) {
  const medicamentDoc = firestore.collection(`medicaments`).doc(medicamentId);
  medicamentDoc.update({
    dosage: medicament.dosage,
    nom: medicament.nom,
    prises: medicament.prises,
  });
}

export async function supprimerMedicament(firestore:AngularFirestore,medicamentId: string) {
  firestore.collection('medicaments').doc(medicamentId).delete().then(() => {
    console.log('Médicament supprimé avec succès!');
    // Afficher un message de succès
  
  }).catch((error) => {
    console.error('Erreur lors de la suppression du médicament :', error);
    // Afficher un message d'erreur
  });
}

export async function getMedicaments(firestore: AngularFirestore) {
  try {
    const snapshot = await firestore.collection('med').ref.get();
  
    // Convertir le snapshot en tableau de médicaments en utilisant l'interface
    const medicaments: MedicamentData[] = snapshot.docs.map(doc => {
      const data = doc.data() as MedicamentData; // Cast vers l'interface définie
      return { id: doc.id, ...data };
    });
  
    return medicaments;
  } catch (error) {
    console.error('Erreur lors de la récupération des médicaments :', error);
    throw error;
  }
  
}
interface MedecinData {
  uid:string,
  nom:string,
  prenom:string,
  sexe:string,
  email: string,
  password: string,
  date: string,
  delegation: string,
  etat: string,
  specialite: string,
  telephone: string,
}




export async function getMedecinsByLocalisationAndSpecialite(firestore: AngularFirestore, localisation: string | null, specialite: string | null) {
  try {
    const snapshot = await firestore.collection('medecin').ref.where('specialite', '==', specialite).where('etat', '==', localisation).get();

    // Vérifier si snapshot est défini avant de l'utiliser
    if (snapshot) {
      // Convertir le snapshot en tableau de médecins
      const medecins: MedecinData[] = snapshot.docs.map(doc => {
        const data = doc.data() as MedecinData;
        return { id: doc.id, ...data };
      });

      return medecins;
    } else {
      console.error('La requête n\'a pas renvoyé de snapshot.');
      return []; // Ou lancez une erreur appropriée selon vos besoins
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des médecins (firebase) :', error);
    throw error;
  }
}

export async function AddMedecin(
  firestore: AngularFirestore,
  storage: AngularFireStorage,
  nom: string,
  prenom: string,
  email: string,
  password: string,
  date: string,
  sexe: string,
  role: string,
  delegation: string,
  etat: string,
  specialite: string,
  telephone: string,
  file: File | null
) {
  let fileUrl: string | null = null;

  if (file) {
    const filePath = `gs://shifai-f46a0.appspot.com/${file.name}`; // Replace 'votre/chemin/dans/storage' with your storage path
    const fileRef = storage.refFromURL(filePath);

    const uploadTask = fileRef.put(file);

    await uploadTask.snapshotChanges().pipe(
      finalize(async () => {
        fileUrl = await fileRef.getDownloadURL().toPromise(); // Wait for the Observable to resolve
      })
    ).toPromise(); // Wait for the upload task to complete
  }

  async function AddMedecin(firestore: AngularFirestore, nom: string, prenom: string, email: string, password: string, date: string, sexe: string, role: string, specialite: string, telephone: string, fileUrl: string, delegation: string, etat: string) {
    try {
      const medecin = {
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        date: date,
        sexe: sexe,
        role: role,
        specialite: specialite,
        telephone: telephone,
        fileUrl: fileUrl,
        delegation: delegation,
        etat: etat,
      };
  
      // Ajoutez le médecin à la collection "admin"
      const medecinRef = await firestore.collection('admin').add(medecin);
  
      // Récupérez l'ID du médecin nouvellement ajouté
      const medecinId = medecinRef.id;
      await medecinRef.update({ uid: medecinRef.id });


  
      // Créez automatiquement une sous-collection "appointments" pour ce médecin
      await firestore.collection('admin').doc(medecinId).collection('rdv').add({ /* Données initiales des rendez-vous si nécessaire */ });
  
      console.log('Médecin ajouté avec succès à Firebase.');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du médecin à Firebase :', error);
    }
  }
}  



export async function getMedecinByUid(firestore: AngularFirestore, uid: string) {
  const snapshot = await firestore.collection('medecin').ref.where('uid', '==', uid).get();
  if (snapshot) {
    // Convertir le snapshot en tableau de médecins
    const medecins: MedecinData[] = snapshot.docs.map(doc => {
      const data = doc.data() as MedecinData;
      return { id: doc.id, ...data };
    });

    return medecins;
      } else {
        console.log('Aucun médecin trouvé pour cet UID :', uid);
        return null; // Ou renvoyez un objet vide, selon vos besoins
      }
    }
    export async function getMedecinByUidA(firestore: AngularFirestore, uid: string) {
      try {
        const snapshot = await firestore.collection('medecin').ref.where('uid', '==', uid).get();
        if (!snapshot.empty) {
          const doc = snapshot.docs[0]; // Récupérez le premier document du snapshot
          const data = doc.data() as MedecinData;
          const medecin: MedecinData = {  ...data };
          return medecin;
        } else {
          console.log('Aucun médecin trouvé pour cet UID :', uid);
          return null; // Ou renvoyez un objet vide, selon vos besoins
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du médecin :', error);
        return null;
      }
    }
    
  
  

    export async function loginMedecins(firestore: AngularFirestore, email: string, password: string): Promise<{ medecinData: any, uid: string } | null> {
      try {
        // Recherchez le médecin dans la base de données avec l'email fourni
        const medecinCollection: CollectionReference<DocumentData> = firestore.collection('medecin').ref as CollectionReference<DocumentData>;
        const medecinQuery: QuerySnapshot<DocumentData> = await medecinCollection.where('email', '==', email).get();
    
        if (medecinQuery.size === 1) {
          // Vérifiez le mot de passe (vous pouvez utiliser une bibliothèque de hachage appropriée)
          const medecinData = medecinQuery.docs[0].data() as { password?: string };
          const uid = medecinQuery.docs[0].id;
    
          if (medecinData && medecinData.password === password) {
            console.log('Connexion réussie en tant que médecin.');
            return { medecinData, uid }; // Authentification réussie, renvoie les informations du médecin et son UID
          }
        }
    
        console.error('Identifiants invalides.');
        return null; // Authentification échouée
    
      } catch (error) {
        console.error('Erreur lors de la connexion du médecin :', error);
        throw error; // Vous pouvez gérer l'erreur ici ou la laisser remonter
      }
    }
    export async function loginsecretaire(firestore: AngularFirestore, email: string, password: string) {
      try {
        // Recherchez le médecin dans la base de données avec l'email fourni
        const medecinCollection: CollectionReference<DocumentData> = firestore.collection('secretaire').ref as CollectionReference<DocumentData>;
        const secQuery: QuerySnapshot<DocumentData> = await medecinCollection.where('gmail', '==', email).get();
    
        if (secQuery.size === 1) {
          // Vérifiez le mot de passe (vous pouvez utiliser une bibliothèque de hachage appropriée)
          const secretaireData = secQuery.docs[0].data() as { password?: string , medecinUid:string };
          const uid = secQuery.docs[0].id;
    
          if (secretaireData&& secretaireData.password === password) {
            console.log('Connexion réussie en tant que médecin.');
            medsec=secretaireData.medecinUid ;
            
            return { secretaireData, uid }; // Authentification réussie, renvoie les informations du médecin et son UID
          }
        }
    
        console.error('Identifiants invalides.');
        return null; // Authentification échouée
    
      } catch (error) {
        console.error('Erreur lors de la connexion du médecin :', error);
        throw error; // Vous pouvez gérer l'erreur ici ou la laisser remonter
      }
    }
  export let medsec:string ;
    export let secuid = { uid: '' };
    export const medecinUid = { uid: '' };

    export async function ajouterSecretaire(
      firestore: AngularFirestore,
      nom: string,
      prenom: string,
      mail: string,
      numero: string,
      password: string,
      medecinUid: string
    ) {
      try {
        // Ajoutez votre logique pour ajouter les données du formulaire à la collection 'secretaire'
        // Utilisez firestore.collection('secretaire') pour accéder à la collection 'secretaire' dans Firebase

        const secretaire ={
       
          nom: nom,
          prenom: prenom,
          mail: mail,
          numero: numero,
          password: password,
          medecinUid: medecinUid
        };
        const userDocRef = await firestore.collection('secretaire').add(secretaire);


        const uid = userDocRef.id;

    // Mettre à jour le document avec l'uid
    await userDocRef.update({ uid: uid });
    
        console.log('Secrétaire ajoutée avec succès à la base de données.');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du secrétaire à la base de données :', error);
        throw error; // Vous pouvez gérer l'erreur ici ou la laisser remonter
      }
    }
   
    
    
    interface secretaireData {
      uid:string ;
      prenom : string ;
      nom : string ;
      numero : string ;
      gmail : string ;
      password : string ;
    }
    export async function getSecretaireByUid  (firestore: AngularFirestore, uid: string) {
        const snapshot1 = await firestore.collection('secretaire').ref.where('medecinUid', '==', uid).get();


        const secretaires: secretaireData[] = snapshot1.docs.map(doc => {
          const data = doc.data() as secretaireData;
    
          return {
            uid: doc.id,
            nom: data.nom,
            prenom: data.prenom,
            gmail: data.gmail,
            numero: data.numero,
            password: data.password,
          };
        });
          return secretaires;

       


      
        }
        export async function getSecretaireBysecUid(firestore: AngularFirestore, uid: string) {
          try {
            // Récupérer le document du secrétaire par UID
            const secretaireDoc = await firestore.collection('secretaire').doc(uid).ref.get();
        
            // Vérifier si le document existe
            if (secretaireDoc) {
              // Récupérer les données du secrétaire à partir du document
              const secretaireData = secretaireDoc.data() as secretaireData;
              return secretaireData;
            } else {
              console.log('Aucun secrétaire trouvé avec l\'UID spécifié.');
              return null;
            }
          } catch (error) {
            console.error('Erreur lors de la récupération du secrétaire :', error);
            throw error; // Vous pouvez gérer l'erreur ici ou la laisser remonter
          }
        }
        export async function modifierSecretaire(
          firestore: AngularFirestore,
          secretaireID: string,
          nom: string,
          prenom: string,
          mail: string,
          numero: string,
          password: string,
          medecinUid: string
        ): Promise<void> {
          try {
            // Mettre à jour les données du secrétaire dans la collection 'inscrits'
            await firestore.collection('secretaire').doc(secretaireID).update({
              nom: nom,
              prenom: prenom,
              mail: mail,
              numero: numero,
              password: password,
              medecinUid: medecinUid
            });
        
            console.log('Secrétaire mis à jour avec succès dans la base de données.');
          } catch (error) {
            console.error('Erreur lors de la mise à jour du secrétaire dans la base de données :', error);
            throw error; // Vous pouvez gérer l'erreur ici ou la laisser remonter
          }
        }
        
        export async function supprimerSecretaire(firestore: AngularFirestore, secretaireId: string) {
          try {
              // Référence au document du secrétaire à supprimer
              const secretaireRef = firestore.collection('secretaire').doc(secretaireId);
      
              // Supprimer le document du secrétaire
              await secretaireRef.delete();
      
              console.log('Le secrétaire a été supprimé avec succès.');
          } catch (error) {
              console.error('Erreur lors de la suppression du secrétaire :', error);
          }
      }

    

    // firebaseConfig.ts

export async function getPatientsByMedecinUid(firestore: AngularFirestore, medecinUid: string) {
  try {
    const snapshot = await firestore.collection('patient').ref.where('medecinUid', '==', medecinUid).get();

    const patients: PatientData[] = snapshot.docs.map(doc => {
      const data = doc.data() as PatientData;

      return {
        uid: doc.id,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        age: data.age,
        sexe: data.sexe,
        useruid:data.useruid,
        groupeSanguin: data.groupeSanguin,
        situationFamiliale: data.situationFamiliale,
        profession: data.profession,
        telephone2: data.telephone2,
        numeroAssurance: data.numeroAssurance,
        adresse: data.adresse,
        note: data.note,
        antecedentsMedicaux: data.antecedentsMedicaux,
        antecedentsChirurgicaux: data.antecedentsChirurgicaux,
        antecedentsFamiliaux: data.antecedentsFamiliaux,
        autresAntecedents: data.autresAntecedents,
        medicaments: data.medicaments,
   
      };
    });

    return patients;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

   
    export interface PatientData {
      uid:string;
      nom: string;
      prenom: string;
      age: number;
      sexe: string;
      groupeSanguin: string;
      situationFamiliale: string;
      profession: string;
      email: string;
      telephone: string;
      telephone2: string;
      numeroAssurance: string;
      adresse: string;
      note: string;
      antecedentsMedicaux: string;
      antecedentsChirurgicaux: string;
      antecedentsFamiliaux: string;
      autresAntecedents: string;
      medicaments: string;
      useruid:string;
    }
    
    
   


    export interface MedicamentDD {
      class: string;
      conditionnement: string;
      conservation: string;
      amm: string;
      dateamm: string;
      dci: string;
      dosage: string;
      forme: string;
      indication: string;
      laboratoire: string;
      sousclass: string;
      specialite: string;
      specification: string;
      tableau: string;
    }
    

    export async function getMedicamentByName(firestore: AngularFirestore, nomMedicament: string) {
      const snapshot = await firestore.collection('med').ref.where('specialite', '==', nomMedicament).get();
    
      if (snapshot) {
        // Convertir le snapshot en tableau de médicaments
        const medicaments: MedicamentDD[] = snapshot.docs.map(doc => {
          const data = doc.data() as MedicamentDD;
          return { id: doc.id, ...data };
        });
    
        return medicaments;
      } else {
        console.log('Aucun médicament trouvé avec ce nom :', nomMedicament);
        return null; // Ou renvoyez un objet vide, selon vos besoins
      }
    }


    interface PersonneData {
      nom: string;
      prenom: string;
    }


  
    export async function getPersonByUid(firestore: AngularFirestore, uid: string) {
      try {
        const snapshot = await firestore.collection('personne').ref.where('uidPersonne', '==', uid).get();
    
        if (snapshot) {
          // Convertir le snapshot en objet personne
          const personne: PersonneData[] = snapshot.docs.map(doc => {
            const data = doc.data() as PersonneData;
            return { id: doc.id, ...data };
          });
          return personne;
        } else {
          console.log('Aucune personne trouvée avec cet UID :', uid);
          return null; // Ou renvoyez un objet vide, selon vos besoins
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la personne par UID:', error);
        throw error; // Vous pouvez gérer l'erreur selon vos besoins
      }
    }

    export async function savePersonData(firestore: AngularFirestore, nom: string, prenom: string, uidPersonne: string) {
      try {
        const personne = {
          nom: nom,
          prenom: prenom,
          uidPersonne: uidPersonne
        };
    
        await firestore.collection('personne').add(personne);
        console.log('Données de la personne enregistrées avec succès dans Firebase.');
      } catch (error) {
        console.error('Erreur lors de l\'enregistrement des données de la personne dans Firebase :', error);
        throw error;
      }
    }
    
    
    interface Consultation {
      uid? :string;
      date: string;
      details?: string;
    }
    
    export async function AddRendezVous(firestore: AngularFirestore, medecinId: string, rendezVousData: any) {
      try {
        // Enregistrer le rendez-vous dans la sous-collection "rdv" pour le médecin spécifié
        await firestore.collection('medecin').doc(medecinId).collection('rdv').add(rendezVousData);
    
        // Enregistrer le nom et le prénom du patient dans la liste des patients du médecin
        
        console.log('Rendez-vous ajouté avec succès à Firebase.');
    
      } catch (error) {
        console.error('Erreur lors de l\'ajout du rendez-vous à Firebase :', error);
      }
    }
    interface RendezVousData {
      present?: boolean;
      date: string;
      heure: string;
      nom: string;
      prenom: string;
      useruid: string;
      medecinNom?: string; // Ajout de la propriété medecinNom comme optionnelle
      medecinPrenom?: string; 
      medecinuid:string;// Ajout de la propriété medecinPrenom comme optionnelle
      key:string ;
      excuse?:string;
      statut?:string;
    }
    export async function getRdvByPatientUid(firestore: AngularFirestore,  userUid: string) {
      try {
        const snapshot = await firestore.collection('inscrits').doc(userUid).collection('rdv').ref.where('useruid', '==', userUid).get();
    
        if (snapshot) {
          // Convertir le snapshot en objet rendez-vous
          const rdv: RendezVousData[] = snapshot.docs.map(doc => {
            const data = doc.data() as RendezVousData;
            return { id: doc.id, ...data };
          });
          return rdv;
        } else {
          console.log('Aucun rendez-vous trouvé avec cet UID de patient :', userUid);
          return null; // Ou renvoyez un objet vide, selon vos besoins
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous par UID de patient:', error);
        throw error; // Vous pouvez gérer l'erreur selon vos besoins
      }
    }
    export async function getRdvdateByPatientUid(firestore: AngularFirestore,  userUid: string, date :string) {
      try {
        const snapshot = await firestore.collection('inscrits').doc(userUid).collection('rdv').ref.where('useruid', '==', userUid).where('date', '==', date).get();
    
        if (snapshot) {
          // Convertir le snapshot en objet rendez-vous
          const rdv: RendezVousData[] = snapshot.docs.map(doc => {
            const data = doc.data() as RendezVousData;
            return { id: doc.id, ...data };
          });
          return rdv;
        } else {
          console.log('Aucun rendez-vous trouvé avec cet UID de patient :', userUid);
          return null; // Ou renvoyez un objet vide, selon vos besoins
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous par UID de patient:', error);
        throw error; // Vous pouvez gérer l'erreur selon vos besoins
      }
    }
    
    
    export async function AddRendezVousForUser(firestore: AngularFirestore, userId: string, rendezVousData: RendezVousData) {
      try {
        // Ajoutez le rendez-vous à la sous-collection "rdv" pour l'utilisateur spécifié
        await firestore.collection('inscrits').doc(userId).collection('rdv').add({
          ...rendezVousData,
         
        });
    
        console.log('Rendez-vous ajouté avec succès chez l\'utilisateur dans Firebase.');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du rendez-vous chez l\'utilisateur dans Firebase :', error);
        throw error; // Vous pouvez gérer l'erreur selon vos besoins
      }
    }
    interface userData {
      // Définissez les champs nécessaires
      uid : string ;
      email: string;
      password:string;
      }
      export async function loginUser(firestore: AngularFirestore, email: string, password: string): Promise<{ userData: userData, uid: string } | null> {
        try {
          // Recherchez l'utilisateur dans la base de données avec l'email fourni
          const userCollection: CollectionReference<DocumentData> = firestore.collection('inscrits').ref as CollectionReference<DocumentData>;
          const userQuery: QuerySnapshot<DocumentData> = await userCollection.where('email', '==', email).get();
      
          if (userQuery.size === 1) {
            // Vérifiez le mot de passe
            const userData = userQuery.docs[0].data() as userData;
            const uid = userQuery.docs[0].id;
      
            if (userData && userData.password === password) {
              console.log('Connexion réussie en tant qu\'utilisateur.');
              return { userData, uid }; // Authentification réussie, renvoie les informations de l'utilisateur et son UID
            }
          }
      
          console.error('Identifiants invalides.');
          return null; // Authentification échouée
      
        } catch (error) {
          console.error('Erreur lors de la connexion de l\'utilisateur :', error);
          throw error; // Vous pouvez gérer l'erreur ici ou la laisser remonter
        }
      }
      export async function generateUniqueKey() : Promise<string>{
        const timestamp = Date.now().toString(36); // Convertit le timestamp en base 36
        const randomStr = Math.random().toString(36).substring(2, 10); // Génère une chaîne aléatoire en base 36
      
        // Opérations mathématiques complexes pour générer une clé unique
        const key = parseInt(timestamp + randomStr, 36).toString(36).toUpperCase();
      
        return key;
      }
      export async function getRdvByMedUid(firestore: AngularFirestore,  userUid: string) {
        try {
          const snapshot = await firestore.collection('medecin').doc(userUid).collection('rdv').ref.where('medecinuid', '==', userUid).get();
      
          if (snapshot) {
            // Convertir le snapshot en objet rendez-vous
            const rdv: RendezVousData[] = snapshot.docs.map(doc => {
              const data = doc.data() as RendezVousData;
              return { id: doc.id, ...data };
            });
            return rdv;
          } else {
            console.log('Aucun rendez-vous trouvé avec cet UID de medecin :', userUid);
            return null; // Ou renvoyez un objet vide, selon vos besoins
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des rendez-vous par UID de medecin:', error);
          throw error; // Vous pouvez gérer l'erreur selon vos besoins
        }
      }
      export async function deleteRendezVous(firestore: AngularFirestore, medecinUid: string, rendezVous: RendezVousData, excuse: string) {
        try {
            // Supprimer le rendez-vous du médecin avec l'excuse
            const rendezVousSnapshot1 = await firestore.collection('medecin').doc(rendezVous.medecinuid).collection('rdv').ref.where('key', '==', rendezVous.key).get();
            rendezVousSnapshot1.forEach(doc => {
                doc.ref.delete();
            });
            const rendezVousSnapshot3 = await firestore.collection('medecin').doc(rendezVous.medecinuid).collection('rdv').ref.where('key', '==', rendezVous.key).get();
            rendezVousSnapshot3.forEach(doc => {
                doc.ref.set({ ...rendezVous, statut: "annule", excuse: excuse });
            });
    
            
    
            // Mettre à jour le rendez-vous chez le patient avec l'excuse
            const rendezVousSnapshot2 = await firestore.collection('inscrits').doc(rendezVous.useruid).collection('rdv').ref.where('key', '==', rendezVous.key).get();
            rendezVousSnapshot2.forEach(doc => {
                doc.ref.set({ ...rendezVous, statut: "annule", excuse: excuse });
            });
           
        } catch (error) {
            console.error('Erreur lors de la suppression du rendez-vous:', error);
            throw error;
        }
    }
    
      
      export async function deleteRendezVousR(firestore: AngularFirestore, medecinUid: string, rendezVous: RendezVousData, ) {
        try {
          // Supprimer le rendez-vous du médecin avec l'excuse
          const rendezVousSnapshot1 = await firestore.collection('medecin').doc(rendezVous.medecinuid).collection('rdv').ref.where('key', '==', rendezVous.key).get();
          rendezVousSnapshot1.forEach(doc => {
            doc.ref.delete();
          });
      
          // Supprimer le rendez-vous chez le patient
          const rendezVousSnapshot = await firestore.collection('inscrits').doc(rendezVous.useruid).collection('rdv').ref.where('key', '==', rendezVous.key).get();
          rendezVousSnapshot.forEach(doc => {
            doc.ref.delete();
          });
      
         
          console.log('Rendez-vous supprimé avec succès.');
        } catch (error) {
          console.error('Erreur lors de la suppression du rendez-vous:', error);
          throw error;
        }
      }
      export async function savePatient(
        firestore: AngularFirestore,
        adresse: string,
        age: number,
        antecedentsChirurgicaux: string,
        antecedentsFamiliaux: string,
        antecedentsMedicaux: string,
        autresAntecedents: string,
        email: string,
        medicaments: string,
        groupeSanguin: string,
        nom: string,
        note: string,
        numeroAssurance: string,
        prenom: string,
        profession: string,
        sexe: string,
        situationFamiliale: string,
        telephone: string,
        telephone2: string,
        uid: string,
        medecinUid: string
      ): Promise<void> {
        try {
          // Création de l'objet patientData avec les données passées en paramètres
          const patientData = {
            adresse,
            age,
            antecedentsChirurgicaux,
            antecedentsFamiliaux,
            antecedentsMedicaux,
            autresAntecedents,
            email,
            medicaments,
            groupeSanguin,
            nom,
            note,
            numeroAssurance,
            prenom,
            profession,
            sexe,
            situationFamiliale,
            telephone,
            telephone2,
            uid
          };
      
          // Référence au document du patient dans la collection des patients du médecin
          const patientRef = firestore.collection('medecin').doc(medecinUid)
                              .collection('patients').doc(uid);
      
          // Vérifie si le patient existe déjà avant de le mettre à jour
          const patientSnapshot = await patientRef.get();
          if (patientSnapshot) {
            await patientRef.update(patientData); // Met à jour les données du patient existant
            console.log('Patient mis à jour avec succès.');
          } else {
            console.log('Le patient n\'existe pas chez ce médecin.');
          }
        } catch (error) {
          console.error('Erreur lors de la mise à jour du patient chez le médecin :', error);
          throw error;
        }
      }
      
      
      
      async function checkPatientExistence(firestore: AngularFirestore, medecinUid: string, patientData: any): Promise<boolean> {
        try {
          const patientsSnapshot = await firestore.collection('medecin').doc(medecinUid).collection('patients').ref
            .where('nom', '==', patientData.nom)
            .where('prenom', '==', patientData.prenom)
            .get();
      
          return !patientsSnapshot.empty;
        } catch (error) {
          console.error('Erreur lors de la vérification de l\'existence du patient :', error);
          throw error;
        }
      }
 
// Fonction pour ajouter un patient avec les champs nom et prénom remplis
export async function AddPatientWithNomPrenom(firestore: AngularFirestore, medecinId: string, rendezVousData: any): Promise<void> {
  try {
    // Vérifiez si la collection patients existe, sinon la crée
    const medecinRef = firestore.collection('medecin').doc(medecinId);
    const medecinSnapshot = await medecinRef.get().toPromise();
    
    // Vérifiez si le médecin existe avant d'ajouter le patient
    if (medecinSnapshot && medecinSnapshot.exists) {
      // Vérifiez si un patient avec le même nom et prénom existe déjà dans la collection
      const patientSnapshot = await medecinRef.collection('patients').ref
        .where('nom', '==', rendezVousData.nom)
        .where('prenom', '==', rendezVousData.prenom)
        .get();

      if (!patientSnapshot.empty) {
        console.error('Un patient avec le même nom et prénom existe déjà.');
        return; // Arrêtez l'exécution de la fonction s'il existe déjà un patient avec ces informations
      }

      // Ajoutez le patient avec les champs nom et prénom remplis
      const patientRef = await medecinRef.collection('patients').add({
        nom: rendezVousData.nom,
        prenom: rendezVousData.prenom,
        age: '',
        adresse: '',
        telephone: '',
        uid: '',
        useruid:rendezVousData.useruid 
      });

      // Mettez à jour le champ uid avec l'UID généré pour le patient
      await patientRef.update({ uid: patientRef.id });

      console.log('Patient ajouté avec succès à Firebase.', patientRef, patientRef.id);

      try {
        const patientConsultationRef = firestore.collection('medecin').doc(medecinId).collection('patients').doc(patientRef.id);

        // Créer un objet de consultation avec la date et éventuellement les détails
        const consultationData: Consultation = {
            date: rendezVousData.date,
            details: '' // Vous pouvez fournir les détails de la consultation ici
        };
    
        // Ajouter la nouvelle consultation dans la collection 'consultations' du patient
        await patientConsultationRef.collection('consultations').add(consultationData);
    
        console.log('Nouvelle consultation ajoutée avec succès.');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la consultation :', error);
      }
    } else {
      console.error('Le médecin n\'existe pas. Impossible d\'ajouter le patient.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du patient à Firebase :', error);
  }
}


export async function getPatientsByMedUid(firestore: AngularFirestore, medecinId: string) {
  try {
    // Récupérer la référence du médecin
    const medecinRef = firestore.collection('medecin').doc(medecinId);

    // Récupérer la liste des patients du médecin
    const patientsSnapshot = await medecinRef.collection('patients').get().toPromise();

    // Initialiser un tableau pour stocker les patients
    const patients: PatientData[] = [];

    // Vérifier si la snapshot des patients contient des documents
    if (patientsSnapshot) {
      // Parcourir les documents de la collection patients
      patientsSnapshot.forEach((doc) => {
        // Récupérer les données du patient
        const patientData = doc.data() as PatientData;
        // Ajouter un uid au patient (peut être n'importe quel identifiant unique)
        patientData.uid = doc.id;
        // Ajouter les données du patient au tableau
        patients.push(patientData);
      });
    }

    // Retourner le tableau de patients
    return patients;
  } catch (error) {
    console.error('Erreur lors de la récupération des patients:', error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

export async function getConsultationsForPatient(firestore: AngularFirestore,medecinUid: string, patientUid: string): Promise<Consultation[]> {
  try {
    const consultations: Consultation[] = [];

    // Récupérer les consultations du patient en utilisant son UID
    const snapshot = await firestore.collection('medecin').doc(medecinUid).collection('patients').doc(patientUid).collection('consultations').get().toPromise();
    if (snapshot)
    snapshot.forEach((doc) => {
      const consultation = doc.data() as Consultation;
      consultations.push(consultation);
    });

    return consultations;
  } catch (error) {
    console.error('Erreur lors de la récupération des consultations pour le patient avec UID', patientUid, 'du médecin avec UID', medecinUid, ':', error);
    return [];
  }
}
interface consultationData {
  date:string;
  details: string;
  poids: string;
  tailles: string;
  temperature: string;
  frequenceCardiaque: string;
  glycemie: string;
  pressionArterielle: string;
  observation: string;
  diagnosticMedical: string;
}
export async function getConsultations(firestore: AngularFirestore, medecinUid: string, patientUid: string) {
  try {
    const snapshot = await firestore.collection('medecin').doc(medecinUid).collection('patients').doc(patientUid).collection('consultations').ref.get();

    if (snapshot) {
      // Convertir le snapshot en objet de consultations
      const consultations: consultationData[] = snapshot.docs.map(doc => {
        const data = doc.data() as consultationData;
        return { id: doc.id, ...data };
      });
      return consultations;
    } else {
      console.log('Aucune consultation trouvée avec cet UID de patient et de médecin :', patientUid, medecinUid);
    return null 
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des consultations par UID de patient et de médecin :', error);
    throw error; // Vous pouvez gérer l'erreur selon vos besoins
  }
}


export async function modifierSauvegarderConsultation(firestore: AngularFirestore, medecinUid: string, patientUid: string, date: string, details: string, poids: string, tailles: string, temperature: string, frequenceCardiaque: string, glycemie: string, pressionArterielle: string, observation: string, diagnosticMedical: string): Promise<void> {
  try {
    // Créer un objet de données de consultation
    const consultationData = {
      details,
      poids,
      tailles,
      temperature,
      frequenceCardiaque,
      glycemie,
      pressionArterielle,
      observation,
      diagnosticMedical
    };

    // Obtenir la référence de la consultation à mettre à jour
    const consultationsRef = firestore.collection('medecin').doc(medecinUid).collection('patients').doc(patientUid).collection('consultations').ref.where('date', '==', date);
    
    // Obtenir le snapshot de la référence de la consultation
    const querySnapshot = await consultationsRef.get();

    // Vérifier si la consultation existe
    if (!querySnapshot.empty) {
      // Mettre à jour la première consultation correspondante à la date
      const consultationDoc = querySnapshot.docs[0];
      await consultationDoc.ref.update(consultationData);
      console.log('Détails de la consultation mis à jour avec succès.');
    } else {
      console.log('Aucune consultation trouvée pour cette date.');
    }
  } catch (error) {
    console.error('Erreur lors de la modification et de la sauvegarde des détails de la consultation :', error);
    throw error; // Vous pouvez gérer l'erreur selon vos besoins
  }
}

export async function ajouterConsultation(firestore: AngularFirestore, medecinId: string, patientUid: string, consultationData: Consultation) {
  try {
    const patientConsultationRef = firestore.collection('medecin').doc(medecinId).collection('patients').doc(patientUid);

    // Ajouter la nouvelle consultation dans la collection 'consultations' du patient
    await patientConsultationRef.collection('consultations').add(consultationData);

    console.log('Nouvelle consultation ajoutée avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la consultation :', error);
    throw error; // Gérer l'erreur selon vos besoins
  }
}
export async function chercherPatient(firestore: AngularFirestore, medecinId: string, nom: string, prenom: string, email: string) {
  try {
    const patientsSnapshot = await firestore.collection('medecin').doc(medecinId).collection('patients').ref
      .where('nom', '==', nom)
      .where('prenom', '==', prenom)
      .where('email', '==', email) // Ajoutez le critère de recherche pour l'e-mail
      .get();

    if (!patientsSnapshot.empty) {
      // Retournez l'UID du premier patient trouvé
      return patientsSnapshot.docs[0].id;
    } else {
      // Aucun patient trouvé avec ce nom, prénom et e-mail
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la recherche du patient :', error);
    return null;
  }
}
export async function getPatientsUIDByMedecinId(firestore: AngularFirestore, medecinId: string): Promise<string[]> {
  try {
    const patientsSnapshot = await firestore.collection('medecin').doc(medecinId).collection('patients').get().toPromise();
    
    if (patientsSnapshot) {
      // Retournez les UID des patients
      return patientsSnapshot.docs.map(doc => doc.id);
    } else {
      // Aucun patient trouvé
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des UID des patients :', error);
    return [];
  }
}
export async function checkExistingPatient(firestore: AngularFirestore, medecinId: string, nom: string, prenom: string): Promise<string | null> {
  try {
    const patientsSnapshot = await firestore.collection('medecin').doc(medecinId).collection('patients').ref
      .where('nom', '==', nom)
      .where('prenom', '==', prenom)
      .get();

    if (!patientsSnapshot.empty) {
      // Un patient avec le même nom et prénom existe déjà
      const patientDoc = patientsSnapshot.docs[0];
      return patientDoc.id;
    } else {
      // Aucun patient trouvé avec ce nom et prénom
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'existence du patient :', error);
    return null;
  }
}
export async function getFichePatient(firestore: AngularFirestore, medecinUid: string, patientUid: string) {
  try {
    const medecinRef = firestore.collection('medecin').doc(medecinUid);
    const patientDoc = await medecinRef.collection('patients').doc(patientUid).get().toPromise();

    if (!patientDoc) {
      console.log('Fiche patient non trouvée.');
      return null; // Retourner null si la fiche patient n'est pas trouvée
    }

    const patientData = patientDoc.data();
    return patientData;
  } catch (error) {
    console.error('Erreur lors de la récupération de la fiche patient :', error);
    throw error;
  }
}
export async function getPatientByUid(firestore: AngularFirestore, medecinUid: string, patientUid: string){
  try {
    const patientRef = firestore.collection('medecin').doc(medecinUid).collection('patients').doc(patientUid);
    const patientDoc = await patientRef.ref.get();
    if (patientDoc.exists) {
      const patientData = patientDoc.data() as PatientData;
      return patientData;
    } else {
      console.log('Le patient n\'existe pas.');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du patient par UID :', error);
    return null;
  }
}
export async function getInscritByUid(firestore: AngularFirestore, uid:string){
  
    const patientRef = firestore.collection('inscrits').doc(uid);
    const patientDoc = await patientRef.ref.get();
    if (patientDoc.exists) {
      const patientData = patientDoc.data() as PatientData;
      return patientData;
    } else {
      console.log('Le patient n\'existe pas.');
      return null;
    }
  


}
interface Documentdata{
  uid:string;
  url:string;
  description:string;
  useruid:string;
}
export async function getDocuments(firestore: AngularFirestore, medecinUid: string, patientUid: string) {
  try {
    const patientRef = firestore.collection('medecin').doc(medecinUid).collection('documents');
    const documentsSnapshot = await patientRef.ref.where('patientUid', '==', patientUid).get();

    if (!documentsSnapshot.empty) {
      const documents: Documentdata[] = [];
      documentsSnapshot.forEach(doc => {
        const data = doc.data() as Documentdata;
        documents.push(data);
      });

      return documents;
    } else {
      console.log('Aucun document trouvé pour ce patient.');
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des documents :', error);
    throw error;
  }
}
export async function getDocumentsIS(firestore: AngularFirestore, patientUid: string) {
  try {
    const patientRef = firestore.collection('documents');
    const documentsSnapshot = await patientRef.ref.where('useruid', '==', patientUid).get();

    if (!documentsSnapshot.empty) {
      const documents: Documentdata[] = [];
      documentsSnapshot.forEach(doc => {
        const data = doc.data() as Documentdata;
        documents.push(data);
      });

      return documents;
    } else {
      console.log('Aucun document trouvé pour ce patient.');
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des documents :', error);
    throw error;
  }
}

export async function getConsultationsmed(firestore: AngularFirestore, medecinUid: string) {
  try {
    const snapshot = await firestore.collection('medecin').doc(medecinUid).collection('consultations').ref.get();

    if (snapshot) {
      // Convertir le snapshot en objet de consultations
      const consultations: consultationData[] = snapshot.docs.map(doc => {
        const data = doc.data() as consultationData;
        return { id: doc.id, ...data };
      });
      return consultations;
    } else {
      console.log('Aucune consultation trouvée pour ce médecin.');
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des consultations du médecin :', error);
    throw error; // Vous pouvez gérer l'erreur selon vos besoins
  }
}
export async function getConsultationByDateAndUidPat(firestore: AngularFirestore, medecinUid: string, patientUid: string, consultationDate: string) {
  try {
    const snapshot = await firestore.collection('medecin').doc(medecinUid).collection('patients').doc(patientUid).collection('consultations').ref.where('date', '==', consultationDate).get();

    if (snapshot.empty) {
      console.log('Aucune consultation trouvée avec cette date, UID de patient et de médecin :', consultationDate, patientUid, medecinUid);
      return null;
    }

    if (snapshot) {
      // Convertir le snapshot en objet de consultation
      const consultations: consultationData[] = snapshot.docs.map(doc => {
        const data = doc.data() as consultationData;
        return { id: doc.id, ...data };
      });
      const consultation=consultations[0]
      return consultation;
    }
    else {
      return null ;
    }

  } catch (error) {
    console.error('Erreur lors de la récupération de la consultation par date, UID de patient et de médecin :', error);
    throw error; // Vous pouvez gérer l'erreur selon vos besoins
  }
}
export async function getDocumentsByMedecin(firestore: AngularFirestore, medecinId: string) {
  try {
    // Récupérer la liste des patients du médecin
    const patients = await getPatientsByMedUid(firestore, medecinId);

    // Initialiser un tableau pour stocker les documents
    const documents: Documentdata[] = [];

    // Parcourir les patients
    for (const patient of patients) {
      // Récupérer les documents pour le patient
      const patientDocuments = await getDocuments(firestore, medecinId, patient.uid);

      // Ajouter les documents du patient au tableau
      documents.push(...patientDocuments);
    }

    // Retourner le tableau de documents
    return documents;
  } catch (error) {
    console.error('Erreur lors de la récupération des documents du médecin:', error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}
export async function AddMedecinforpatient(
  firestore: AngularFirestore,
  patientuid: string,
  medecin: MedecinData,
  toastController: ToastController
) {
  const medecinA = {
    nom: medecin.nom,
    prenom: medecin.prenom,
    specialite: medecin.specialite,
    medecin: medecin.uid,
    patientuid: patientuid,
  };

  try {
    // Vérifier si le médecin existe déjà dans la collection 'medecinpatient'
    const medecinExiste = await firestore.collection('medecinpatient').ref
      .where('medecin', '==', medecin.uid)
      .where('patientuid', '==', patientuid)
      .get();

    if (!medecinExiste.empty) {
      console.log('Le médecin existe déjà pour ce patient.');
      const toast = await toastController.create({
        message: 'Le médecin existe déjà pour ce patient.',
        duration: 3000,
        position: 'bottom',
      });
      toast.present();
      return;
    }

    // Ajouter le médecin à la collection 'medecinpatient'
    const medref = await firestore.collection('medecinpatient').add(medecinA);
    const uid = medref.id;

    // Mettre à jour le document avec l'uid
    await medref.update({ idd: uid });

    console.log('Médecin ajouté avec succès à la collection medecinpatient:', medecin);
    const toast = await toastController.create({
      message: 'Médecin ajouté avec succès!',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du médecin:', error);
    const toast = await toastController.create({
      message: 'Erreur lors de l\'ajout du médecin. Veuillez réessayer plus tard.',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
    throw error; // Renvoyer l'erreur pour que le gestionnaire puisse la gérer
  }
}

interface medecinpatient{
  idd:string,
  medecin:string,
  nom:string,
  patientuid:string,
  prenom:string
  specialite:string,
 }
export async function getMedecinforPatient(firestore: AngularFirestore, patientUid: string) {
  try {
    const medecinPatientRef = firestore.collection('medecinpatient');
    const medecinPatientSnapshot = await medecinPatientRef.ref.where('patientuid', '==', patientUid).get();

    if (!medecinPatientSnapshot.empty) {
      const medecins: medecinpatient[] = [];

      medecinPatientSnapshot.forEach(doc => {
        const medecinData = doc.data() as medecinpatient;
        medecins.push(medecinData);
      });

      return medecins;
    } else {
      console.log('Aucun médecin trouvé pour ce patient.');
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des médecins pour le patient :', error);
    throw error;
  }
}
export async function getDocumentsforpatient(firestore: AngularFirestore,  patientUid: string) {
  try {
    const patientRef = firestore.collection('documents');
    const documentsSnapshot = await patientRef.ref.where('useruid', '==', patientUid).get();

    if (!documentsSnapshot.empty) {
      const documents: Documentdata[] = [];
      documentsSnapshot.forEach(doc => {
        const data = doc.data() as Documentdata;
        documents.push(data);
      });

      return documents;
    } else {
      console.log('Aucun document trouvé pour ce patient.');
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des documents :', error);
    throw error;
  }
}

export async function getConsultationByDate(firestore: AngularFirestore, medecinUid: string, patientUid: string, date: string) {
  try {
    // Récupérer la référence du document de consultation en fonction de la date
    const querySnapshot = await firestore.collection('medecin').doc(medecinUid).collection('patients').doc(patientUid).collection('consultations')
      .ref.where('date', '==', date).get();
    
    // Vérifier s'il y a des résultats
    if (!querySnapshot.empty) {
      // Convertir le snapshot en objet de consultation
      const consultationDoc = querySnapshot.docs[0]; // Prendre le premier document trouvé
      const consultationData = consultationDoc.data() as consultationData;
      return { id: consultationDoc.id, ...consultationData };
    } else {
      console.log('Aucune consultation trouvée pour cette date.');
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la consultation par date, patient UID et médecin UID :', error);
    throw error; // Vous pouvez gérer l'erreur selon vos besoins
  }
}


interface Inscrit {
  familyName: string;
  name: string;
  email: string;
  password: string;
  date: string;
  sexe: string;
}


export async function getInscritByUid1(firestore: AngularFirestore, uid: string) {
  try {
    const snapshot = await firestore.collection('inscrits').ref.where('uid', '==', uid).get();
    if (!snapshot.empty) {
      const doc = snapshot.docs[0]; // Récupérez le premier document du snapshot
      const data = doc.data() as Inscrit;
      const inscrit: Inscrit = { ...data };
      console.log('A:', inscrit);
      return inscrit;
    } else {
      console.log('Aucun inscrit trouvé pour cet UID :', uid);
      return null; // Ou renvoyez un objet vide, selon vos besoins
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'inscrit :', error);
    return null;
  }
}


