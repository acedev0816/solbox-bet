import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TwitterIcon from '@mui/icons-material/Twitter';
import styled from "styled-components";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from "../store";
import * as anchor from "@project-serum/anchor";
import * as helper from "../util/helper"
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { sendTransactions } from '../util/connection';
import { set } from '../store/betSlice';
const MyAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#100!important',
    height: 120,
}));

const MyLink = styled(Link)(({ theme }) => ({
    marginLeft: "10px!important",
    marginRight: "10px!important",
    color: 'white',
    "&:hover": {
        color: '#ea8632'
    }
}));

const ClaimButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    background: '#D98D04',
    padding: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    "& .hover": {
        display: 'none',
    },
    "& .normal": {
        display: 'block',
    },
    "&:hover": {
        background: '#F49D14',
        transform: 'translate(2px, 1px)',
        "& .hover": {
            display: 'block'
        },
        "& .normal": {
            display: 'none'
        }
    }
}));

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const wallet = useAnchorWallet();
    const dispatch = useDispatch();

    const reward = useSelector((state: RootState) => state.bet.reward);

    React.useEffect(() => {
        console.log("useEffect in header");
    }, []);
    const handleClaim = async () => {
        const program = await helper.getProgram(wallet as anchor.Wallet);
        const player = (wallet as anchor.Wallet).publicKey;

        //find pda for vault
        const [vault_account_pda, vault_account_bump] = await anchor.web3.PublicKey.findProgramAddress(
            [Buffer.from(anchor.utils.bytes.utf8.encode("vault"))],
            program.programId
        );
        //find pda for the bet account
        const [bet_account_pda, bet_account_bump] = await anchor.web3.PublicKey.findProgramAddress([player.toBuffer()], program.programId);


        const provider = helper.getProvider(wallet as anchor.Wallet);
        const signersMatrix = [];
        const instructionMatrix = [];
        let instructions = [];

        //claim prize
        instructions.push(
            program.instruction.claimPrize({
                accounts: {
                    player: player,
                    betAccount: bet_account_pda,
                    systemProgram: anchor.web3.SystemProgram.programId
                }
            })
        );

        ///
        instructionMatrix.push(instructions);
        signersMatrix.push([]);

        /// send trx
        let tx_result = (await sendTransactions(provider.connection, provider.wallet, instructionMatrix, signersMatrix)).txs.map(t => t.txid);
        console.log("tx_result", tx_result);

        let bet_account = await program.account.betAccount.fetch(bet_account_pda);
        let prize_amount = (bet_account.prizeAmount as anchor.BN).toNumber();
        
        dispatch(set(prize_amount));




    }
    return (
        <MyAppBar position="static">
            <Container maxWidth="xl" sx={{ height: "100%" }}>
                <Toolbar disableGutters sx={{ height: "100%" }} >
                    <img src="./assets/logo.png" style={{ height: "70%" }} />
                    {/* mobile menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mr: 2, justifyContent: 'right', alignItems: 'center' }}>

                        <MyLink to="/">Home</MyLink>
                        <MyLink to="/about">About</MyLink>
                        <MyLink to="/how-to-create">How to CREATE</MyLink>
                        <MyLink to="/golden-pass">GOLDEN PASS</MyLink>
                        <MyLink to="/faq">FAQ</MyLink>
                        <IconButton
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, display: 'block' }}
                        >
                            <TwitterIcon color="primary" />
                        </IconButton>

                        <IconButton
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <svg width="24px" height="24px" viewBox="0 -28.5 256 256" preserveAspectRatio="xMidYMid">
                                <g>
                                    <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" fill="#5865F2" fillRule="nonzero"></path>
                                </g>
                            </svg>
                        </IconButton>
                    </Box>
                    <Box display='flex' flexDirection='column'>
                        <WalletMultiButton />
                        <ClaimButton mt={'5px'} onClick={handleClaim}>
                            <Typography className={'hover'}>Claim reward</Typography>

                            <img src="./assets/trophy.png" className={'normal'} style={{ height: 20, marginRight: 10 }} />
                            <Typography className={'normal'} >Reward: {reward / anchor.web3.LAMPORTS_PER_SOL}&nbsp;</Typography>
                            <img src="./assets/sol.svg" className={'normal'} style={{ height: 15 }} />

                        </ClaimButton>
                    </Box>
                </Toolbar>
            </Container>
        </MyAppBar>
    );
};
export default ResponsiveAppBar;
