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
                <Typography sx={{ mt: 1, color: '#555', fontSize: 18 }}>

                    Come bloom and take charge of your destiny. Patience is a virtue, our journey is here to pursue. Stay golden, past the trench of mutiny. Shine bright with the community. For we create our destiny!
                    Life is beyond this. Claim your glory.
                    Feel the rush of it. Explore the freedom.
                    What’s fantasy, now a reality. Good vibes and euphoria. Take your Throne to shine everlasting. Our success for all to see.
                </Typography>
            </Box>
        </Box>
    )

};