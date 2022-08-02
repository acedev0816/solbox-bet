import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import react, { FC, useEffect, useState } from "react";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import HistoryItem from "./HistoryItem";
import styled from "styled-components";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { sendTransactions } from "./connection";

const MyModal = styled(Modal)({
    "& .MuiBackdrop-root": {
        background: '#000d'
    }
});
const SOLBET_PROGRAM = "BWVuwvBhFG3nnUexc5CGCzGwELP3eK9oymPCtUiDQXxC";

const Home = () => {
    const prices = [0.1, 0.25, 0.5, 0.75, 1];


    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    const [betResult, setBetResult] = useState<number>(-1);
    const [open, setOpen] = useState<boolean>(false);
    const [boxId, setBoxId] = useState<number>(-1);
    const wallet = useAnchorWallet();

    const sleep = (ms: number): Promise<void> => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    useEffect(() => {
        (async () => {
            // const program = await getProgram();
            // program.addEventListener('BetResult', (e, s) => {
            //     console.log('Bet Result ', e);
            //     console.log('player', e.player.toString());
            //     console.log('amount', e.amount.toString());
            //     console.log('prize_amount', e.prizeAmount.toString());
            //     console.log('ts', e.ts.toString());
            // });
        })();
    }, [])

    const getConnection = () => {
        const connection = new Connection(clusterApiUrl('devnet'), 'processed');
        return connection;
    }
    const getProvider = () => {
        const connection = getConnection();
        const provider = new anchor.AnchorProvider(connection, wallet as anchor.Wallet, {
            preflightCommitment: 'processed'
        });
        return provider;
    }
    const getProgram = async () => {
        const provider = getProvider();
        const idl = await anchor.Program.fetchIdl(SOLBET_PROGRAM, provider);
        console.log("idl", idl);
        const program = new anchor.Program(idl as anchor.Idl, SOLBET_PROGRAM, provider);
        return program;
    }

    const doBet = async (amount: number) => {
        const program = await getProgram();
        const player = (wallet as anchor.Wallet).publicKey;

        //find pda for vault
        const [vault_account_pda, vault_account_bump] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(anchor.utils.bytes.utf8.encode("vault"))],
            program.programId
        );
        //find pda for the bet account
        const [bet_account_pda, bet_account_bump] = await anchor.web3.PublicKey.findProgramAddress([player.toBuffer()], program.programId);


        // send Transaction

        const provider = getProvider();
        const signersMatrix = [];
        const instructionMatrix = [];
        let instructions = [];

        //create bet account
        let already_created = false;
        try {
            let bet_account = await program.account.betAccount.fetch(bet_account_pda);
            already_created = true;
        } catch (e) {
            console.log("catch", e);
        }
        if (!already_created) {
            instructions.push(program.instruction.createBetAccount(
                new anchor.BN(amount),
                {
                    accounts: {
                        player: player,
                        betAccount: bet_account_pda,
                        systemProgram: anchor.web3.SystemProgram.programId
                    }
                }
            ));
        }



        //do bet
        let bet_amount = amount * anchor.web3.LAMPORTS_PER_SOL/10;
        instructions.push(program.instruction.bet(
            new anchor.BN(bet_amount),
            {
                accounts: {
                    player: player,
                    vaultAccount: vault_account_pda,
                    betAccount: bet_account_pda,
                    systemProgram: anchor.web3.SystemProgram.programId,
                },
            }
        ));
        instructionMatrix.push(instructions);
        signersMatrix.push([]);

        // claim prize
        // instructions.push(
        //     program.instruction.claimPrize({
        //         accounts: {
        //             player: player,
        //             betAccount: bet_account_pda,
        //             systemProgram: anchor.web3.SystemProgram.programId
        //         }
        //     })
        // );

        // ///
        
        // instructionMatrix.push(instructions);
        // signersMatrix.push([]);
        try {
            //original balance
            let bet_account = await program.account.betAccount.fetch(bet_account_pda);
            let org_prize_amount = (bet_account.prizeAmount as anchor.BN).toNumber();
            
            //send trx
            let tx_result = (await sendTransactions(provider.connection, provider.wallet, instructionMatrix, signersMatrix)).txs.map(t => t.txid);
            console.log("tx_result", tx_result);
            
            bet_account = await program.account.betAccount.fetch(bet_account_pda);
            let prize_amount = (bet_account.prizeAmount as anchor.BN).toNumber();
            console.log("prize_amount", prize_amount - org_prize_amount);

        } catch (e) {
            console.log("exception", e);
        }
    }
    const onOpen = async (index: number) => {
        setImageSrc(`assets/failure/${index + 1}.gif`);
        setOpen(true);
        setBoxId(index);
        doBet(prices[index])




    };
    useEffect(() => {
        if (imageLoaded) {
            console.log("loaded");
            setTimeout(() => {
                console.log("timeout");
                setBetResult(1);
            }, 9000);
        }

    }, [imageLoaded]);

    const onCloseBetResult = () => {
        setOpen(false);
        setBoxId(-1);
        setBetResult(-1);
        setImageLoaded(false);
    }
    const [recentOpens, setRecentOpens] = useState([
        {
            box_id: 0,
            address: "5pDrg8XZgVLAnXToyuwW391vNNiUHiv292VML36GDrXi",
            open_price: 0.5,
            win_price: 0.25
        },
        {
            box_id: 1,
            address: "5pDrg8XZgVLAnXToyuwW391vNNiUHiv292VML36GDrXi",
            open_price: 0.5,
            win_price: 0.25
        },
        {
            box_id: 2,
            address: "5pDrg8XZgVLAnXToyuwW391vNNiUHiv292VML36GDrXi",
            open_price: 0.5,
            win_price: 0.25
        },
        {
            box_id: 3,
            address: "5pDrg8XZgVLAnXToyuwW391vNNiUHiv292VML36GDrXi",
            open_price: 0.5,
            win_price: 0.25
        },
        {
            box_id: 4,
            address: "5pDrg8XZgVLAnXToyuwW391vNNiUHiv292VML36GDrXi",
            open_price: 0.5,
            win_price: 0.25
        },
    ]);

    return (
        <Box>
            <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Typography sx={{ fontSize: 50, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                    READY. SET. CREATE.<br />
                    UP TO 125x
                </Typography>
                <Typography sx={{ fontSize: 14, color: 'white', mt: 2 }}>
                    No house edge, with 100% RTP
                </Typography>
            </Box>
            <Grid container spacing={2} mt={2}>
                {prices.map((price, index) => (
                    <Grid item md={4} sm={6} xs={12} key={index}>
                        <Card sx={{ maxWidth: 345, mt: 2, background: 'white' }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height={200}
                                image={`assets/box/${index + 1}.jpg`}
                            />
                            <CardContent sx={{ display: 'flex', alignItems: 'center', background: "url('/assets/back3.jpg') no-repeat", backgroundSize: "conver" }}>
                                <Avatar src="/assets/solana.webp" />
                                <Typography sx={{ ml: 1, flexGrow: 1 }} variant="h6">
                                    {price}
                                </Typography>
                                <Button variant="contained" size="small" disabled={!wallet} onClick={() => onOpen(index)}>{wallet ? 'Open' : 'Not Connected'}</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Typography sx={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>
                    Recent Destinies Created
                </Typography>
                <Grid container spacing={2} mt={1}>
                    {recentOpens.map((data: any, id: number) => (
                        <Grid item md={6} key={id} xs={12}>
                            <HistoryItem data={data} key={id} />
                        </Grid>
                    ))}
                </Grid>

            </Box>

            <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Typography sx={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>

                    Your Previous Destinies
                </Typography>
                <Grid container spacing={2} mt={1}>
                    {recentOpens.map((data: any, id: number) => (
                        <Grid item md={6} xs={12} key={id}>
                            <HistoryItem data={data} key={id} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Divider variant="fullWidth" sx={{ mt: 8, mb: 10, background: 'white', height: 2 }} />
            <MyModal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {betResult == -1 ? (<Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'min(600px, 90%)'
                    // border: '2px solid #000',
                    // boxShadow: 24,
                    // p: 4,
                }}>
                    <img style={{ width: "100%" }} src={imageSrc} onLoad={() => setImageLoaded(true)} />
                </Box>) :
                    (<Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'min(500px, 80%)',
                        bgcolor: 'white',
                        border: '2px solid #000',
                        px: 3,
                        py: 1
                    }}>
                        <h2 id="child-modal-title" style={{ fontWeight: 50, }}>Bet Finished</h2>
                        <p id="child-modal-description">
                            You have won {betResult} SOL!
                        </p>
                        <Button variant="outlined" color="secondary" onClick={onCloseBetResult}>Close</Button>
                    </Box>)
                }
            </MyModal>
        </Box >
    );
};
export default Home;