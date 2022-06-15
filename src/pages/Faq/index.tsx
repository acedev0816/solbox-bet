import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import react, { useState } from "react";

export default () => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ maxWidth: 600 }}>
                <Accordion sx={{ mt: 6 }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>
                            How?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            SOLBOX Quick Play: costs 0.1-1 SOL per play.<br />
                            Connect wallet, select your desired destiny from Carbon to Mystic; then approve transaction to reveal your Destiny.<br />
                            Choose your favorite Destiny or let your destiny choose you.<br />
                            The SOLBOX ULTIMATE CREATOR path grows until it created.
                            Innovators win a prize by beating the odds to Win.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>Where?</Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            SOLBOX QP is enjoyed by SOLANA users and anywhere Crypto is accepted!<br />
                            SOLBOX created destiny are displayed daily, Weekly Raffles coming soon.<br />
                            To find out more join our discord, click <a href="https://discord.gg/solbox">here</a>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>
                            Power Play
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Ask for Golden Play: with your GOLDEN PASS purchase!<br />
                            With the exception of gas receive free play per day, the GOLDEN Play feature will also multiply non-ULTIMATE CREATOR prizes by 2, 3, 4, 5 or 10 times!<br />
                            The multiplier number will be randomly selected for each drawing.<br />
                            The 10X multiplier is only in play when the ULTIMATE CREATOR PATH is 20 SOL or less.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>Multi-Creator</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Play multiple times in a row, receive a multiplier! <br />
                            Select multiple paths within 1 minute interval consecutive drawing receive multiplier and winnings.<br />
                            The number of Multi-Draws or Advance Plays are limited to 100 players per 6 hour time frame.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>Who we are?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            We are SOLBOX and we believe in your DESTINY. <br />
                            We are an innovative WEB 3 SMART CONTRACT built on the Solana blockchain that allows users to CREATE their destiny through the opening of different BOXES in Sol and win Sol in return to use however they like within their real life destiny. <br />
                            There is a 10% transaction fee for every DESTINY BOX opened which is split up into:<br /><br />

                            <b>5%</b> to Looties NFT holders<br />
                            <b>2.5%</b> to the house wallet<br />
                            <b>2.5%</b> to the team wallet<br /><br />

                            All our games have a 100% Return To Player (RTP) there is no house edge or margin.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>What are your odds?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <table>
                            <thead>

                                <tr>
                                    <th>Multipler</th>
                                    <th>Chance</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>0x</td>
                                    <td>39.230%</td>
                                </tr>
                                <tr>
                                    <td>0.5x</td>
                                    <td>25.000%</td>
                                </tr>
                                <tr>
                                    <td>1x</td>
                                    <td>21.500%</td>
                                </tr>
                                <tr>
                                    <td>2x</td>
                                    <td>8.000%</td>
                                </tr>
                                <tr>
                                    <td>5x</td>
                                    <td>5.000%</td>
                                </tr>
                                <tr>
                                    <td>10x</td>
                                    <td>1.500%</td>
                                </tr>
                                <tr>
                                    <td>25x</td>
                                    <td>0.200%</td>
                                </tr>
                                <tr>
                                    <td>50x</td>
                                    <td>0.050%</td>
                                </tr>
                                <tr>
                                    <td>100x</td>
                                    <td>0.020%</td>
                                </tr>
                            </tbody>
                        </table>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>What are your prizes?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            0X, 0.5X, 1X, 2X, 5X, 10X, 25X, 50X, 100X for in real life destiny.<br />
                            Transactions on the smart contract are verified on chain.<br />

                            <b>House wallet</b> :<br />
                            <b>Fee wallet</b> :<br />
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <Typography sx={{ flexShrink: 0 }}>Technical support, Proposals and partnerships? </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            You can contact us using <a href="https://twitter.com/solbox_nft"> Twitter</a> and
                            <a href="https://discord.gg/solbox"> Discord.</a><br />

                            Open a ticket in our discord. These are our official links. Please beware of scams. <br />We WILL NEVER DM FIRST!
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>

        </Box>
    )

};