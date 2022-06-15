import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import react, { FC, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import HistoryItem from "./HistoryItem";
import styled from "styled-components";

const MyModal = styled(Modal)({
    "& .MuiBackdrop-root": {
        background: '#000d'
    }
});
const Home = () => {
    const prices = [0.05, 0.1, 0.25, 0.5, 0.75, 1];
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [open, setOpen] = useState<boolean>(false);
    const [boxId, setBoxId] = useState<number>(-1);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    const [openResult, setOpenResult] = useState<number>(-1);

    const onOpen = (index: number) => {
        setImageSrc("assets/open.gif");
        setOpen(true);
        setBoxId(index);

    };
    useEffect(() => {
        if (imageLoaded) {
            console.log("loaded");
            setTimeout(() => {
                console.log("timeout");
                setOpenResult(1);
            }, 6500);
        }

    }, [imageLoaded]);
    const onCloseBetResult = () => {
        setOpen(false);
        setBoxId(-1);
        setOpenResult(-1);
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
                <Typography sx={{ fontSize: 50, color: 'primary.main', fontWeight: 'bold' }}>
                    Open Solbox to win upto 125x in SOL
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
                            <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src="/assets/solana.webp" />
                                <Typography sx={{ ml: 1, flexGrow: 1 }} variant="h6">
                                    {price}
                                </Typography>
                                <Button variant="contained" size="small" disabled={!publicKey} onClick={() => onOpen(index)}>{publicKey ? 'Open' : 'Not Connected'}</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <Typography sx={{ fontSize: 40, color: 'primary.main', fontWeight: 'bold' }}>

                    Recent Opens
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
                <Typography sx={{ fontSize: 40, color: 'primary.main', fontWeight: 'bold' }}>

                    Your Recent Opens
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
                {openResult == -1 ? (<Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '40%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { md: 600, xs: "90%" },
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
                        width: { md: 400, sx: "100%" },
                        bgcolor: 'white',
                        border: '2px solid #000',
                        px: 3,
                        py: 1
                    }}>
                        <h2 id="child-modal-title">Bet Finished</h2>
                        <p id="child-modal-description">
                            You have won {openResult} SOL!
                        </p>
                        <Button variant="outlined" color="secondary" onClick={onCloseBetResult}>Close</Button>
                    </Box>)
                }
            </MyModal>
        </Box >
    );
};
export default Home;