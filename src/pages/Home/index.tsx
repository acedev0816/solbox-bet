import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import react, { FC, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import HistoryItem from "./HistoryItem";
const Home = () => {
    const prices = [0.05, 0.1, 0.25, 0.5, 0.75, 1];
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [open, setOpen] = useState<boolean>(false);
    const [boxId, setBoxId] = useState<number>(-1);
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
                <Typography sx={{ fontSize: 50, color: 'white' }}>
                    Open Solbox to win up to 100x in SOL
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#ccc', mt: 2 }}>
                    No house edge, with 100% RTP
                </Typography>
            </Box>
            <Grid container spacing={2} mt={2}>
                {prices.map((price, index) => (
                    <Grid item md={4} sm={6} xs={12}>
                        <Card sx={{ maxWidth: 345, mt: 2 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height={200}
                                image={`assets/box/${index + 1}.jpg`}
                            />
                            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src="/assets/solana.webp" />
                                <Typography sx={{ ml: 1, flexGrow: 1 }} variant="h6">
                                    {price}
                                </Typography>
                                {publicKey && <Button variant="contained" size="small" onClick={() => { setOpen(true); setBoxId(index) }}>Open</Button>}
                                {!publicKey && <WalletMultiButton />}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Typography sx={{ fontSize: 40, color: 'white' }}>
                    Recent Opens
                </Typography>
                <Grid container spacing={2} mt={1}>
                    {recentOpens.map((data: any, id: number) => (
                        <Grid item md={6} xs={12}>
                            <HistoryItem data={data} key={id} />
                        </Grid>
                    ))}
                </Grid>

            </Box>

            <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Typography sx={{ fontSize: 40, color: 'white' }}>
                    Your Recent Opens
                </Typography>
                <Grid container spacing={2} mt={1}>
                    {recentOpens.map((data: any, id: number) => (
                        <Grid item md={6} xs={12}>
                            <HistoryItem data={data} key={id} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Divider variant="fullWidth" sx={{mt:8, mb:10, background: "white", height:2}}/>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { md: 500, xs: "90%" },
                    // border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <video width="100%" autoPlay>
                        <source src={`assets/lose/${boxId + 1}.mp4`} type="video/mp4" />
                    </video>
                </Box>
            </Modal>
        </Box>
    );
};
export default Home;