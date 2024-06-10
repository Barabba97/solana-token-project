import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";
import { 
    getOrCreateAssociatedTokenAccount,
    transfer,
} from "@solana/spl-token";
import wallet from "../wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("AuzGvg5gFou8dbnyZQshfodzQGGz7US94HyDk6KQNL3h");
const fromAta = new PublicKey("3viTYA66PiL7Dp1KvKBBjnhsLnxh7iaEiCJqZaC4civt");

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection, 
        keypair,
        mint,
        to.publicKey,
    );

    const toAta = tokenAccount.address;
    console.log("Associated Token Account: ", toAta.toBase58());

    const amount = 10e5;

    await transfer(
        connection,
        keypair,
        fromAta,
        toAta,
        keypair,
        amount
    );

    console.log("Transferred", amount, "from", fromAta.toBase58(), "to", toAta.toBase58());
})();
