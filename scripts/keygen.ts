import { Keypair } from "@solana/web3.js";

// Genera una nuova coppia di chiavi
const keypair = Keypair.generate();

// Stampa l'indirizzo del wallet e la chiave privata
console.log(`Hai generato il tuo nuovo wallet: ${keypair.publicKey.toBase58()} \n\n Per salvare il tuo wallet, copia e incolla il seguente JSON in un file: [${keypair.secretKey}]`)
