import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import react, { useState } from "react";

export default () => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ maxWidth: 600,  }}>
                <Typography sx={{mt:8, color:'gray', fontSize: 20}}>
                    The golden pass is your ticket to participate in an infinite amount of SOLBOX raffles and SOLBOX DAO. <br/>
                    Golden Passes mint price was 0.5 SOL. <br/>
                    Each holder is rewarded with various opportunities within our raffles as well as, 5+ holding grants revenue share. <br/>
                    Golden Pass holders will be rewarded with exclusive WL, daily Alphas calls, crypto charting, market sentiment, and delegated votes towards SOLBOX future developments.
                </Typography>
            </Box>
        </Box>
    )

};