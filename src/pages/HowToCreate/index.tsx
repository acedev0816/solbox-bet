import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import react, { useState } from "react";

export default () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ maxWidth: 600, }}>
                <Typography sx={{mt:6, color: 'secondary.main', fontSize:22}}>
                    MANIFESTO
                </Typography>
                <Typography sx={{ mt: 1, color: 'gray', fontSize: 18 }}>

                    Come bloom and take charge of your destiny. Patience is a virtue, our journey is here to pursue. Stay golden, past the trench of mutiny. Shine bright with the community. For we create our destiny!
                    Life is beyond this. Claim your glory.
                    Feel the rush of it. Explore the freedom.
                    What’s fantasy, now a reality. Good vibes and euphoria. Take your Throne to shine everlasting. Our success for all to see.
                </Typography>
                <Typography sx={{mt:4, color: 'secondary.main', fontSize:22}}>
                    How to CREATE YOUR DESTINY:
                </Typography>
                <Typography sx={{ mt: 1, color: 'gray', fontSize: 18 }}>
                    1. Connect your phantom wallet.
                    2. Choose which DESTINY BOX you would like to open in SOL (0.05, 0.1, 0.25, 0.5, 0.75, 1).
                    3. Open your chosen path.
                    4. See what your destiny holds.
                    5. The rewards of your destiny will be paid directly into your connected wallet.
                    6. LEGEND, you have now created your destiny with SOLBOX.
                </Typography>
                <Typography sx={{mt:4, color: 'secondary.main', fontSize:22}}>
                    Phantom Wallet
                </Typography>
                <Typography sx={{ mt: 1, mb:6, color: 'gray', fontSize: 18 }}>
                    A friendly crypto wallet. Phantom makes it safe & easy for you to store, buy, send, receive, swap tokens and collect NFTs on the Solana blockchain.
                    Phantom is a popular non-custodial crypto wallet designed for Solana that lets you do more than just deposit and send cryptocurrency.
                    is a decentralized Web 3.0 self-custodial wallet that stores your private keys on your device thus giving you complete control of your funds. Phantom is compatible with several browsers including Chrome, Firefox, Edge, and the Brave browser.
                </Typography>
            </Box>
        </Box>
    )

};