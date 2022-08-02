import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";

const SOLBET_PROGRAM = "BWVuwvBhFG3nnUexc5CGCzGwELP3eK9oymPCtUiDQXxC";

export const getConnection = () => {
    const connection = new Connection(clusterApiUrl('devnet'), 'processed');
    return connection;
}
export const getProvider = (wallet: anchor.Wallet) => {
    const connection = getConnection();
    const provider = new anchor.AnchorProvider(connection, wallet, {
        preflightCommitment: 'processed'
    });
    return provider;
}
export const getProgram = async (wallet: anchor.Wallet) => {
    const provider = getProvider(wallet);
    const idl = await anchor.Program.fetchIdl(SOLBET_PROGRAM, provider);
    console.log("idl", idl);
    const program = new anchor.Program(idl as anchor.Idl, SOLBET_PROGRAM, provider);
    return program;
}